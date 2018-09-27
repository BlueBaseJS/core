import { ComponentInput, ComponentRegistryHocItem, ComponentRegistryItem } from './types';
import { createComponentRegistryItem, isComponentRegistryItem } from './helpers';
import { MaybeBlueRainModuleOrInput, getDefiniteBlueRainModule, getDefiniteModule, isPromise } from '../../utils';
import { BlueRain } from '../../BlueRain';
import { Registry } from '../Registry';
import { getAsyncComponent } from './getAsyncComponent';
import flowRight from 'lodash.flowright';

export class ComponentRegistry extends Registry<ComponentRegistryItem> {

	// For proxy methods
	[key: string]: any;

	constructor(BR: BlueRain) {
		super(BR);

		// Create proxy to enable BR.Components.Name method
		return new Proxy(this, {
			get: (target, name, value) => {
				if (typeof name === 'string' && typeof (this[name]) === 'undefined') {
					if (this.has(name)) {
						return this.resolve(name);
					}
					throw Error(`BlueRain could not find "${name}" component. Did you forget to register it?`);
				}

				return Reflect.get(target, name, value);
			}
		});
	}


	/**
	 * Register a React Component
	 *
	 * "component" (2nd) param can be one of the following:
	 *
	 * 1. A RegistryItem with the following variations:
	 * 	1a.	".rawComponent" prop is a react component
	 * 	1b. ".rawComponent" prop is an ES Module
	 * 	1c.	".rawComponent" prop is a promise
	 * 	1d.	".rawComponent" prop is a BlueRain Module
	 *
	 * 2. A react compoment with following variations:
	 * 	2a. Is a react component
	 * 	2b. Is an ES module that has a react component in .default prop
	 * 	2c. Is a promise that resolves a react component (In ES module or otherwise)
	 * 	2d. Is a BlueRainModule that resolves a react component
	 *
	 * @param name
	 * @param component
	 */
	public async register(name: string, component: ComponentInput) {

		const existing = this.get(name);

		// (Point 1) If the input component is an object of RegistryItem
		if (isComponentRegistryItem(component)) {

			// Merge HOCs
			const hocs = !!(existing)
				? [...existing.hocs, ...component.hocs]
				: component.hocs || [];

			this.set(name, createComponentRegistryItem({
				...existing,
				...component,
				hocs,
				rawComponent: component.rawComponent,
			}));
			return;
		}

		// (Point 2) If the input component react component

		// We make sure to strip off ES Module here
		// FIXME: Remove any type casting
		component = getDefiniteModule(component as any);

		// FIXME: Remove any type casting
		if (typeof component === 'object' && !isPromise(component as any)) {
			throw Error(`Cound not register "${name}". Reason: Unknown component type.`);
		}

		this.set(name, createComponentRegistryItem({
			...existing,
			rawComponent: component as React.ComponentType<any>
		}));

	}

	public replace(slug: string, component: MaybeBlueRainModuleOrInput<React.ComponentType<any>>) {

		const registryItem = this.get(slug);

		if (!registryItem) {
			throw Error(`Could not replace raw component. Reason: No component registered with slug ${slug}.`);
		}

		registryItem.rawComponent = getDefiniteBlueRainModule(component);
		this.set(slug, registryItem);
	}

	public resolve(name: string): React.ComponentType<any> {

		const registryItem = super.get(name);

		if (!registryItem) {
			throw new Error(`Could not resolve component "${name}". Reason: Component not registered.`);
		}

		const rawComponent = registryItem.rawComponent.isAsync
			? getAsyncComponent(registryItem.rawComponent.promise)
			: registryItem.rawComponent.module;

		const hocs = registryItem.hocs.map(hoc => (Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc));

		return flowRight([...hocs])(rawComponent);
	}


	/**
	 * Adds higher order component to the registered component
	 * @param {string} name The name of the registered component to whom hocs are to added
	 * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
	 */
	addHocs(name: string, ...hocs: ComponentRegistryHocItem[]) {

		const item = super.get(name);

		if (!item) {
			throw Error(
				`Count not add hocs for "${name}" component. Reason: Component not found.`
			);
		}

		item.hocs.push(...hocs);

		this.data = this.data.set(name, item);
	}
}
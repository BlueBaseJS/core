import { ComponentCollectionInput, ComponentInput, ComponentRegistryHocItem, ComponentRegistryItem } from './types';
import { ComponentStyles, applyStyles } from '../../models';
import {
	MaybeBlueBaseModule,
	MaybeThunk,
	getDefiniteBlueBaseModule,
	getDefiniteModule,
	isPromise
} from '../../utils';
import { createComponentRegistryItem, isComponentRegistryItem } from './helpers';
import { BlueBase } from '../../BlueBase';
import { Registry } from '../Registry';
import flowRight from 'lodash.flowright';
import { getAsyncComponent } from './getAsyncComponent';

export class ComponentRegistry extends Registry<ComponentRegistryItem> {

	// For proxy methods
	[key: string]: any;

	constructor(BB: BlueBase) {
		super(BB);

		// Create proxy to enable BB.Components.Name method
		return new Proxy(this, {
			get: (target, name, value) => {
				if (typeof name === 'string' && typeof (this[name]) === 'undefined') {
					if (this.has(name)) {
						return this.resolve(name);
					}
					throw Error(`BlueBase could not find "${name}" component. Did you forget to register it?`);
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
	 * 	1d.	".rawComponent" prop is a BlueBase Module
	 *
	 * 2. A react compoment with following variations:
	 * 	2a. Is a react component
	 * 	2b. Is an ES module that has a react component in .default prop
	 * 	2c. Is a promise that resolves a react component (In ES module or otherwise)
	 * 	2d. Is a BlueBaseModule that resolves a react component
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

	// TODO: Add docs
	public async registerCollection(components: ComponentCollectionInput) {
		const componentKeys = Object.keys(components);
		for (const key of componentKeys) {
			await this.BB.Components.register(key, components[key]);
		}
	}

	// TODO: Add docs
	public replace(slug: string, component: MaybeBlueBaseModule<React.ComponentType<any>>) {

		const registryItem = this.get(slug);

		if (!registryItem) {
			throw Error(`Could not replace raw component. Reason: No component registered with slug ${slug}.`);
		}

		registryItem.rawComponent = getDefiniteBlueBaseModule(component);
		this.set(slug, registryItem);
	}

	// TODO: Add docs
	// TODO: Add support for fallback components
	public resolve(name: string): React.ComponentType<any> {

		const registryItem = super.get(name);

		if (!registryItem) {
			throw new Error(`Could not resolve component "${name}". Reason: Component not registered.`);
		}

		// Find the rawComponent
		let rawComponent = registryItem.rawComponent.isAsync
			? getAsyncComponent(registryItem.rawComponent)
			: registryItem.rawComponent.module as React.ComponentType;

		// Add withStyles HOC
		rawComponent = applyStyles(name, rawComponent, registryItem.styles) as React.ComponentType<any>;

		const hocs = registryItem.hocs.map(hoc => (Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc));

		return flowRight([...hocs])(rawComponent);
	}


	/**
	 * Adds higher order component to the registered component
	 * @param {string} key The name of the registered component to whom hocs are to added
	 * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
	 */
	public addHocs(key: string, ...hocs: ComponentRegistryHocItem[]) {

		const item = this.get(key);

		if (!item) {
			throw Error(
				`Could not add hocs for "${key}" component. Reason: Component not found.`
			);
		}

		item.hocs.push(...hocs);

		this.data = this.data.set(key, item);
	}

	// TODO: Add docs
	public setStyles(key: string, styles: MaybeThunk<ComponentStyles>) {
		const item = this.get(key);

		if (!item) {
			throw Error(
				`Cannot set styles "${key}" component. Reason: Component not found.`
			);
		}

		item.styles = styles;

		this.data = this.data.set(key, item);
	}

	// TODO: Add docs
	public getStyles(key: string): MaybeThunk<ComponentStyles> | undefined {
		const item = this.get(key);

		if (!item) {
			return;
		}

		return item.styles;
	}
}
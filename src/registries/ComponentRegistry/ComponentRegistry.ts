import { ComponentInput, ComponentRegistryItem } from './types';
import { createComponentRegistryItem, isComponentRegistryItem } from './helpers';
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
					if (typeof name === 'string') {

						if (this.has(name)) {
							return this.resolve(name);
						}
						throw Error(`Could not find "${name}" component. Did you forget to register it?`);
					}
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

		// (Point 1) If the input component is an object of RegistryItem
		if (isComponentRegistryItem(component)) {

			this.set(name, createComponentRegistryItem({
				...component,
				rawComponent: component.rawComponent,
			}));
			return;
		}

		// (Point 2) If the input component react component
		this.set(name, createComponentRegistryItem({
			rawComponent: component as React.ComponentType<any>
		}));
	}


	public resolve(name: string) {

		const registryItem = super.get(name);

		if (!registryItem) {
			throw new Error(`Component "${name}" is registered.`);
		}

		const rawComponent = getAsyncComponent(registryItem.rawComponent.promise);

		const hocs = registryItem.hocs.map(hoc => (Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc));

		return flowRight([...hocs])(rawComponent);
	}
}
import { BlueRain } from '../index';
import MapRegistry from './MapRegistry';
import React from 'react';
import flowright from 'lodash.flowright';
import isNil from 'lodash.isnil';

export type ComponentRegistryHocItem = (...args: any[]) => React.ComponentType<any>;

export interface ComponentRegistryItem {
	rawComponent: React.ComponentType;
	hocs: ComponentRegistryHocItem[];
}

/**
 * All system components are stored in this registry
 * @property {Map<string, {rawComponent: React.ComponentType<*>, hocs: Array<Function | Array<any>>}>} data Storage
 * of all components
 */
class ComponentRegistry extends MapRegistry<ComponentRegistryItem> {
	// data: Map<string, ComponentRegistryItem>;
	BR: BlueRain;

	constructor(ctx: BlueRain) {
		super('ComponentRegistry');
		this.BR = ctx;
	}

	/**
	 * Register a component with a name, a raw component than can be extended
	 * and one or more optional higher order components.
	 *
	 * @param {String} name The name of the component to register.
	 * @param {React.ComponentType<*>} rawComponent Interchangeable/extendable component.
	 * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
	 *
	 * Note: when a component is registered without higher order component, `hocs` will be
	 * an empty array, and it's ok!
	 * See https://lodash.com/docs/4.17.4#flowRight
	 */
	add(name: string, rawComponent: React.ComponentType, ...hocs: ComponentRegistryHocItem[]) {
		if (isNil(rawComponent)) {
			throw new Error(
				'rawComponent is required to register a component.' +
					'Please provide valid component while adding component'
			);
		}

		super.set(name, { rawComponent, hocs });
	}

	/**
	 * Replace a component with the same name with a new component or
	 * an extension of the raw component and one or more optional higher order components.
	 * This function keeps track of the previous HOCs and wrap the new HOCs around previous ones
	 *
	 * @param {String} name The name of the component to register.
	 * @param {React.ComponentType<*>} rawComponent Interchangeable/extendable component.
	 * @param {...Function} hocs The HOCs to compose with the raw component.
	 * @returns {Function|React.ComponentType<*>} A component callable with Components[name]
	 *
	 * Note: when a component is registered without higher order component, `hocs` will be
	 * an empty array, and it's ok!
	 * See https://lodash.com/docs/4.17.4#flowRight
	 */
	replace(name: string, newComponent: React.ComponentType, ...newHocs: ComponentRegistryHocItem[]) {
		if (!this.has(name)) {
			throw new Error(
				`Component ${name} not registered.Please register component before replacing it`
			);
		}
		const previousComponent: ComponentRegistryItem = super.get(name);
		const hocs = [...newHocs, ...previousComponent.hocs];
		super.set(name, { rawComponent: newComponent, hocs });
	}

	/**
	 * Set or Replace an item in the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {React.ComponentType} item  The item to add
	 */
	set(key: string, rawComponent: React.ComponentType, ...hocs: ComponentRegistryHocItem[]) {
		if (!key) {
			throw new Error(`No key provided in the setOrReplace method of ${this.name} registry.`);
		}
		if (!rawComponent) {
			throw new Error(`No item provided in the setOrReplace method of ${this.name} registry.`);
		}

		if (this.has(key)) {
			this.replace(key, rawComponent, ...hocs);
		} else {
			this.add(key, rawComponent, ...hocs);
		}
	}

	/**
	 * Adds higher order component to the registered component
	 * @param {string} name The name of the registered component to whom hocs are to added
	 * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
	 */
	addHocs(name: string, ...hocs: ComponentRegistryHocItem[]) {
		if (isNil(name)) {
			throw new Error(
				`Component name cannot be ${name}. Please provide valid name while adding Hocs`
			);
		}

		if (!this.has(name)) {
			throw new Error(
				`Component ${name} not registered.Please register component before adding Hocs`
			);
		}

		const item: ComponentRegistryItem = super.get(name);
		item.hocs.push(...hocs);

		this.data = this.data.set(name, item);
	}

	/**
	 * Get a component registered with set(name, component, ...hocs).
	 * Its accepts multiple component names.It iterates arguments and returns first found registered component.
	 *
	 * @param {String} name The name of the component to get.
	 * @returns {Function|React.ComponentType<*>} A (wrapped) React component
	 */
	get(...name: string[]): React.ComponentType<any> {
		let component: ComponentRegistryItem | null = null;
		for (const componentName of name) {
			if (this.has(componentName)) {
				component = this.data.get(componentName);
				break;
			}
		}
		if (!component) {
			throw new Error(`None of components ${name.toString()} are registered.`);
		}

		const hocs = component.hocs.map(hoc => (Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc));

		// TS Error: https://github.com/Microsoft/TypeScript/issues/4130
		return flowright([], ...hocs)(component.rawComponent);
	}

	/**
	 * Get the **raw** (original) component registered with registerComponent
	 * without the possible HOCs wrapping it.
	 *
	 * @param {String} name The name of the component to get.
	 * @returns {Function|React.ComponentType<*>} An interchangeable/extendable React component
	 */
	getRawComponent(name: string): React.ComponentType<any> {
		if (isNil(name)) {
			throw new Error(
				`Component name cannot be ${name}.Please provide valid name while getting raw component`
			);
		}

		if (!this.has(name)) {
			throw new Error(
				`Component ${name} not registered. Please register component before getting raw component`
			);
		}
		const component: ComponentRegistryItem = super.get(name);
		return component.rawComponent;
	}
}

export default ComponentRegistry;

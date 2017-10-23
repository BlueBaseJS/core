/* @flow */

import { type Element as ReactElement } from 'react';
import compose from 'lodash.compose';
import isNil from 'lodash.isnil';

import MapRegistry from './MapRegistry';

type ComponentRegistryHocItem = Function | Array<any>

type ComponentRegistryItem = {
	rawComponent: ReactElement<*>,
	hocs: Array<ComponentRegistryHocItem>
};


/**
 * All system components are stored in this registry
 * @property {Map<string, {rawComponent: ReactElement<*>, hocs: Array<Function | Array<any>>}>} data Storage of all components
 */
class ComponentRegistry extends MapRegistry {

	data: Map<string, ComponentRegistryItem>;

	constructor() {
		super('ComponentRegistry');
	}
	/**
	 * Register a component with a name, a raw component than can be extended
	 * and one or more optional higher order components.To be deprecated in 2.0.0
	 *
	 * @param {String} name The name of the component to register.
	 * @param {React Component} rawComponent Interchangeable/extendable component.
	 * @param {Array<Function | Array<any>>} hocs The HOCs to compose with the raw component.
	 *
	 */
	register(name: string, rawComponent: ReactElement<*>, ...hocs: Array<ComponentRegistryHocItem>) {
		console.warn('Deprecation Warning: "register" method of ComponentRegistry has been deprecated. Please use "set" method instead.');
		this.set(name, rawComponent, ...hocs);
	}
	/**
	 * Register a component with a name, a raw component than can be extended
	 * and one or more optional higher order components.
	 *
	 * @param {String} name The name of the component to register.
	 * @param {React Component} rawComponent Interchangeable/extendable component.
	 * @param {Array<Function | Array<any>>} hocs The HOCs to compose with the raw component.
	 *
	 * Note: when a component is registered without higher order component, `hocs` will be
	 * an empty array, and it's ok!
	 * See https://lodash.com/docs/4.17.4#flowRight
	 *
	 * @returns Structure of a component in the list:
	 *
	 * this.data.Foo = {
	 *    name: 'Foo',
	 *    hocs: [fn1, fn2],
	 *    rawComponent: React.Component,
	 *    call: () => compose(...hocs)(rawComponent),
	 * }
	 *
	 */
	set(name: string, rawComponent: ReactElement<*>, ...hocs: Array<ComponentRegistryHocItem>) {
		if (isNil(name)) {
			throw new Error(`Component name cannot be ${name}`);
		}

		if (isNil(rawComponent)) {
			throw new Error('rawComponent is required to register a component.');
		}

		super.set(name, { rawComponent, hocs });
	}

	/**
	 * Adds higher order component to the registered component
	 * @param {string} name The name of the registered component to whom hocs are to added
	 * @param {Array<Function | Array<any>>} hocs The HOCs to compose with the raw component.
	 */
	addHOCs(name: string, ...hocs: Array<ComponentRegistryHocItem>) {
		if (isNil(name)) {
			throw new Error(`Component name cannot be ${name}`);
		}

		if (!this.has(name)) {
			throw new Error(`Component ${name} not registered.`);
		}

		const item:ComponentRegistryItem = super.get(name);
		item.hocs.push(...hocs);

		this.data = this.data.set(name, item);
	}

	/**
	 * Get a component registered with set(name, component, ...hocs).
	 * Its accepts multiple component names.It iterates arguments and returns first found registered component.
	 *
	 * @param {String} name The name of the component to get.
	 * @returns {Function|React Component} A (wrapped) React component
	 */
	get(...name: Array<string>) : ReactElement<*> {
		if (isNil(name)) {
			throw new Error(`Component name cannot be ${name.toString()}`);
		}

		let component;
		for (let i = 0; i < name.length; i += 1) {
			if (this.has(name[i])) {
				component = this.data.get(name[i]);
				break;
			}
		}
		if (!component) {
			throw new Error(`None of components ${name.toString()} are registered.`);
		}

		const hocs = component.hocs.map((hoc) => {
			if (Array.isArray(hoc)) {
				let composedHoc = hoc[0](hoc[hoc.length - 1]);
				for (let i = hoc.length - 2; i > 0; i -= 1) {
					composedHoc = hoc[0](hoc[i])(composedHoc);
				}
				return composedHoc;
			}  return hoc;
		});
		return compose(...hocs)(component.rawComponent);
	}

	/**
	 * Get the **raw** (original) component registered with registerComponent
	 * without the possible HOCs wrapping it.
	 *
	 * @param {String} name The name of the component to get.
	 * @returns {Function|React Component} An interchangeable/extendable React component
	 */
	getRawComponent(name: string): ReactElement<*> {
		if (isNil(name)) {
			throw new Error(`Component name cannot be ${name}`);
		}

		if (!this.has(name)) {
			throw new Error(`Component ${name} not registered.`);
		}
		const component: ComponentRegistryItem = super.get(name);
		return component.rawComponent;
	}

	/**
	 * Replace a component with the same name with a new component or
	 * an extension of the raw component and one or more optional higher order components.
	 * This function keeps track of the previous HOCs and wrap the new HOCs around previous ones
	 *
	 * @param {String} name The name of the component to register.
	 * @param {React Component} rawComponent Interchangeable/extendable component.
	 * @param {...Function} hocs The HOCs to compose with the raw component.
	 * @returns {Function|React Component} A component callable with Components[name]
	 *
	 * Note: when a component is registered without higher order component, `hocs` will be
	 * an empty array, and it's ok!
	 * See https://lodash.com/docs/4.17.4#flowRight
	 */
	replace(name: string, newComponent: ReactElement<*>, ...newHocs: Array<Function>) {
		if (isNil(name)) {
			throw new Error(`Component name cannot be ${name}`);
		}

		if (!this.has(name)) {
			throw new Error(`Component ${name} not registered.`);
		}
		const previousComponent:ComponentRegistryItem = super.get(name);
		const hocs = [...newHocs, ...previousComponent.hocs];
		super.replace(name, { rawComponent: newComponent, hocs } );
	}
}

export default ComponentRegistry;

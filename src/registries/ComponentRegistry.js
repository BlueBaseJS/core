/* @flow */

import { compose } from 'redux'; // note: at the moment, compose@react-apollo === compose@redux ; see https://github.com/apollostack/react-apollo/blob/master/src/index.ts#L4-L7
import { type Element as ReactElement } from 'react';

type ComponentItem = {
	name: string,
	rawComponent: ReactElement<*>,
	hocs: Array<Function>
};

/**
 * All system components are stored in this registry
 * @property {Object} ComponentsTable Storage table of all components
 */
class ComponentRegistry {
	ComponentsTable: {} = {};

	/**
	 * Register a Vulcan component with a name, a raw component than can be extended
	 * and one or more optional higher order components.
	 *
	 * @param {String} name The name of the component to register.
	 * @param {React Component} rawComponent Interchangeable/extendable component.
	 * @param {...Function} hocs The HOCs to compose with the raw component.
	 *
	 * Note: when a component is registered without higher order component, `hocs` will be
	 * an empty array, and it's ok!
	 * See https://github.com/reactjs/redux/blob/master/src/compose.js#L13-L15
	 *
	 * @returns Structure of a component in the list:
	 *
	 * this.ComponentsTable.Foo = {
	 *    name: 'Foo',
	 *    hocs: [fn1, fn2],
	 *    rawComponent: React.Component,
	 *    call: () => compose(...hocs)(rawComponent),
	 * }
	 *
	 */
	register(name: string, rawComponent: ReactElement<*>, ...hocs: Array<Function>) {
		if (name === undefined || name === null) {
			throw new Error(`name cannot be ${name}`);
		}
    // store the component in the table
		this.ComponentsTable[name] = {
			name,
			rawComponent,
			hocs
		};
	}
	addHOCs(name: string, ...hocs: Array<Function>) {
		if (name === undefined || name === null) {
			throw new Error(`name cannot be ${name}`);
		}
		if (hocs.includes(undefined) || hocs.includes(null)) {
			throw new Error('HOCs not provided.');
		}
		if (!Object.prototype.hasOwnProperty.call(this.ComponentsTable, name)) {
			throw new Error(`Component ${name} not registered.`);
		}
    // store the component in the table
		this.ComponentsTable[name].hocs.push(...hocs);
	}

  /**
	 * Check if a component is registered with registerComponent(name, component, ...hocs).
	 *
	 * @param {String} name The name of the component to get.
	 * @returns {boolean}
	 */
	has(name: string) : boolean {
		if (name === undefined || name === null) {
			throw new Error(`name cannot be ${name}`);
		}
		const component = this.ComponentsTable[name];
		if (!component) {
			return false;
		}
		return true;
	}

	/**
	 * Get a component registered with registerComponent(name, component, ...hocs).
	 *
	 * @param {String} name The name of the component to get.
	 * @returns {Function|React Component} A (wrapped) React component
	 */
	get(name: string) : ReactElement<*> {
		if (name === undefined || name === null) {
			throw new Error(`name cannot be ${name}`);
		}
		const component = this.ComponentsTable[name];
		if (!component) {
			throw new Error(`Component ${name} not registered.`);
		}
		const hocs = component.hocs.map(hoc => (Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc));
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
		return this.ComponentsTable[name].rawComponent;
	}

  /**
	 * Replace a Vulcan component with the same name with a new component or
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
	 * See https://github.com/reactjs/redux/blob/master/src/compose.js#L13-L15
	 */
	replace(name: string, newComponent: ReactElement<*>, ...newHocs: Array<Function>) {
		if (name === undefined || name === null) {
			throw new Error(`name cannot be ${name}`);
		} else if (!Object.prototype.hasOwnProperty.call(this.ComponentsTable, name)) {
			throw new Error(`${name} is not registered. Component should be registered to be replaced`);
		}
		const previousComponent = this.ComponentsTable[name];

    // xxx : throw an error if the previous component doesn't exist

		this.register(name, newComponent, ...newHocs, ...previousComponent.hocs);
	}

  /**
	 * [write docs]
	 * @param {*} sourceComponent
	 * @param {*} targetComponent
	 */
	static copyHoCs(sourceComponent: ComponentItem, targetComponent: ReactElement<*>) : ReactElement<*> {
		return compose(...sourceComponent.hocs)(targetComponent);
	}
}

const componentRegistry = new ComponentRegistry();
export default componentRegistry;

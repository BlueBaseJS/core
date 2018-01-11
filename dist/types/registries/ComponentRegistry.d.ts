import { ComponentType as ReactElement } from 'react';
import MapRegistry from './MapRegistry';
export declare type ComponentRegistryHocItem = () => void | any[];
export declare type ComponentRegistryItem = {
    rawComponent: ReactElement<any>;
    hocs: ComponentRegistryHocItem[];
};
/**
 * All system components are stored in this registry
 * @property {Map<string, {rawComponent: ReactElement<*>, hocs: Array<Function | Array<any>>}>} data Storage of all
 *  components
 */
declare class ComponentRegistry extends MapRegistry {
    constructor();
    /**
     * Register a component with a name, a raw component than can be extended
     * and one or more optional higher order components.To be deprecated in 2.0.0
     *
     * @param {String} name The name of the component to register.
     * @param {ReactElement<*>} rawComponent Interchangeable/extendable component.
     * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
     *
     */
    register(name: string, rawComponent: ReactElement<any> | any, ...hocs: ComponentRegistryHocItem[]): void;
    /**
     * Register a component with a name, a raw component than can be extended
     * and one or more optional higher order components.
     *
     * @param {String} name The name of the component to register.
     * @param {ReactElement<*>} rawComponent Interchangeable/extendable component.
     * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
     *
     * Note: when a component is registered without higher order component, `hocs` will be
     * an empty array, and it's ok!
     * See https://lodash.com/docs/4.17.4#flowRight
     *
     *
     */
    set(name: string, rawComponent: ReactElement<any> | any, ...hocs: ComponentRegistryHocItem[]): void;
    /**
     * Adds higher order component to the registered component
     * @param {string} name The name of the registered component to whom hocs are to added
     * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
     */
    addHocs(name: string, ...hocs: ComponentRegistryHocItem[]): void;
    /**
     * Get a component registered with set(name, component, ...hocs).
     * Its accepts multiple component names.It iterates arguments and returns first found registered component.
     *
     * @param {String} name The name of the component to get.
     * @returns {Function|ReactElement<*>} A (wrapped) React component
     */
    get(...name: string[]): ReactElement<any>;
    /**
     * Get the **raw** (original) component registered with registerComponent
     * without the possible HOCs wrapping it.
     *
     * @param {String} name The name of the component to get.
     * @returns {Function|ReactElement<*>} An interchangeable/extendable React component
     */
    getRawComponent(name: string): ReactElement<any>;
    /**
     * Replace a component with the same name with a new component or
     * an extension of the raw component and one or more optional higher order components.
     * This function keeps track of the previous HOCs and wrap the new HOCs around previous ones
     *
     * @param {String} name The name of the component to register.
     * @param {ReactElement<*>} rawComponent Interchangeable/extendable component.
     * @param {...Function} hocs The HOCs to compose with the raw component.
     * @returns {Function|ReactElement<*>} A component callable with Components[name]
     *
     * Note: when a component is registered without higher order component, `hocs` will be
     * an empty array, and it's ok!
     * See https://lodash.com/docs/4.17.4#flowRight
     */
    replace(name: string, newComponent: ReactElement<any>, ...newHocs: Function[]): void;
}
export default ComponentRegistry;

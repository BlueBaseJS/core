import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
} from './BlueBaseModuleRegistry';
import { Thunk, getDefiniteBlueBaseModule, isBlueBaseModule } from '../../utils';
import { BlueBase } from '../../BlueBase';
import { ItemCollection } from './Registry';
import Loadable from 'react-loadable';
import { ReactLoadableLoading } from '../../components';
import flowRight from 'lodash.flowright';

/**
 * Definition of the HOC
 */
export type ComponentRegistryHocItem = (...args: any[]) => React.ComponentType<any>;

export type ComponentRegistryHocItemWithArgs<T = any> = [Thunk<ComponentRegistryHocItem>, T];

/**
 * Source of this component. Contains information about who registered this component.
 */
export interface ComponentSource {
	type: 'plugin' | 'api' | 'custom',
	slug: string,
}

interface ComponentRegistryItemExtras {
	hocs: Array<ComponentRegistryHocItem | ComponentRegistryHocItemWithArgs>,
	source: ComponentSource,
	isAsync: boolean,
}

export type ComponentRegistryItem =
	BlueBaseModuleRegistryItem<React.ComponentType<any>> & ComponentRegistryItemExtras;

export type ComponentRegistryInputItem =
	BlueBaseModuleRegistryInputItem<React.ComponentType<any>> & Partial<ComponentRegistryItemExtras>;

export type ComponentInputCollection = ItemCollection<ComponentRegistryInputItem>;

/**
 * 🎁 ComponentRegistry
 */
export class ComponentRegistry extends BlueBaseModuleRegistry<ComponentRegistryItem, ComponentRegistryInputItem> {

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

	public resolve(...keys: string[]): React.ComponentType<any> {

		const item = this.findOne(...keys);

		if (!item) {
			throw Error(`Could not resolve any of the following components: [${keys.join(', ')}].`);
		}

		const rawComponent = item.value.isAsync
			? Loadable({
				loader: () => item.value,
				loading: ReactLoadableLoading,
			})
			: item.value.module;

		const hocs = item.hocs
			.map(hoc => (Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc));

		return flowRight([...hocs])(rawComponent);
	}

	/**
	 * Adds higher order component to the registered component
	 * @param {string} key The name of the registered component to whom hocs are to added
	 * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
	 */
	addHocs(key: string, ...hocs: Array<ComponentRegistryHocItem | ComponentRegistryHocItemWithArgs>) {

		const item = super.get(key);

		if (!item) {
			throw Error(
				`Could not add hocs for "${key}" component. Reason: Component not found.`
			);
		}

		this.set(key, { ...item, hocs, });
	}

	// public removeHocs() {
	// 	// TODO:
	// }

	protected createItem(key: string, partial: any): ComponentRegistryItem {

		const value = getDefiniteBlueBaseModule(partial.value);

		return super.createItem(key, {
			hocs: [],
			isAsync: value.isAsync,
			preload: false,
			...partial,
			value,
		});
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is ComponentRegistryInputItem['value'] {
		return isBlueBaseModule(value) || typeof value === 'function';
	}

}
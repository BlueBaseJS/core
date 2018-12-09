import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
	BlueBaseModuleRegistryItemMeta,
} from './BlueBaseModuleRegistry';
import { getDefiniteBlueBaseModule, isBlueBaseModule } from '../../utils';
import { BlueBase } from '../../BlueBase';
import Loadable from 'react-loadable';
import { ReactLoadableLoading } from '../../components';
import flowRight from 'lodash.flowright';

/**
 * Definition of the HOC
 */
export type ComponentRegistryHocItem = (...args: any[]) => React.ComponentType<any>;

/**
 * Source of this component. Contains information about who registered this component.
 */
export interface ComponentSource {
	type: 'plugin' | 'api' | 'custom',
	slug: string,
}


export interface ComponentRegistryItemMeta extends BlueBaseModuleRegistryItemMeta {
	hocs: ComponentRegistryHocItem[],
	source: ComponentSource,
	isAsync: boolean,
}

export type ComponentRegistryItem = BlueBaseModuleRegistryItem<React.ComponentType<any>, ComponentRegistryItemMeta>;
export type ComponentRegistryInputItem =
	BlueBaseModuleRegistryInputItem<React.ComponentType<any>, ComponentRegistryItemMeta>;


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

		const hocs = this.getMeta(item.key, 'hocs')
			.map((hoc: ComponentRegistryHocItem) => (Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc));

		return flowRight([...hocs])(rawComponent);
	}

	/**
	 * Adds higher order component to the registered component
	 * @param {string} key The name of the registered component to whom hocs are to added
	 * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
	 */
	addHocs(key: string, ...hocs: ComponentRegistryHocItem[]) {

		const item = super.get(key);

		if (!item) {
			throw Error(
				`Could not add hocs for "${key}" component. Reason: Component not found.`
			);
		}

		const currentHOCs: ComponentRegistryHocItem[] = this.getMeta(key, 'hocs') || [];

		currentHOCs.push(...hocs);

		this.setMeta(key, 'hocs', currentHOCs);
	}

	public removeHocs() {
		// TODO:
	}

	protected createItem(key: string, partial: any): ComponentRegistryItem {

		const value = getDefiniteBlueBaseModule(partial.value);

		return super.createItem(key, {
			...partial,
			value,

			meta: {
				hocs: [],
				isAsync: value.isAsync,
				preload: false,

				...partial.meta,
			}
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
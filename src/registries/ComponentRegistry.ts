import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
} from './BlueBaseModuleRegistry';
import { ComponentStyles, applyStyles } from '../themes';
import { MaybeThunk, Thunk, getDefiniteBlueBaseModule, isBlueBaseModule } from '../utils';
import { ItemCollection } from './Registry';
import Loadable from 'react-loadable';
import { ReactLoadableLoading } from '../components/';
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
	type: 'plugin' | 'theme' | 'api' | 'custom';
	key: string;
}

interface ComponentRegistryItemExtras {
	hocs: Array<ComponentRegistryHocItem | ComponentRegistryHocItemWithArgs>;
	source: ComponentSource;
	styles: MaybeThunk<ComponentStyles>;
	isAsync: boolean;
}

export type ComponentRegistryItem = BlueBaseModuleRegistryItem<React.ComponentType<any>> &
	ComponentRegistryItemExtras;

export type ComponentRegistryInputItem = BlueBaseModuleRegistryInputItem<React.ComponentType<any>> &
	Partial<ComponentRegistryItemExtras>;

export type ComponentCollection = ItemCollection<ComponentRegistryInputItem>;

/**
 * 🎁 ComponentRegistry
 */
export class ComponentRegistry extends BlueBaseModuleRegistry<
	ComponentRegistryItem,
	ComponentRegistryInputItem
> {
	/**
	 * Resolves a Component. Wraps it in `hocs` and `styles`. Takes care of loading and error
	 * states if required.
	 * @param keys
	 */
	public resolve(...keys: string[]): React.ComponentType<any> {
		const item = this.findOne(...keys);

		if (!item) {
			throw Error(`Could not resolve any of the following components: [${keys.join(', ')}].`);
		}

		let rawComponent = item.value.isAsync
			? Loadable({ loader: () => item.value, loading: ReactLoadableLoading })
			: (item.value.module as React.ComponentType<any>);

		// Add withStyles HOC
		rawComponent = applyStyles(item.key, rawComponent, item.styles);

		const hocs = item.hocs.map(hoc => (Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc));

		return flowRight([...hocs])(rawComponent);
	}

	/**
	 * Adds higher order component to the registered component
	 * @param {string} key The name of the registered component to whom hocs are to added
	 * @param {Array<ComponentRegistryHocItem>} hocs The HOCs to compose with the raw component.
	 */
	addHocs(
		key: string,
		...hocs: Array<ComponentRegistryHocItem | ComponentRegistryHocItemWithArgs>
	) {
		const item = super.get(key);

		if (!item) {
			throw Error(`Could not add hocs for "${key}" component. Reason: Component not found.`);
		}

		this.set(key, { ...item, hocs });
	}

	/**
	 * Set styles of a component.
	 * @param key
	 * @param styles
	 */
	public setStyles(key: string, styles: MaybeThunk<ComponentStyles>) {
		const item = this.get(key);

		if (!item) {
			throw Error(`Cannot set styles "${key}" component. Reason: Component not found.`);
		}

		item.styles = styles;

		this.data = this.data.set(key, item);
	}

	/**
	 * Get styles of a component
	 * @param key
	 */
	public getStyles(key: string): MaybeThunk<ComponentStyles> | undefined {
		const item = this.get(key);

		if (!item) {
			return;
		}

		return item.styles;
	}

	/**
	 * Convert any input value to an item. This is where you transform inputs and add defualts
	 * @param key
	 * @param partial
	 */
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
		return (
			isBlueBaseModule(value) ||
			typeof value === 'function' ||
			(typeof value === 'object' && typeof value.render === 'function')
		);
	}
}

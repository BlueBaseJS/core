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
import hoistNonReactStatics from 'hoist-non-react-statics';

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
	/** Higher Order Components. BlueBase will wrap the component during resolution */
	hocs: Array<ComponentRegistryHocItem | ComponentRegistryHocItemWithArgs>;

	/** The source of this component */
	source: ComponentSource;

	/** Style rules for this component. May also be a thunk. */
	styles: MaybeThunk<ComponentStyles>;

	/** Is this component's code split? Mean's it's bundle will have to be split. */
	isAsync: boolean;

	/** Should apply styles and theming to this component? true by default */
	applyStyles: boolean;
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
	public resolve<T = any>(...keys: string[]): React.ComponentType<T> {
		const item = this.findOne(...keys);

		if (!item) {
			throw Error(`Could not resolve any of the following components: [${keys.join(', ')}].`);
		}

		// If component bundle has to be downloaded, wrap into lazy
		const rawComponent = item.value.isAsync
			? Loadable({ loader: () => item.value, loading: ReactLoadableLoading })
			: (item.value.module as React.ComponentType<any>);

		let themedComponent = rawComponent;

		// Do we apply styles and theming to this component?
		if (item.applyStyles === true) {
			// If yes, then append applyStyles hoc
			themedComponent = applyStyles({ name: item.key, styles: item.styles })(rawComponent);
		}

		// HOCs
		let hocs = item.hocs;

		// Process delayed HOCs
		hocs = item.hocs.map(hoc => (Array.isArray(hoc) ? hoc[0](hoc[1]) : hoc));

		// Wrap
		const wrappedComponent = flowRight([...(hocs as ComponentRegistryHocItem[])])(themedComponent);

		return hoistNonReactStatics(wrappedComponent, rawComponent);
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
		if (!this.has(key)) {
			throw Error(`Could not add hocs for "${key}" component. Reason: Component not found.`);
		}

		const currentHocs: Array<
			ComponentRegistryHocItem | ComponentRegistryHocItemWithArgs
		> = super.getMeta(key, 'hocs', []);

		this.setMeta(key, 'hocs', [...currentHocs, ...hocs]);
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
			applyStyles: true,
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

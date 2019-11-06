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
import isNil from 'lodash.isnil';

/**
 * Definition of the HOC
 */
export type ComponentRegistryHocItem = (...args: any[]) => React.ComponentType<any>;

export type ComponentRegistryHocItemWithArgs<T = any> = [Thunk<ComponentRegistryHocItem>, T];

interface ComponentRegistryItemExtras {
	/** Higher Order Components. BlueBase will wrap the component during resolution */
	hocs: Array<ComponentRegistryHocItem | ComponentRegistryHocItemWithArgs>;

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
	public resolve<T = any>(...keys: Array<string | React.ComponentType<T>>): React.ComponentType<T> {
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
		if (!this.has(key)) {
			throw Error(`Cannot set styles "${key}" component. Reason: Component not found.`);
		}

		this.setMeta(key, 'styles', styles);
	}

	/**
	 * Get styles of a component
	 * @param key
	 */
	public getStyles(key: string): MaybeThunk<ComponentStyles> | undefined {
		return this.getMeta(key, 'styles');
	}

	/**
	 * Find one item in a given sequence. Returns the first item found.
	 * @param keys
	 */
	protected findOne<T = any>(...keys: Array<string | React.ComponentType<T>>) {
		for (const tempKey of keys) {
			// If it is a component, just return it as an Unknown component
			if (this.isInputValue(tempKey)) {
				return this.createItem('Unknown', { value: tempKey });
			}

			if (typeof tempKey === 'string') {
				const item = this.data.get(tempKey);

				if (!isNil(item)) {
					return item;
				}
			}
		}

		return;
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

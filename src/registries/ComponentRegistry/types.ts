import { BlueRainModule, MaybeBlueRainModuleOrInput } from '../../utils';
import React from 'react';

/////////////////////////////////////
/////// ComponentRegistryItem ///////
/////////////////////////////////////

/**
 * Definition of the HOC
 */
export type ComponentRegistryHocItem = (...args: any[]) => React.ComponentType<any>;

/**
 * Source of this component. Contains information about who registered this component.
 */
export interface ComponentSource {
	type: 'plugin' | 'api' | 'custom';
	slug: string;
}


export interface ComponentRegistryItemBase {
	hocs: ComponentRegistryHocItem[]; // TODO: maybe each HOC should also be a BlueRainModule?
	source?: ComponentSource;

	isAsync: boolean;
	preload: boolean;
}

export interface ComponentRegistryItem extends ComponentRegistryItemBase {
	rawComponent: BlueRainModule<React.ComponentType<any>>;
}

export interface ComponentRegistryItemInternal extends Partial<ComponentRegistryItemBase> {
	rawComponent: MaybeBlueRainModuleOrInput<React.ComponentType<any>>;
}

/**
 * Input type when registering a component
 */
export type ComponentInput =
	ComponentRegistryItemInternal |
	MaybeBlueRainModuleOrInput<React.ComponentType<any>>;
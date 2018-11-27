import { ActivityIndicatorProps, ButtonProps, ImageProps, TextProps, ViewProps } from '../native';
import {
	BlueBaseHookProps,
	ComponentStateProps,
	DataObserverProps,
	DynamicIconProps,
	EmptyStateProps,
	ErrorObserverProps,
	ErrorStateProps,
	HoverObserverProps,
	JsonSchemaProps,
	LoadingStateProps,
	PluginIconProps,
	StatefulComponentProps,
	WaitObserverProps,
} from '../components';
import { ComponentRegistry } from '../registries';
import React from 'react';


export interface ComponentRegistryWithUIInterfaces extends ComponentRegistry {

	// System Components
	BlueBaseHook: React.ComponentType<BlueBaseHookProps>,
	ComponentState: React.ComponentType<ComponentStateProps>,
	DataObserver: React.ComponentType<DataObserverProps>,
	DynamicIcon: React.ComponentType<DynamicIconProps>,
	EmptyState: React.ComponentType<EmptyStateProps>,
	ErrorObserver: React.ComponentType<ErrorObserverProps>,
	ErrorState: React.ComponentType<ErrorStateProps>,
	HoverObserver: React.ComponentType<HoverObserverProps>,
	JsonSchema: React.ComponentType<JsonSchemaProps>,
	LoadingState: React.ComponentType<LoadingStateProps>,
	Noop: React.ComponentType,
	PluginIcon: React.ComponentType<PluginIconProps>,
	StatefulComponent: React.ComponentType<StatefulComponentProps>,
	WaitObserver: React.ComponentType<WaitObserverProps>,

	// Native
	ActivityIndicator: React.ComponentType<ActivityIndicatorProps>,
	Button: React.ComponentType<ButtonProps>,
	Image: React.ComponentType<ImageProps>,
	Text: React.ComponentType<TextProps>,
	View: React.ComponentType<ViewProps>,

	// Typography
	H1: React.ComponentType<TextProps>,
	H2: React.ComponentType<TextProps>,
	H3: React.ComponentType<TextProps>,
	H4: React.ComponentType<TextProps>,
	H5: React.ComponentType<TextProps>,
	H6: React.ComponentType<TextProps>,
	Subtitle1: React.ComponentType<TextProps>,
	Subtitle2: React.ComponentType<TextProps>,
	Body1: React.ComponentType<TextProps>,
	Body2: React.ComponentType<TextProps>,
	Caption: React.ComponentType<TextProps>,
	Overline: React.ComponentType<TextProps>,
}

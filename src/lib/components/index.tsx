import { ActivityIndicatorProps, ImageProps, TextProps, ViewProps } from '../../native';
import { BlueBaseConsumer } from '../../Context';
import {
	BlueBaseHookProps,
	ComponentStateProps,
	DataObserverProps,
	DynamicIconProps,
	ErrorObserverProps,
	ErrorStateProps,
	HoverObserverProps,
	JsonSchemaProps,
	LoadingStateProps,
	PluginIconProps,
	StatefulComponentProps,
	WaitObserverProps,
} from '../../components';
import { BlueBase } from '../../BlueBase';
import { ButtonProps } from '../../ui-interfaces';
import React from 'react';

export function getComponent<T = any>(name: string) {

	const BlueBaseComponent = (props: T) => (
		<BlueBaseConsumer children={(BB: BlueBase) => {
			const Component = BB.Components.resolve(name);

			return React.createElement(Component, props);
		}} />
	);

	BlueBaseComponent.displayName = name;

	return BlueBaseComponent as React.ComponentType<T>;
}

// BlueBase
export const BlueBaseHook = getComponent<BlueBaseHookProps>('BlueBaseHook');
export const ComponentState = getComponent<ComponentStateProps>('ComponentState');
export const DataObserver = getComponent<DataObserverProps>('DataObserver');
export const DynamicIcon = getComponent<DynamicIconProps>('DynamicIcon');
export const EmptyState = getComponent<{}>('EmptyState');
export const ErrorObserver = getComponent<ErrorObserverProps>('ErrorObserver');
export const ErrorState = getComponent<ErrorStateProps>('ErrorState');
export const HoverObserver = getComponent<HoverObserverProps>('HoverObserver');
export const JsonSchema = getComponent<JsonSchemaProps>('JsonSchema');
export const LoadingState = getComponent<LoadingStateProps>('LoadingState');
export const PluginIcon = getComponent<PluginIconProps>('PluginIcon');
export const StatefulComponent = getComponent<StatefulComponentProps>('StatefulComponent');
export const WaitObserver = getComponent<WaitObserverProps>('WaitObserver');

// Native
export const ActivityIndicator = getComponent<ActivityIndicatorProps>('ActivityIndicator');
export const Button = getComponent<ButtonProps>('Button');
export const Image = getComponent<ImageProps>('Image');
export const Text = getComponent<TextProps>('Text');
export const View = getComponent<ViewProps>('View');

// Typography
export const H1 = getComponent<TextProps>('H1');
export const H2 = getComponent<TextProps>('H2');
export const H3 = getComponent<TextProps>('H3');
export const H4 = getComponent<TextProps>('H4');
export const H5 = getComponent<TextProps>('H5');
export const H6 = getComponent<TextProps>('H6');
export const Subtitle1 = getComponent<TextProps>('Subtitle1');
export const Subtitle2 = getComponent<TextProps>('Subtitle2');
export const Body1 = getComponent<TextProps>('Body1');
export const Body2 = getComponent<TextProps>('Body2');
export const Caption = getComponent<TextProps>('Caption');
export const Overline = getComponent<TextProps>('Overline');

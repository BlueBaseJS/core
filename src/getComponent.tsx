import { ActivityIndicatorProps, ButtonProps, ImageProps, TextProps, ViewProps } from './native';
import {
	BlueBaseHookProps,
	ComponentStateProps,
	DataObserverProps,
	DynamicIconProps,
	ErrorObserverProps,
	ErrorStateProps,
	HeaderBackButtonProps,
	HeaderProps,
	HeaderTitleProps,
	HoverObserverProps,
	JsonSchemaProps,
	LinkProps,
	LoadingStateProps,
	NavigationActionsProps,
	NavigationProps,
	NoopProps,
	PluginIconProps,
	RedirectProps,
	StatefulComponentProps,
	WaitObserverProps,
} from './components';
import { BlueBase } from './BlueBase';
import { BlueBaseConsumer } from './Context';
import React from 'react';


export { ActivityIndicatorProps, ButtonProps, ImageProps, TextProps, ViewProps } from './native';

/**
 * Resolves a component from BlueBase context, and returns it.
 * It is possible to pass multiple keys as backup. So if one component
 * is not found, the function will fallback and try to find next component.
 *
 * @param keys
 */
export function getComponent<T = any>(...keys: string[]) {

	if (keys.length === 0) {
		throw Error('getComponent method needs at least one key');
	}

	const BlueBaseComponent = (props: T) => (
		<BlueBaseConsumer children={(BB: BlueBase) => {

			if (!BB) {
				throw Error('Could not resolve component in "getComponent" command. Reason: BlueBase context not found.');
			}

			const Component = BB.Components.resolve(...keys);

			return React.createElement(Component, props);
		}} />
	);

	BlueBaseComponent.displayName = keys.join('_');

	return BlueBaseComponent as React.ComponentType<T>;
}

// System Components
export const BlueBaseHook = getComponent<BlueBaseHookProps>('BlueBaseHook');
export const ComponentState = getComponent<ComponentStateProps>('ComponentState');
export const DataObserver = getComponent<DataObserverProps>('DataObserver');
export const DynamicIcon = getComponent<DynamicIconProps>('DynamicIcon');
export const EmptyState = getComponent<{}>('EmptyState');
export const ErrorObserver = getComponent<ErrorObserverProps>('ErrorObserver');
export const ErrorState = getComponent<ErrorStateProps>('ErrorState');
export const Header = getComponent<HeaderProps>('Header');
export const HeaderTitle = getComponent<HeaderTitleProps>('HeaderTitle');
export const HeaderBackButton = getComponent<HeaderBackButtonProps>('HeaderBackButton');
export const HoverObserver = getComponent<HoverObserverProps>('HoverObserver');
export const JsonSchema = getComponent<JsonSchemaProps>('JsonSchema');
export const Link = getComponent<LinkProps>('Link');
export const LoadingState = getComponent<LoadingStateProps>('LoadingState');
export const Noop = getComponent<NoopProps>('Noop');
export const PluginIcon = getComponent<PluginIconProps>('PluginIcon');
export const Navigation = getComponent<NavigationProps>('Navigation');
export const NavigationActions = getComponent<NavigationActionsProps>('NavigationActions');
export const Redirect = getComponent<RedirectProps>('Redirect');
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

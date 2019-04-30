import {
	ActivityIndicatorProps,
	BlueBaseFilterProps,
	BlueBaseImageProps,
	ButtonProps,
	ComponentStateProps,
	DataObserverProps,
	DynamicIconProps,
	ErrorObserverProps,
	ErrorStateProps,
	FormattedMessageProps,
	HoverObserverProps,
	ImageProps,
	LinkProps,
	LoadingStateProps,
	NavigationActionsProps,
	NavigationProps,
	NoopProps,
	PluginIconProps,
	RedirectProps,
	StatefulComponentProps,
	TextProps,
	TouchableItemProps,
	ViewProps,
	WaitObserverProps,
} from '@bluebase/components';
import { BlueBase } from './BlueBase';
import { BlueBaseContentProps } from './components';
import { BlueBaseContext } from './Context';
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

	const displayName = keys.join('_');

	return class BlueBaseComponent extends React.Component<any> {

		static displayName = displayName;

		static contextType = BlueBaseContext;

		Component?: React.ComponentType<T>;


		// Before mounting, resolve component and store it.
		// So we don't end up creating a new component during every render
		componentWillMount() {

			const BB: BlueBase = this.context;

			// If there is no BlueBase context, throw an Error
			if (!BB) {
				// tslint:disable-next-line: max-line-length
				throw Error(`Could not resolve component "${displayName}" in "getComponent" command. Reason: BlueBase context not found.`);
			}

			// We don't want to resolve the component on every render.
			// If we don't do this, a new component is created on every
			// render, causing various set of problems.
			this.Component = BB.Components.resolve(...keys);
		}

		render() {
			// Render
			return React.createElement(this.Component as React.ComponentType<any>, this.props);
		}
	};
}

// System Components
export const BlueBaseContent = getComponent<BlueBaseContentProps>('BlueBaseContent');
export const BlueBaseImage = getComponent<BlueBaseImageProps>('BlueBaseImage');
export const BlueBaseFilter = getComponent<BlueBaseFilterProps>('BlueBaseFilter');
export const ComponentState = getComponent<ComponentStateProps>('ComponentState');
export const DataObserver = getComponent<DataObserverProps>('DataObserver');
export const DynamicIcon = getComponent<DynamicIconProps>('DynamicIcon');
export const EmptyState = getComponent<{}>('EmptyState');
export const ErrorObserver = getComponent<ErrorObserverProps>('ErrorObserver');
export const ErrorState = getComponent<ErrorStateProps>('ErrorState');
export const FormattedMessage = getComponent<FormattedMessageProps>('FormattedMessage');
export const HoverObserver = getComponent<HoverObserverProps>('HoverObserver');
export const Link = getComponent<LinkProps>('Link');
export const LoadingState = getComponent<LoadingStateProps>('LoadingState');
export const Noop = getComponent<NoopProps>('Noop');
export const PluginIcon = getComponent<PluginIconProps>('PluginIcon');
export const Navigation = getComponent<NavigationProps>('Navigation');
export const NavigationActions = getComponent<NavigationActionsProps>('NavigationActions');
export const Redirect = getComponent<RedirectProps>('Redirect');
export const StatefulComponent = getComponent<StatefulComponentProps>('StatefulComponent');
export const TouchableItem = getComponent<TouchableItemProps>('TouchableItem');
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

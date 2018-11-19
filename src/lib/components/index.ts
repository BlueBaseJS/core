import {
	ErrorStateProps,
	LoadingStateProps,
	StatefulComponentProps
} from '../../components';
import { TextProps, ViewProps } from 'react-native';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ButtonProps } from '../../ui-interfaces';
import React from 'react';

export function getComponent<T = any>(name: string) {
	return class BlueBaseComponent extends React.PureComponent<T> {

		static contextType = BlueBaseContext;

		render() {
			const BB: BlueBase = this.context;
			const Component = BB.Components.resolve(name);

			return React.createElement(Component, this.props);
		}
	} as React.ComponentType<T>;
}

// BlueBase
export const ErrorState = getComponent<ErrorStateProps>('ErrorState');
export const LoadingState = getComponent<LoadingStateProps>('LoadingState');
export const StatefulComponent = getComponent<StatefulComponentProps>('StatefulComponent');

// Native
export const Button = getComponent<ButtonProps>('Button');
export const Text = getComponent<TextProps>('Text');
export const View = getComponent<ViewProps>('View');


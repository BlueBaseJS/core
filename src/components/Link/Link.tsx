import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { NavigationActionsObject, NavigationParams } from '../NavigationActions';
import { NavigationActions } from '../../getComponent';
import React from 'react';
import TouchableItem from '../HeaderBackButton/TouchableItem';

export interface LinkProps {
	routeName?: string,
	path?: string,
	params?: NavigationParams;
	replace?: boolean,
	onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
	component: React.ComponentType<any>
}


/**
 * 🔗 Link
 */
export class Link extends React.PureComponent<LinkProps> {

	public static defaultProps: Partial<LinkProps> = {
		component: TouchableItem,
		replace: false,
	};

	handlePress(event: NativeSyntheticEvent<NativeTouchEvent>, navigation: NavigationActionsObject) {

		const { routeName, path, params, replace } = this.props;

		if (!event.defaultPrevented) {
			event.preventDefault();
			const fn = (replace === true) ? navigation.replace : navigation.push;

			if (typeof routeName === 'string') {
				fn(routeName, params);
			}
			else if (typeof path === 'string') {
				fn({ path }, params);
			}
		}
	}

	render() {

		const { component: Component, routeName, path, params, onPress, replace, ...rest } = this.props;

		return (
			<NavigationActions>
				{( navigation ) => {

					const href = path ? path : '';
					const onPressDefault = (e: any) => this.handlePress(e, navigation);

					return (
						<Component
							{...rest}
							href={href}
							onPress={onPress || onPressDefault}
						/>
					);
				}}
			</NavigationActions>
		);
	}
}

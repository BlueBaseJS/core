import { LinkProps, NavigationActionsObject } from '@bluebase/components';
import { NativeSyntheticEvent, NativeTouchEvent, Platform } from 'react-native';
import { NavigationActions } from '../../getComponent';
import React from 'react';
import { TouchableItem } from '../TouchableItem';

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

		return Component ? (
			<NavigationActions>
				{( navigation ) => {

					const onPressDefault = (e: any) => this.handlePress(e, navigation);

					return (Platform.OS === 'web' && !!path && path !== '')
					? <a href={path} onClick={onPress as any || onPressDefault} {...this.props} />
					: <Component {...rest} onPress={onPress || onPressDefault} /> ;
				}}
			</NavigationActions>
		): null;
	}
}

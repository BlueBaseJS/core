/* eslint-disable react/prop-types */
import { NativeSyntheticEvent, NativeTouchEvent, Platform, Text } from 'react-native';

import { LinkProps } from '@bluebase/components';
import React from 'react';
import { TouchableItem } from '../TouchableItem';
import { useNavigation } from '../../hooks';

const ExternalLink = (props: any) => <Text {...props} accessibilityRole="link" />;

/**
 * 🔗 Link
 */
export const Link = (props: LinkProps) => {
	const { method, routeName, path, params, onPress, replace, ...rest } = props;
	const navigation = useNavigation();

	if (!props.component) {
		return null;
	}

	const Component = props.component;

	function handlePress(event: NativeSyntheticEvent<NativeTouchEvent>) {
		if (event && !event.defaultPrevented) {
			event.preventDefault();

			let fn = navigation.navigate;

			if (method) {
				fn = navigation[method];
			}

			if (replace === true) {
				fn = navigation.replace;
			}

			if (typeof routeName === 'string') {
				fn(routeName, params);
			} else if (typeof path === 'string') {
				fn({ path }, params);
			}
		}
	}

	return Platform.OS === 'web' && !!path && path !== '' ? (
		<ExternalLink {...rest} href={path} onPress={onPress || handlePress} />
	) : (
		<Component {...rest} onPress={onPress || handlePress} />
	);
};

Link.displayName = 'Link';
Link.defaultProps = {
	component: TouchableItem,
	replace: false,
};

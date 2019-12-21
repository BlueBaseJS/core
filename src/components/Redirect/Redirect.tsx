import { NavigationActionParams, NavigationActionsObject } from '@bluebase/components';
import { NavigationActions } from '../../getComponent';
import React from 'react';

export interface RedirectProps {
	routeName?: string,
	path?: string,
	params?: NavigationActionParams;
	push?: boolean,
}

/**
 * 🔀 Redirect
 */
export const Redirect = (props: RedirectProps) => {

	const { routeName, path, params, push } = props;

	return (
		<NavigationActions>
			{({ push: pushFn, replace }: NavigationActionsObject) => {

				const fn = (push === true) ? pushFn : replace;

				if (typeof routeName === 'string') {
					fn(routeName, params);
				}
				else if (typeof path === 'string') {
					fn({ path }, params);
				}

				return null;
			}}
		</NavigationActions>
	);
};

Redirect.defaultProps = {
	push: false,
};
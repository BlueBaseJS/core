import { NavigationActionsObject, NavigationActionsProps } from '@bluebase/components';
import { createContext, useContext } from 'react';

import { renderChildrenWithProps } from '../../utils';

const stubAction = () => {
	return;
};

export const StubNavigationActionsObject: NavigationActionsObject = {
	getParam: stubAction,
	goBack: stubAction,
	navigate: stubAction,
	pop: stubAction,
	push: stubAction,
	replace: stubAction,
	setParams: stubAction,
	source: null,
	state: {
		key: '',
		params: {},
		routeName: '',
		url: '',
	},
};

export const NavigationContext = createContext<NavigationActionsObject>(
	StubNavigationActionsObject
);

export function useNavigation() {
	return useContext(NavigationContext);
}

export const NavigationActions = ({ children }: NavigationActionsProps) => {
	const actions = useNavigation();
	return renderChildrenWithProps(children, actions);
};

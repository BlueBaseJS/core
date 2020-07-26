import { NavigationActionsObject } from '@bluebase/components';
import { createContext } from 'react';

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

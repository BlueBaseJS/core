import { NavigationActionsObject } from '@bluebase/components';
import { createContext } from 'react';

const stubAction = (): any => {
	return;
};

export const StubNavigationActionsObject: NavigationActionsObject = {
	route: { key: 'Stub', params: {}, name: 'Stub' },
	navigate: stubAction,
	reset: stubAction,
	goBack: stubAction,
	isFocused: stubAction,
	canGoBack: stubAction,
	getId: stubAction,
	getParent: stubAction,
	setParams: stubAction,
	setOptions: stubAction,
	replace: stubAction,
	push: stubAction,
	pop: stubAction,
	popToTop: stubAction,
	openDrawer: stubAction,
	closeDrawer: stubAction,
	toggleDrawer: stubAction,
	jumpTo: stubAction,
	source: null,
};

export const NavigationContext = createContext<NavigationActionsObject>(
	StubNavigationActionsObject
);

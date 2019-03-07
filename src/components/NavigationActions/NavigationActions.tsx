import { renderChildrenWithProps } from '../../utils';

export interface NavigationActionParams {
	[key: string]: any;
}

export interface NavitionActionRouteNamePayload {
	routeName: string,
	params?: NavigationActionParams;
}

export interface NavitionActionPathPayload {
	path: string,
	params?: NavigationActionParams;
}

export type NavigationActionPayload = string | NavitionActionRouteNamePayload | NavitionActionPathPayload;

export interface NavigationActionsObject {

	navigate: (routeName: NavigationActionPayload, params?: NavigationActionParams) => void,
	goBack: () => void,

	replace: (routeName: NavigationActionPayload, params?: NavigationActionParams) => void,
	push: (routeName: NavigationActionPayload, params?: NavigationActionParams) => void,
	pop: (steps?: number) => void,

	setParams: (params: NavigationActionParams) => void,
	getParam: (key: string, defaultValue: any) => any,

	source: any,

	state: {
		key: string,
		routeName: string,
		url: string,
		search?: string,
		params: NavigationActionParams,
	}
}

export interface NavigationActionsProps {
	children: ((actions: NavigationActionsObject) => React.ReactNode)
}

const stubAction = () => { return; };

const stubActions: NavigationActionsObject = {
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
	}
};

export const NavigationActions
 = ({ children }: NavigationActionsProps) => renderChildrenWithProps(children, stubActions);
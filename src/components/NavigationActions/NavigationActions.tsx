import { renderChildrenWithProps } from '../../utils';

export interface NavigationParams {
	[key: string]: any;
}

export interface NavitionActionRouteNamePayload {
	routeName: string,
	params?: NavigationParams;
}

export interface NavitionActionPathPayload {
	path: string,
	params?: NavigationParams;
}

export type NavigationActionPayload = string | NavitionActionRouteNamePayload | NavitionActionPathPayload;

export interface NavigationActionsObject {

	navigate: (routeName: NavigationActionPayload, params?: NavigationParams) => void,
	goBack: () => void,

	replace: (routeName: NavigationActionPayload, params?: NavigationParams) => void,
	push: (routeName: NavigationActionPayload, params?: NavigationParams) => void,
	pop: (steps?: number) => void,

	setParams: (params: NavigationParams) => void,
	getParam: (key: string, defaultValue: any) => any,

	source: any,

	state: {
		key: string,
		routeName: string,
		url: string,
		search?: string,
		params: NavigationParams,
	}
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

export interface NavigationActionsProps {
	children: ((actions: NavigationActionsObject) => React.ReactNode)
}

export const NavigationActions
 = ({ children }: NavigationActionsProps) => renderChildrenWithProps(children, stubActions);
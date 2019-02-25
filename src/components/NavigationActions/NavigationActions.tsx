import { renderChildrenWithProps } from '../../utils';

export interface NavigationParams {
	[key: string]: any;
}

export interface NavigationActionsObject {

	navigate: (path: string, params?: NavigationParams) => void,
	goBack: () => void,

	replace: (path: string, params?: NavigationParams) => void,
	push: (path: string, params?: NavigationParams) => void,
	pop: (steps?: number) => void,

	setParams: (params: NavigationParams) => void,
	getParam: (key: string) => any,

	source: any,
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
	source: null
};

export interface NavigationActionsProps {
	children: ((actions: NavigationActionsObject) => React.ReactNode)
}

export const NavigationActions
 = ({ children }: NavigationActionsProps) => renderChildrenWithProps(children, stubActions);
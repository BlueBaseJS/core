import { NavigationActionsObject, NavigationActionsProps } from '@bluebase/components';
import { renderChildrenWithProps } from '../../utils';

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
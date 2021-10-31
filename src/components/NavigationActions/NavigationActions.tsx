import { NavigationActionsProps } from '@bluebase/components';

import { useNavigation } from '../../hooks';
import { renderChildrenWithProps } from '../../utils';

export const NavigationActions = ({ children }: NavigationActionsProps) => {
	const actions = useNavigation();
	return renderChildrenWithProps(children, actions);
};

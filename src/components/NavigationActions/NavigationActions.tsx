import { NavigationActionsProps } from '@bluebase/components';
import { renderChildrenWithProps } from '../../utils';
import { useNavigation } from '../../hooks';

export const NavigationActions = ({ children }: NavigationActionsProps) => {
	const actions = useNavigation();
	return renderChildrenWithProps(children, actions);
};

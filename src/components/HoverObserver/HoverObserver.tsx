import { HoverObserverProps } from '@bluebase/components';

import { renderChildrenWithProps } from '../../utils';

export interface HoverObserverState {
	readonly isHovering: boolean;
}

export const HoverObserver = (props: HoverObserverProps) => {
	return renderChildrenWithProps(props.children, { isHovering: false });
};

HoverObserver.displayName = 'HoverObserver';

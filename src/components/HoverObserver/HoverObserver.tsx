import { MaybeRenderPropChildren, renderChildrenWithProps } from '../../utils';

export interface HoverObserverProps {

	/** Milliseconds to delay hover trigger. Defaults to zero. */
	hoverDelayInMs?: number,

	/** Milliseconds to delay hover-off trigger. Defaults to zero. */
	hoverOffDelayInMs?: number,

	/** Called with named argument isHovering when isHovering is set or unset. */
	onHoverChanged?: (state: HoverObserverState) => void,

	/** Defaults to set isHovering. */
	onMouseEnter?: (obj: any) => void,

	/** Defaults to unsetting isHovering. */
	onMouseLeave?: (obj: any) => void,
	onMouseOver?: (obj: any) => void,
	onMouseOut?: (obj: any) => void,
	children?: MaybeRenderPropChildren<HoverObserverState>
}

export interface HoverObserverState {
	readonly isHovering: boolean;
}

export const HoverObserver = (props: HoverObserverProps) => {
	return renderChildrenWithProps(props.children, { isHovering: false });
};

HoverObserver.displayName = 'HoverObserver';

import { MaybeRenderPropChildren, renderChildrenWithProps } from '../../utils';
import React, { SyntheticEvent } from 'react';

// TODO: fix for react-native, this is web only component
interface MouseEventObject {
	e: SyntheticEvent,
	setIsHovering: () => void,
	unsetIsHovering: () => void,
}

export interface HoverObserverProps {

	/** Milliseconds to delay hover trigger. Defaults to zero. */
	hoverDelayInMs?: number,

	/** Milliseconds to delay hover-off trigger. Defaults to zero. */
	hoverOffDelayInMs?: number,

	/** Called with named argument isHovering when isHovering is set or unset. */
	onHoverChanged?: (state: HoverObserverState) => void,

	/** Defaults to set isHovering. */
	onMouseEnter?: (obj: MouseEventObject) => void,

	/** Defaults to unsetting isHovering. */
	onMouseLeave?: (obj: MouseEventObject) => void,
	onMouseOver?: (obj: MouseEventObject) => void,
	onMouseOut?: (obj: MouseEventObject) => void,
	children?: MaybeRenderPropChildren<HoverObserverState>
}

export interface HoverObserverState {
	readonly isHovering: boolean;
}

const Noop = () => { return; };

/**
 * # 🛸 HoverObserver
 *
 * A React component that notifies its children of hover interactions.
 *
 * Initial code taken from: https://github.com/ethanselzer/react-hover-observer.
 *
 * ## Usage
 * ```jsx
 * <HoverObserver>
 *  {({ isHovering }) => (
 * 		 <YourChildComponent isActive={isHovering} />
 *  )}
 * </HoverObserver>
 * ```
 */
export class HoverObserver extends React.PureComponent<HoverObserverProps, HoverObserverState> {

	public static defaultProps: Partial<HoverObserverProps> = {
		hoverDelayInMs: 0,
		hoverOffDelayInMs: 0,
		onHoverChanged: Noop,
		onMouseEnter: ({ setIsHovering }) => setIsHovering(),
		onMouseLeave: ({ unsetIsHovering }) => unsetIsHovering(),
		onMouseOut: Noop,
		onMouseOver: Noop,
	};

	private timerIds: number[] = [];

	constructor(props: HoverObserverProps) {
		super(props);

		this.state = {
			isHovering: false
		};

		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.setIsHovering = this.setIsHovering.bind(this);
		this.unsetIsHovering = this.unsetIsHovering.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);

		this.timerIds = [];
	}

	onMouseEnter(e: SyntheticEvent) {
		this.props.onMouseEnter!({
			e,
			setIsHovering: this.setIsHovering,
			unsetIsHovering: this.unsetIsHovering
		});
	}

	onMouseLeave(e: SyntheticEvent) {
		this.props.onMouseLeave!({
			e,
			setIsHovering: this.setIsHovering,
			unsetIsHovering: this.unsetIsHovering
		});
	}

	onMouseOver(e: SyntheticEvent) {
		this.props.onMouseOver!({
			e,
			setIsHovering: this.setIsHovering,
			unsetIsHovering: this.unsetIsHovering
		});
	}

	onMouseOut(e: SyntheticEvent) {
		this.props.onMouseOut!({
			e,
			setIsHovering: this.setIsHovering,
			unsetIsHovering: this.unsetIsHovering
		});
	}

	componentWillUnmount() {
		this.clearTimers();
	}

	setIsHovering() {
		this.clearTimers();

		const hoverScheduleId = setTimeout(() => {
			const newState = { isHovering: true };
			this.setState(newState, () => {
				this.props.onHoverChanged!(newState);
			});
		}, this.props.hoverDelayInMs) as any;

		this.timerIds.push(hoverScheduleId);
	}

	unsetIsHovering() {
		this.clearTimers();

		const hoverOffScheduleId = setTimeout(() => {
			const newState = { isHovering: false };
			this.setState(newState, () => {
				this.props.onHoverChanged!(newState);
			});
		}, this.props.hoverOffDelayInMs) as any;

		this.timerIds.push(hoverOffScheduleId);
	}

	clearTimers() {
		const ids = this.timerIds;
		while (ids.length) {
			const id = ids.pop() as number;
			clearTimeout(id);
		}
	}

	render() {
		const { children } = this.props;

		return (
			<div {...{
				onMouseEnter: this.onMouseEnter,
				onMouseLeave: this.onMouseLeave,
				onMouseOut: this.onMouseOut,
				onMouseOver: this.onMouseOver,
			}}>
				{renderChildrenWithProps(children, this.state)}
			</div>
		);
	}
}
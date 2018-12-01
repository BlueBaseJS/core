import React, { SyntheticEvent } from 'react';
import { MaybeRenderPropChildren } from '../../utils';
import { Noop } from '../Noop';

// TODO: fix for react-native, this is web only component
interface MouseEventObject {
	e: SyntheticEvent,
	setIsHovering: () => void,
	unsetIsHovering: () => void,
}

export interface HoverObserverProps {
	hoverDelayInMs?: number,
	hoverOffDelayInMs?: number,
	onHoverChanged?: (state: HoverObserverState) => void,
	onMouseEnter?: (obj: MouseEventObject) => void,
	onMouseLeave?: (obj: MouseEventObject) => void,
	onMouseOver?: (obj: MouseEventObject) => void,
	onMouseOut?: (obj: MouseEventObject) => void,
	children?: MaybeRenderPropChildren<HoverObserverState>
}

export interface HoverObserverState {
	readonly isHovering: boolean;
}

/**
 * 🛸 HoverObserver
 *
 * Initial code taken from: https://github.com/ethanselzer/react-hover-observer
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
		}, this.props.hoverDelayInMs);

		this.timerIds.push(hoverScheduleId);
	}

	unsetIsHovering() {
		this.clearTimers();

		const hoverOffScheduleId = setTimeout(() => {
			const newState = { isHovering: false };
			this.setState(newState, () => {
				this.props.onHoverChanged!(newState);
			});
		}, this.props.hoverOffDelayInMs);

		this.timerIds.push(hoverOffScheduleId);
	}

	clearTimers() {
		const ids = this.timerIds;
		while (ids.length) {
			const id = ids.pop();

			if (id) {
				clearTimeout(id);
			}
		}
	}

	renderChildrenWithProps(children: HoverObserverProps['children'], props: HoverObserverState) {
		if (typeof children === 'function') {
			return (children as any)(props);
		}

		return children;
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
				{this.renderChildrenWithProps(children, this.state)}
			</div>
		);
	}
}
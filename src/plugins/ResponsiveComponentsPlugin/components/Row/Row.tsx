import React, { ReactElement } from 'react';
import { ViewProperties } from 'react-native';

import { withBlueRain, BlueRainType } from '../../../../index';
import { withWindowSize } from '../../redux/connect';
import isHidden from '../../helpers/isHidden';

export interface RowProperties extends ViewProperties {

	/**
	 * Total number of columns this Row can have. Defaults to 12.
	 */
	size: number;

	/**
	 * The gutter width, i.e. padding between columns. Defaults to 30 (15 on each side)
	 */
	gutter: number;

	/**
	 * Accepts a boolean. This boolean defines the style property `flexWrap`.
	 * If no prop is specified, then the defaults value will be `flexWrap: 'wrap'`.
	 * If you add the prop to the `Row` then the style value will equal
	 * `flexWrap: nowrap`. This makes it easy to see what rows will wrap
	 * at a glance.
	 */
	nowrap?: boolean;

	/**
	 * Defines the style property `alignItems` of the component.
	 */
	alignItems?: string;

	/**
	 * Defines the style property `justifyContent` of the component.
	 */
	justifyContent?: string;
}

interface PropsFromHOCs {
	bluerain: BlueRainType;
	windowSize: string;
}

const defaultProps: RowProperties = {
	size: 12,
	gutter: 30
};

const cloneElements = (props) => {
  // if rowSize doesn't exist or is 0 default to 12
	props.rowSize = props.size > 0 ? props.size : 12;
	return React.Children.map(props.children, element => React.cloneElement(element as ReactElement<any>, props));
};

const Row: React.SFC<RowProperties & PropsFromHOCs> = (props) => {

	const { bluerain: BR, ...others } = props;
	const View = BR.Components.get('View');

	if (isHidden(props.windowSize, props)) {
		return null;
	}

	const style = {
		flexDirection: 'row',
		flexWrap: props.nowrap ? 'nowrap' : 'wrap',
		alignItems: props.alignItems,
		justifyContent: props.justifyContent,
		marginLeft: (props.gutter/2)*(-1),
		marginRight: (props.gutter/2)*(-1),
	};
	const stylesheet = BR.Utils.createStyleSheet([props.style, style]);

	return (
  <View {...others} style={stylesheet} >
    {cloneElements(props)}
  </View>
	);
};

Row.defaultProps = defaultProps;

export default withBlueRain(withWindowSize(Row));

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ButtonProps } from '../../ui-interfaces';
import React from 'react';

export interface ComponentStateProps {

	/**
	 * Action title
	 */
	actionTitle?: string;

	/**
	 * Action styles
	 */
	actionStyle?: ButtonProps['style'];

	/**
	 * Action onPress handler
	 */
	actionOnPress?: ButtonProps['onPress'];

	/**
	 * Description Text
	 */
	description?: string;

	/**
	 * Description style
	 */
	descriptionStyle?: any;

	/**
	 * Image Component, if provided, imageSource will be ignored
	 */
	image?: React.ReactNode;

	/**
	 * Image styles
	 */
	imageStyle?: any;

	/**
	 * Image source
	 */
	imageSource?: string;

	/**
	 * Title text
	 */
	title?: string;

	/**
	 * Title style
	 */
	titleStyle?: any;
}

export class ComponentState extends React.PureComponent<ComponentStateProps> {

	static contextType = BlueBaseContext;

	render() {

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

		const {
			actionOnPress,
			actionStyle,
			actionTitle,
			description,
			descriptionStyle,
			image,
			imageSource,
			imageStyle,
			title,
			titleStyle
		} = this.props;

		const imgStyle = {
			height: 250,
			marginBottom: 10,
			width: 250,
			...imageStyle
		};

		return (
			<BB.Components.View>
				{image ? image : (imageSource ? <BB.Components.Image style={imgStyle} source={imageSource} /> : null)}
				{title ? <BB.Components.Text style={titleStyle} children={title} /> : null}
				{description ? <BB.Components.Text style={descriptionStyle} children={description} /> : null}
				{actionTitle
					? (
						<BB.Components.Button style={actionStyle} onPress={actionOnPress}>
							<BB.Components.Text>{actionTitle}</BB.Components.Text>
						</BB.Components.Button>
					)
					: null}
			</BB.Components.View>
		);
	}
}

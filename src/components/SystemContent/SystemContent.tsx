import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';
import { ViewProperties } from 'react-native';

export interface SystemContentProps extends ViewProperties {}

export class SystemContent extends React.PureComponent<ViewProperties> {

	static contextType = BlueBaseContext;

	render() {

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

		return (
			<BB.Components.View {...this.props}>
				<BB.Components.Text>
					🚀 BlueBase System Content!
				</BB.Components.Text>
				{this.props.children}
			</BB.Components.View>
		);
	}
}
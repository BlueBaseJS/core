import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';
import { ViewProperties } from 'react-native';

export interface SystemAppProps extends ViewProperties {}

export class SystemApp extends React.PureComponent<SystemAppProps> {

	static contextType = BlueBaseContext;

	render() {

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

		return (
			<BB.Components.View {...this.props}>
				<BB.Components.SystemHeader />
				<BB.Components.SystemContent />
				<BB.Components.SystemFooter />
			</BB.Components.View>
		);
	}
}
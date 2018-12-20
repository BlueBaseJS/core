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

		const { children, ...rest } = this.props;
		const content = children || <BB.Components.SystemContent />;

		return (
			<BB.Components.View {...rest}>
				<BB.Components.SystemHeader />
				{content}
				<BB.Components.SystemFooter />
			</BB.Components.View>
		);
	}
}
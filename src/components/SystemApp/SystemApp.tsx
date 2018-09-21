import React, { ReactNode } from 'react';

export interface SystemAppProperties {
	children: ReactNode
}

export class SystemApp extends React.PureComponent<SystemAppProperties> {

	render() {
		return (
			<div>
				💧 BlueRain System App!
				{this.props.children}
			</div>
		);
	}
}

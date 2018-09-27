import React, { ReactNode } from 'react';

export interface SystemContentProperties {
	children: ReactNode
}

export class SystemContent extends React.PureComponent<SystemContentProperties> {

	render() {
		return (
			<div>
				💧 BlueRain System Content!
				{this.props.children}
			</div>
		);
	}
}

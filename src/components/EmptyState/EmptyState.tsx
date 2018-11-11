import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';

export class EmptyState extends React.PureComponent {

	static contextType = BlueBaseContext;

	render() {

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

		return (
			<BB.Components.ComponentState title="Empty area" description="No data found." />
		);
	}
}

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';

export interface ErrorStateProps {
	error?: Error,
	retry?: () => void,
}

/**
 * 🚨 ErrorState
 */
export class ErrorState extends React.PureComponent<ErrorStateProps> {

	static contextType = BlueBaseContext;

	render() {

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

		return (
			<BB.Components.ComponentState
				title="Something broke!"
				description="An unknown error has occured. Please try again later."
			/>
		);
	}
}

import { BlueBase, BlueBaseContext } from '../../../';
import React from 'react';
import { Theme } from '../../../models';
import { ThemeContext } from '../ThemeContext';

export class ThemeDemo extends React.PureComponent {

	static contextType = BlueBaseContext;

	render() {
		const BB: BlueBase = (this as any).context;

		return (
			<ThemeContext.Consumer children={({ theme }: { theme: Theme }) => {

				const mainStyle = {
					backgroundColor: theme.palette.background.default,
					padding: theme.spacing.unit
				};

				return (
					<BB.Components.View style={mainStyle}>
						<BB.Components.View>
							<BB.Components.Text style={theme.typography.body1}>
								{theme.name}
							</BB.Components.Text>
						</BB.Components.View>
					</BB.Components.View>
				);
			}} />
		);
	}
}

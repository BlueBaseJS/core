import { BlueBase, BlueBaseContext } from '../../';
import React from 'react';
import { Theme } from '../ThemeRegistry';
import { ThemeContext } from '../../themes';

export interface ThemeDemoProps {
	children?: React.ReactNode;
}

export class ThemeDemo extends React.PureComponent<ThemeDemoProps> {

	static contextType = BlueBaseContext;

	render() {
		const BB: BlueBase = (this as any).context;
		const { children } = this.props;

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
							{children}
						</BB.Components.View>
					</BB.Components.View>
				);
			}} />
		);
	}
}

// tslint:disable:jsx-alignment jsx-no-lambda no-console
import { BlueBase, BlueBaseConsumer } from '../../../../';
import React from 'react';
import { Theme } from '../Theme/theme';
import { ThemeContext } from '../ThemeContext';

export const ThemeDemo = () => {

	return (
    <BlueBaseConsumer children={(BB: BlueBase) => {

			return (
				<ThemeContext.Consumer children={({ theme }: { theme: Theme }) => {
	
					const mainStyle = {
						backgroundColor: theme.palette.background.default,
						padding: theme.spacing.unit
					};
	
					return (
						<BB.Components.View style={mainStyle}>
							<BB.Components.View>
								<BB.Components.Text style={theme.typography.h1}>
									{theme.name}
								</BB.Components.Text>
							</BB.Components.View>
						</BB.Components.View>
					);
				}} />
			);
		}} />
	);
};
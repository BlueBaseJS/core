import { BlueBase } from '../../BlueBase';
import { BlueBaseProvider } from '../../Context';
import { IntlProvider } from '../../intl';
import React from 'react';
import { ThemeProvider } from '../../themes';
import { getComponent } from '../../getComponent';

const BlueBaseContent = getComponent('BlueBaseContent');

export interface BlueBaseRootProps {
	BB: BlueBase;
	children: React.ReactNode;
}

export const BlueBaseRoot = ({ BB, children }: BlueBaseRootProps) => (
	<BlueBaseProvider value={BB}>
		<ThemeProvider>
			<IntlProvider>
				<BlueBaseContent BB={BB}>{children}</BlueBaseContent>
			</IntlProvider>
		</ThemeProvider>
	</BlueBaseProvider>
);

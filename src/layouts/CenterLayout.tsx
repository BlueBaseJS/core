import React from 'react';
import { withBlueRain, BlueRainType } from '../index';
import { ViewProperties } from '@blueeast/bluerain-ui-interfaces';

export interface CenterLayoutProperties extends ViewProperties {
	children: React.ReactNode[];
	bluerain: BlueRainType;
}

const CenterLayout = (props: CenterLayoutProperties) => {

	const { children, bluerain: BR, ...other } = props;
	const Page = BR.Components.get('Page');
	const Wallpaper = BR.Components.get('Wallpaper');

	const pageStyle = {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	};

	return (
		<Wallpaper {...other}>
			<Page style={pageStyle}>{children}</Page>
		</Wallpaper>
	);
};

export default CenterLayout;

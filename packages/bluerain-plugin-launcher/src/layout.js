import React from 'react';
import { withBlueRain } from '@blueeast/bluerain-os';

import Launcher from './Launcher';

const Layout = ({ bluerain: BR, Component, bannerUrl }) => {

	const wallpaper = BR.Configs.get('plugins.launcher.bannerImageUrl');

	const layout = {
		component: 'View',
		props: {
			style: {
				backgroundImage: `url(${wallpaper})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
			}
		},
		children: [{
			component: 'ResponsiveLayout',
			props: {
				default: () => <Launcher cols={6} />,
				xs: () => <Launcher cols={2} />,
				sm: () => <Launcher cols={3} />,
				md: () => <Launcher cols={4} />,
				xl: () => <Launcher cols={8} />,
			}
		}]
	};

	return BR.Utils.parseJsonSchema(layout);
};

export default withBlueRain(Layout);

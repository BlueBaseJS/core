import { withBlueRain } from '@blueeast/bluerain-os';

import getMobileLayout from './mobile/';
import getDesktopLayout from './desktop/';
// import defaultConfigs from '../defaultConfigs';

const Layout = ({ bluerain: BR, Component, bannerUrl }) => {

	const configBannerImage = BR.Configs.get('plugins.launcher.bannerImageUrl');
	// const defaultBannerImage = defaultConfigs.bannerImage;
	// const bannerUrl = configBannerImage || defaultBannerImage;

	const layout = {
		component: 'ResponsiveLayout',
		props: {
			default: getDesktopLayout(BR, Component, configBannerImage),
			xs: getMobileLayout(BR, Component, configBannerImage),
			sm: getMobileLayout(BR, Component, configBannerImage)
		}
	};

	return BR.Utils.parseJsonSchema(layout);
};

export default withBlueRain(Layout);

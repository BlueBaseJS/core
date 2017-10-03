import { withBlueRain } from '@blueeast/bluerain-os';

import getMobileLayout from './mobile/';
import getDesktopLayout from './desktop/';

const Layout = ({ bluerain: BR, Component }) => {

	const layout = {
		component: 'ResponsiveLayout',
		props: {
			default: getDesktopLayout(BR, Component),
			xs: getMobileLayout(BR, Component),
			sm: getMobileLayout(BR, Component)
		}
	};

	return BR.Utils.parseJsonSchema(layout);
};

export default withBlueRain(Layout);

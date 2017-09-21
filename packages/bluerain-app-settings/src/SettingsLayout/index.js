import getMobileLayout from './mobile/Layout';
import getDesktopLayout from './desktop/Layout';

const SettingsLayout = ({ location, match, bluerain: BR, items }) => {

	const layout = {
		component: 'ResponsiveLayout',
		props: {
			default: getDesktopLayout(location, match, items, BR),
			xs: getMobileLayout(location, match, items, BR),
			sm: getMobileLayout(location, match, items, BR)
		}
	};

	return BR.Utils.parseJsonSchema(layout);
};

export default SettingsLayout;

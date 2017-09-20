import getMobileLayout from './mobile/Layout';
import getDesktopLayout from './desktop/Layout';

const SettingsLayout = ({ match, bluerain: BR, items }) => {

	const layout = {
		component: 'ResponsiveLayout',
		props: {
			default: getDesktopLayout(match, items, BR),
			xs: getMobileLayout(match, items, BR),
			sm: getMobileLayout(match, items, BR)
		}
	};

	return BR.Utils.parseJsonSchema(layout);
};

export default SettingsLayout;

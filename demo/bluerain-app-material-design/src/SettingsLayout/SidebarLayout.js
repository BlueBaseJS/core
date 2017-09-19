import RX from 'reactxp';
import { withBlueRain } from '@blueeast/bluerain-os';

// type Props = {
//   bluerain: {},
// 	sidebar: SidebarContent,
// 	main: MainContent,
// 	muiTheme,
// 	sidebarWidth
// };

const SidebarLayout = ({
	bluerain: BR,
	sidebar: SidebarContent,
	main: MainContent,
	sidebarWidth,
	style,
	sidebarStyle,
	mainStyle,
}) => {

	const LayoutStyles = [RX.Styles.createViewStyle({
		flexDirection: 'row',
		overflow: 'auto',
		flexGrow: 1,
	}, false), style];

	const SidebarStyles = [RX.Styles.createViewStyle({
		width: sidebarWidth,
	}, false), sidebarStyle];

	const MainStyles = [RX.Styles.createViewStyle({
		flex: 1
	}, false), mainStyle];

	const schema = {
		// Main Layout
		component: 'View',
		props: { style: LayoutStyles },
		children: [

			// Sidebar Container
			{
				component: 'View',
				props: { style: SidebarStyles },
				children: [{ component: SidebarContent }]
			},

			// Main Container
			{
				component: 'View',
				props: { style: MainStyles },
				children: [{ component: MainContent }]
			},
		]
	};

	return BR.Utils.parseJsonSchema(schema);
};

SidebarLayout.defaultProps = {
	sidebarWidth: '25%',
};

export default withBlueRain(SidebarLayout);

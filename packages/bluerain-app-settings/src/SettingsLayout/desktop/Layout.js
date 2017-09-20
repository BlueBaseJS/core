import RX from 'reactxp';

import Sidebar from '../common/Sidebar';
import extractPageRoutes from '../common/extractPageRoutes';

export default (match, items, BR) => (props) => {
	const pages = extractPageRoutes(match, items);

	const LayoutStyles = RX.Styles.createViewStyle({
		flexDirection: 'row',
		overflow: 'auto',
		flexGrow: 1,
	}, false);

	const SidebarStyles = RX.Styles.createViewStyle({
		padding: 16,
		width: '25%',
	}, false);

	const MainStyles = RX.Styles.createViewStyle({
		flex: 1
	}, false);


	const layout = {
		// Main Layout
		component: 'View',
		props: { style: LayoutStyles },
		children: [

			// Sidebar Container
			{
				component: Sidebar,
				props: {
					style: SidebarStyles,
					match,
					items
				},
			},

			// Main Container
			{
				component: 'View',
				props: { style: MainStyles },
				children: [{
					component: 'Switch',
					children: [{
						component: 'Route',
						props: {
							path: match.url,
							exact: true,
							component: pages[0] && pages[0].props && pages[0].props.component
						}
					}, ...pages]
				}]
			},
		]
	};

	return BR.Utils.parseJsonSchema(layout);
};

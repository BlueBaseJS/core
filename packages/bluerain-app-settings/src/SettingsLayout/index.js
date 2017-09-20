import React from 'react';
import RX from 'reactxp';
import Sidebar from './Sidebar';

import SidebarLayout from './SidebarLayout';

/**
 * Convert the items list in array of JSON schema of routes
 * @param {Object} match
 * @param {Object} items
 */
const extractPageRoutes = (match, items) => {
	const pages = items.filter(item => item.path && item.main);

	return pages.map(item => ({
		component: 'Route',
		props: {
			extact: true,
			path: `${match.url.replace(/\/+$/, '')}/${item.path}`,
			component: item.main
		}
	}));
};


const getDesktopLayout = (match, items, BR) => {
	const pages = extractPageRoutes(match, items);

	const sidebarStyle = RX.Styles.createViewStyle({
		padding: 16
	}, false);

	// const mainStyle = RX.Styles.createViewStyle({
	// 	padding: 16
	// }, false);

	const layout = {
		component: SidebarLayout,
		props: {
			sidebarStyle,
			// mainStyle,
			sidebar: () => (<Sidebar match={match} items={items} />),
			main: () => BR.Utils.parseJsonSchema({
				component: 'Switch',
				children: [{
					component: 'Route',
					props: {
						path: match.url,
						exact: true,
						component: pages[0] && pages[0].props && pages[0].props.component
					}
				}, ...pages]
			})
		}
	};

	return BR.Utils.parseJsonSchema(layout);
};

const getMobileLayout = (match, items, BR) => {

	const pages = extractPageRoutes(match, items);

	const style = RX.Styles.createViewStyle({
		// padding: 16
	}, false);

	const layout = {
		component: 'Switch',
		children: [{
			component: 'View',
			props: { style },
			children: [{
				component: 'Route',
				props: {
					path: match.url,
					exact: true,
					component: () => (<Sidebar match={match} items={items} />)
				}
			}, ...pages]
		}]
	};

	return BR.Utils.parseJsonSchema(layout);
};

const SettingsLayout = ({ match, bluerain: BR, items }) => {

	const layout = {
		component: 'ResponsiveLayout',
		props: {
			default: () => getDesktopLayout(match, items, BR),
			xs: () => getMobileLayout(match, items, BR),
			sm: () => getMobileLayout(match, items, BR)
		}
	};

	return BR.Utils.parseJsonSchema(layout);
};

export default SettingsLayout;

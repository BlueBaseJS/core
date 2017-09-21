import React from 'react';

import Sidebar from '../common/Sidebar';
import extractPageRoutes from '../common/extractPageRoutes';

import AppBar from './AppBar';

export default (location, match, items, BR) => (props) => {

	const withIntl = BR.Plugins.get('intl').withIntl;
	const pages = extractPageRoutes(match, items);

	const layout = {
		component: 'View',
		children: [{
			component: withIntl(AppBar),
			props: { location, match, BR }
		}, {
			component: 'Switch',
			children: [{
				component: 'View',
				children: [{
					component: 'Route',
					props: {
						path: match.url,
						exact: true,
						component: () => (<Sidebar match={match} items={items} />)
					}
				}, ...pages]
			}]
		}]
	};

	return BR.Utils.parseJsonSchema(layout);
};

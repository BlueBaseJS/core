import React from 'react';

import Sidebar from '../common/Sidebar';
import extractPageRoutes from '../common/extractPageRoutes';

export default (match, items, BR) => (props) => {

	const pages = extractPageRoutes(match, items);

	const layout = {
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
	};

	return BR.Utils.parseJsonSchema(layout);
};

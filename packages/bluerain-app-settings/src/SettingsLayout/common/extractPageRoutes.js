/**
 * Convert the items list in array of JSON schema of routes
 * @param {Object} match
 * @param {Object} items
 */
export default (match, items) => {
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

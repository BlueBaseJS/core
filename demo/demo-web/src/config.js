const config = {
	title: 'Todo MVC',

	locale: 'ur',
	
	plugins: {

		// Apollo GraphQl
		apollo: {
			networkInterface: {
				uri: 'http://localhost:3000/graphql'
			}
		},

		// Internationalization
		intl: {
			localeData: [].concat(
				require('react-intl/locale-data/ur'),
				// require('react-intl/locale-data/fr')
			)
		}
	}
};

if (process.env.NODE_ENV === 'production') {
	config.debug = false;
	config.development = false;
}

module.exports = config;

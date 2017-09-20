const config = {
	title: 'Brand Name',

	locale: 'en',
	
	plugins: {

		// Apollo GraphQl
		apollo: {
			networkInterface: {
				uri: 'http://localhost:3000/graphql'
			}
		},

		// Internationalization
		intl: {
			selectable: {
				'en': 'English',
				'ur': 'اردو'
			},
			localeData: [].concat(
				require('react-intl/locale-data/ur'),
				// require('react-intl/locale-data/fr')
			)
		},
	},

	theme: {
		appBar: {
			color: '#3949ab'
		}
	}
};

if (process.env.NODE_ENV === 'production') {
	config.debug = false;
	config.development = false;
}

module.exports = config;

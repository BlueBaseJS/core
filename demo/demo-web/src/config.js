const config = {
	title: 'Brand Name',

	locale: 'en',
	
	plugins: {

		// Apollo GraphQl
		apollo: {
			networkInterface: {
				uri: 'http://localhost:8000/graphql'
			}
		},

		// Internationalization
		intl: {
			selectable: {
				'en': 'English',
				'ur': 'اردو'
			},
			localeData: [].concat(
				require('react-intl/locale-data/ur')
				// require('react-intl/locale-data/fr')
			)
		},
		'user-management': {
			logoUrl: 'https://s3-us-west-2.amazonaws.com/bluerainimages/mevris-logo.svg',
			bannerImageUrl: 'https://s3-us-west-2.amazonaws.com/bluerainimages/bg.jpg'
		},
		'launcher': {
			bannerImageUrl: 'https://s3-us-west-2.amazonaws.com/bluerainimages/bg.jpg'
		}
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

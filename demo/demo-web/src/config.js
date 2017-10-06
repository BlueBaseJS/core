const config = {
	title: 'Brand Name',

	locale: 'en',

	wallpaper: {}, // TODO: Implement
	
	logos: {
		default: {
      src: "https://s3-us-west-2.amazonaws.com/bluerainimages/mevris-logo.svg",
      type: "image/svg+xml"
    },
		headerLogo: {
      src: "https://s3-us-west-2.amazonaws.com/bluerainimages/mevris-logo-expended.svg",
      type: "image/svg+xml"
    },
		headerLogoSquare: {
      src: "https://s3-us-west-2.amazonaws.com/bluerainimages/mevris-logo-icon.svg",
      type: "image/svg+xml"
    },
	},
	
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
		launcher: {
			bannerImageUrl: 'https://s3-us-west-2.amazonaws.com/bluerainimages/bg.jpg'
		},

		taskbar: {
			items: [{
				component: 'NavAppItem',
				props: { slug: 'hello-world' }
			},
			'->',
			{
				component: 'NavAppItem',
				props: { slug: 'settings' }
			}]
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

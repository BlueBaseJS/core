export default {
	name: 'my-app',
	slug: 'my-app',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/icon.png',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff'
	},
	updates: {
		fallbackToCacheTimeout: 0
	},
	assetBundlePatterns: [
		'**/*'
	],
	ios: {
		supportsTablet: true
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#FFFFFF'
		}
	},
	web: {
		favicon: './assets/favicon.png'
	},
	extra: {
		storybookNative: process.env.NODE_ENV === 'STORYBOOK_NATIVE'
	}
};

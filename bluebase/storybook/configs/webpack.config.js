// const { storybookWebpackConfigs } = require('@blueeast/bluerain-cli-essentials');
const path = require('path');
// const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

const { storybookWebpackConfigs } = require('@bluebase/cli-essentials');

module.exports = ({ config }) => {
	config = storybookWebpackConfigs({ config });

	config.resolve.alias = {
		...config.resolve.alias,

		'@bluebase/core': path.resolve(__dirname, '../../../src'),

		'react-native$': 'react-native-web',
		'@react-native-community/netinfo': 'react-native-web/dist/exports/NetInfo',
		// Add polyfills for modules that react-native-web doesn't support
		// Depends on expo-asset
		'react-native/Libraries/Image/AssetSourceResolver$': 'expo-asset/build/AssetSourceResolver',
		'react-native/Libraries/Image/assetPathUtils$': 'expo-asset/build/Image/assetPathUtils',
		'react-native/Libraries/Image/resolveAssetSource$': 'expo-asset/build/resolveAssetSource',
		// Alias internal react-native modules to react-native-web
		'react-native/Libraries/Components/View/ViewStylePropTypes$':
			'react-native-web/dist/exports/View/ViewStylePropTypes',
		'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
			'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
		'react-native/Libraries/vendor/emitter/EventEmitter$':
			'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
		'react-native/Libraries/vendor/emitter/EventSubscriptionVendor$':
			'react-native-web/dist/vendor/react-native/emitter/EventSubscriptionVendor',
		'react-native/Libraries/EventEmitter/NativeEventEmitter$':
			'react-native-web/dist/vendor/react-native/NativeEventEmitter',
	};

	config.module.rules.push({
		test: /\.js$/,
		exclude: /node_modules\/(?!(rn-placeholder|react-native-safe-area-view|react-native-paper|react-native-elements|react-native-vector-icons|react-native-animatable|react-native-svg)\/).*/,
		loader: 'babel-loader',
	});

	// config = withUnimodules(config, {
	// 	config: path.resolve(__dirname, '../../../build/storybook-native/app.json'),
	// });

	config.resolve.extensions = [
		'.web.ts',
		'.web.tsx',
		'.ts',
		'.tsx',
		'.web.js',
		'.web.jsx',
		'.js',
		'.jsx',
		'.json',
	];

	return config;
};

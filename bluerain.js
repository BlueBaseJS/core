// This file contain all the apps, plugins and configuration which are required
// for booting bluerain-os. see https://blueeast.gitbooks.io/bluerain-os/
module.exports = {
	platform: [
		require('@blueeast/bluerain-platform-reactxp'),
	],
	apps: [
		// All bluerain apps will also be added in this array
		// require('./test/apps/Alarm'),
		// require('./test/apps/Android'),
		// require('./test/apps/Apps'),
		// require('./test/apps/LightBulb'),
		// require('./test/apps/NoIcon'),
		// require('./test/apps/Sites'),
	],
	plugins: [
		// All bluerain plugins will be added here
		require('@blueeast/bluerain-plugin-react-router'),
		require('@blueeast/bluerain-plugin-redux'),
		require('@blueeast/bluerain-plugin-taskbar')

	],
	config: {
		// Configurations for bluerain-os will be added here
		title: 'Bluerain OS',

		plugins: {
			// Plugins related configurations will be added here
		},
		theme: {
			colors: {
				primary: '#3949ab'
			}
		}
	}
};

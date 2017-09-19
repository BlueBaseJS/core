import { withBlueRain } from '@blueeast/bluerain-os';
import App from './components/App';
import SettingsLayout from './SettingsLayout';

const EnhancedApp = withBlueRain(App);
EnhancedApp.appName = 'Settings';

EnhancedApp.initialize = function(config, ctx) {

	ctx.Components.register('SettingsLayout', SettingsLayout);
	// ctx.Filters.add('bluerain.intl.messages', function eng(messages) {
	// 	const en = require('./lang/en.json');
	// 	const ur = require('./lang/ur.json');

	// 	messages.en =  Object.assign(messages.en ? messages.en : {}, en);
	// 	messages.ur = Object.assign(messages.ur ? messages.ur : {}, ur);

	// 	return messages;
	// });
};

export default EnhancedApp;

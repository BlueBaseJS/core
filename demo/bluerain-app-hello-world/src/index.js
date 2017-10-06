import { withBlueRain } from '@blueeast/bluerain-os';
import React from 'react';
import App from './components/App';
import Bulb from './Bulb.component';
const EnhancedApp = withBlueRain(App);
EnhancedApp.appName = 'Hello World';
EnhancedApp.iconColor = 'red';
EnhancedApp.icon = <Bulb />;
EnhancedApp.appIcon = <Bulb />;
EnhancedApp.initialize = function(config, ctx) {
	ctx.Filters.add('bluerain.intl.messages', function eng(messages) {
		const en = require('./lang/en.json');
		const ur = require('./lang/ur.json');

		messages.en =  Object.assign(messages.en ? messages.en : {}, en);
		messages.ur = Object.assign(messages.ur ? messages.ur : {}, ur);

		return messages;
	});
};

export default EnhancedApp;

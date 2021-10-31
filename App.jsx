import { BlueBaseApp } from '@bluebase/core';
import Constants from 'expo-constants';
import React from 'react';

import boot from './boot';

let App;

if (Constants.manifest.extra.storybookNative) {
	const StorybookApp = require('./storybook').default;
	App = StorybookApp;
}
else {
	const BBApp = () => <BlueBaseApp {...boot} />;
	BBApp.displayName = 'App';
	App = BBApp;
}

export default App;

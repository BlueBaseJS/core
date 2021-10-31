import { BlueBaseApp } from '@bluebase/core';
import Constants from 'expo-constants';
import React from 'react';

import boot from './boot';
import StorybookApp from './storybook';

let App;

if (Constants.manifest.extra.storybookNative) {
	App = StorybookApp;
}
else {
	const BBApp = () => {
		return (<BlueBaseApp {...boot} />);
	};

	BBApp.displayName = 'App';

	App = BBApp;
}

export default App;

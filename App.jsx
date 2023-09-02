import { BlueBaseApp } from '@bluebase/core';
import { registerRootComponent } from 'expo';
import React from 'react';

import boot from './boot';

let App;

// if (Constants.manifest?.extra.storybookNative) {
// 	const StorybookApp = require('./storybook').default;
// 	App = StorybookApp;
// }
// else {
const BBApp = () => <BlueBaseApp {...boot} />;
BBApp.displayName = 'App';
App = BBApp;
// }

// export default App;

export default registerRootComponent(App); // this is how I register the App component

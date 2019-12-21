import '@storybook/addon-console';

// import React from 'react';
import { addDecorator, configure } from '@storybook/react';

import { BlueBaseDecorator } from '../../common/BlueRainDecorator';
import { withInfo } from '@storybook/addon-info';
// import { BlueBaseDecorator } from '@bluebase/storybook-addon';


// Info
addDecorator(withInfo);

// Add BlueBase
const BBConfigs = require('../bluebase');
addDecorator(BlueBaseDecorator(BBConfigs));

// automatically import all files ending in *.stories.tsx
const req = require.context('../../../src', true, /.stories.tsx$/);
const req2 = require.context('../', true, /.stories.tsx$/);

function loadStories() {
	req.keys().forEach(filename => req(filename));
	req2.keys().forEach(filename => req2(filename));
}

configure(loadStories, module);

import React from 'react';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import CenterView from './CenterView';

import './rn-addons';

// Custom
import { loadStories } from './storyLoader';
import { BlueBaseDecorator } from '@bluebase/storybook-addon';
import BRConfigs from '../bluebase';

// BlueBase
addDecorator(BlueBaseDecorator(BRConfigs));

// CenterView
const CenterViewDecorator = (storyFn) => (<CenterView>{storyFn()}</CenterView>);
addDecorator(CenterViewDecorator);

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
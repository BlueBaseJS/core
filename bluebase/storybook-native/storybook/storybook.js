import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';

import './rn-addons';

// Custom
import { loadStories } from './storyLoader';
import { BlueBaseDecorator } from '../../common/BlueRainDecorator';
import BRConfigs from '../bluebase';

// BlueBase
addDecorator(BlueBaseDecorator(BRConfigs));

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
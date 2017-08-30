/* @flow */

import { Provider } from 'react-redux';
import { BlueRain } from '../index';

export default () => BlueRain.filters.run('bluerain.redux.provider', Provider);

/* @flow */

import { Provider } from 'react-redux';
import { CallbackRegistry } from '../index';

export default () => CallbackRegistry.run('bluerain.redux.provider', Provider);

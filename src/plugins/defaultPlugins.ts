// This file registers builtin plugins that ship with BlueRain OS
/* eslint-disable */
import ReactRouterPlugin from '@blueeast/bluerain-plugin-react-router';
import ReduxPlugin from '@blueeast/bluerain-plugin-redux'; // eslint-disable-line
import WindowInfoPlugin from './WindowInfoPlugin';

export default [ReactRouterPlugin, ReduxPlugin, WindowInfoPlugin];

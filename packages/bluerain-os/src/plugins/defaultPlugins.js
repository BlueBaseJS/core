// This file registers builtin plugins that ship with BlueRain OS
import ReduxPlugin from '@blueeast/bluerain-plugin-redux';
import ReactRouterPlugin from '@blueeast/bluerain-plugin-react-router';
import WindowInfoPlugin from './WindowInfoPlugin';

export default [
	ReduxPlugin,
	ReactRouterPlugin,
	WindowInfoPlugin
];

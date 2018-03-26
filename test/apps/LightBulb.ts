import { App as BlueRainApp } from '../../src';
import buildApp from './buildApp';

export default buildApp({
	appName: 'Light Bulb',
	slug: 'lightBulb',
	// tslint:disable-next-line:max-line-length
	iconUrl:
		'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_lightbulb_outline_black_24px.svg'
}) as BlueRainApp;

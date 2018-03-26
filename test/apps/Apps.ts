import { App as BlueRainApp } from '../../src';
import buildApp from './buildApp';

export default buildApp({
	appName: 'Apps',
	slug: 'apps',
	iconUrl:
		'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_apps_black_24px.svg'
}) as BlueRainApp;

import { App as BlueRainApp } from '../../src';
import buildApp from './buildApp';

export default buildApp({
	appName: 'Sites',
	slug: 'sites',
	iconUrl:
		'https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_account_balance_black_24px.svg'
}) as BlueRainApp;

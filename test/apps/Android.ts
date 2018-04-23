import { App as BlueRainApp } from '../../src';
import CustomIcon from './CustomIcon';
import buildApp from './buildApp';

export default buildApp({
	appName: 'Android',
	slug: 'android',
	icon: {
		type: 'component',
		component: CustomIcon
	}
}) as BlueRainApp;

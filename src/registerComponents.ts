import RX from 'reactxp';

import BR from './index';

import SystemLayout from './layouts/SystemLayout';
import ResponsiveLayout from './layouts/ResponsiveLayout';

import Page from './pages/Page';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import Column from './Components/GridView/Column';

import Row from './Components/GridView/Row';
import SystemApp from './SystemApp';

export default () => {
	/* Regist ReactXP Components */
	BR.Components.register('ActivityIndicator', RX.ActivityIndicator);
	BR.Components.register('Button', RX.Button);
	BR.Components.register('GestureView', RX.GestureView);
	BR.Components.register('Image', RX.Image);
	BR.Components.register('Picker', RX.Picker);
	BR.Components.register('ScrollView', RX.ScrollView);
	BR.Components.register('Text', RX.Text);
	BR.Components.register('TextInput', RX.TextInput);
	BR.Components.register('View', RX.View);
	BR.Components.register('WebView', RX.WebView);

	/* Register Layout Components */
	BR.Components.register('SystemLayout', SystemLayout);
	BR.Components.register('ResponsiveLayout', ResponsiveLayout);

	/* Register Pages */
	BR.Components.register('Page', Page);
	BR.Components.register('IndexPage', IndexPage);
	BR.Components.register('NotFoundPage', NotFoundPage);

	/* Main System Component */
	BR.Components.register('BlueRainApp', SystemApp);

	/* Grid Component */
	BR.Components.register('Row', Row);
	BR.Components.register('Column', Column);
};

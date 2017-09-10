import RX from 'reactxp';

import BR from './index';
import { Link, Route, Switch, Redirect } from './router';

import SystemLayout from './layouts/SystemLayout';
import ResponsiveLayout from './layouts/ResponsiveLayout';

import Page from './pages/Page';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';

export default () => {
	/* Regist ReactXP Components */
	BR.Components.register('ActivityIndicator', RX.ActivityIndicator);
	BR.Components.register('Button', RX.Button);
	BR.Components.register('GestureView', RX.GestureView);
	BR.Components.register('Image', RX.Image);
	// BR.Components.register('Link', RX.Link); // Conflict with Router's Link
	// BR.Components.register('Navigator', RX.Navigator); // Needs exploration
	BR.Components.register('Picker', RX.Picker);
	BR.Components.register('ScrollView', RX.ScrollView);
	BR.Components.register('Text', RX.Text);
	BR.Components.register('TextInput', RX.TextInput);
	BR.Components.register('View', RX.View);
	BR.Components.register('WebView', RX.WebView);

	/* Register Router Components */
	BR.Components.register('Link', Link);
	BR.Components.register('Route', Route);
	BR.Components.register('Switch', Switch);
	BR.Components.register('Redirect', Redirect);

	/* Register Layout Components */
	BR.Components.register('SystemLayout', SystemLayout);
	BR.Components.register('ResponsiveLayout', ResponsiveLayout);

	/* Register Pages */
	BR.Components.register('Page', Page);
	BR.Components.register('IndexPage', IndexPage);
	BR.Components.register('NotFoundPage', NotFoundPage);
};

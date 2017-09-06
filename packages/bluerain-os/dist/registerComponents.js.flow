import RX from 'reactxp';

import BR from './index';
import { Link, Route, Switch } from './router';
import SystemLayout from './layouts/SystemLayout';
import ResponsiveLayout from './layouts/ResponsiveLayout';

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

	/* Register Layout Components */
	BR.Components.register('SystemLayout', SystemLayout);
	BR.Components.register('ResponsiveLayout', ResponsiveLayout);
};

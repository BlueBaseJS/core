import RX from 'reactxp';

import { ComponentRegistry } from './index';
import { Link, Route, Switch } from './router';
import SystemLayout from './layouts/SystemLayout';
import ResponsiveLayout from './layouts/ResponsiveLayout';

export default () => {
	/* Regist ReactXP Components */
	ComponentRegistry.register('ActivityIndicator', RX.ActivityIndicator);
	ComponentRegistry.register('Button', RX.Button);
	ComponentRegistry.register('GestureView', RX.GestureView);
	ComponentRegistry.register('Image', RX.Image);
	// ComponentRegistry.register('Link', RX.Link); // Conflict with Router's Link
	// ComponentRegistry.register('Navigator', RX.Navigator); // Needs exploration
	ComponentRegistry.register('Picker', RX.Picker);
	ComponentRegistry.register('ScrollView', RX.ScrollView);
	ComponentRegistry.register('Text', RX.Text);
	ComponentRegistry.register('TextInput', RX.TextInput);
	ComponentRegistry.register('View', RX.View);
	ComponentRegistry.register('WebView', RX.WebView);

	/* Register Router Components */
	ComponentRegistry.register('Link', Link);
	ComponentRegistry.register('Route', Route);
	ComponentRegistry.register('Switch', Switch);

	/* Register Layout Components */
	ComponentRegistry.register('SystemLayout', SystemLayout);
	ComponentRegistry.register('ResponsiveLayout', ResponsiveLayout);
};

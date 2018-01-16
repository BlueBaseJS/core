import BR from './index';

import SystemLayout from './layouts/SystemLayout';
import ResponsiveLayout from './layouts/ResponsiveLayout';
import Page from './pages/Page';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';
import Column from './components/Column';

import Row from './components/Row';
import SystemApp from './SystemApp';

export default () => {
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

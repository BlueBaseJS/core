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
	BR.Components.set('SystemLayout', SystemLayout);
	BR.Components.set('ResponsiveLayout', ResponsiveLayout);

	/* Register Pages */
	BR.Components.set('Page', Page);
	BR.Components.set('IndexPage', IndexPage);
	BR.Components.set('NotFoundPage', NotFoundPage);

	/* Main System Component */
	BR.Components.set('BlueRainApp', SystemApp);

	/* Grid Component */
	BR.Components.set('Row', Row);
	BR.Components.set('Column', Column);
};

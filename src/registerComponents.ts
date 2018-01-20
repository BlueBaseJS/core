import BR from './index';

import SystemLayout from './layouts/SystemLayout';
import Page from './pages/Page';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';

import SystemApp from './SystemApp';

export default () => {
	/* Register Layout Components */
	BR.Components.set('SystemLayout', SystemLayout);

	/* Register Pages */
	BR.Components.set('Page', Page);
	BR.Components.set('IndexPage', IndexPage);
	BR.Components.set('NotFoundPage', NotFoundPage);

	/* Main System Component */
	BR.Components.set('BlueRainApp', SystemApp);
};

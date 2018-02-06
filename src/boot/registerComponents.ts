import StatefulComponent, {
	EmptyState,
	ErrorState,
	LoadingState
} from '../components/StatefulComponent';

import CenterLayout from '../layouts/CenterLayout';
import ComponentState from '../components/ComponentState';
import ErrorPage from '../pages/ErrorPage';

import ImageBackground from '../components/ImageBackground';
import IndexPage from '../pages/IndexPage';
import LoadingPage from '../pages/LoadingPage';
import NotFoundPage from '../pages/NotFoundPage';

import Page from '../components/Page';
import SystemApp from '../SystemApp';
import SystemLayout from '../layouts/SystemLayout';
import Wallpaper from '../components/Wallpaper';

export const registerComponents = BR => {
	/* Internal Components */
	BR.Components.set('ComponentState', ComponentState);
	BR.Components.set('ImageBackground', ImageBackground);
	BR.Components.set('Page', Page);
	BR.Components.set('Wallpaper', Wallpaper);

	BR.Components.set('StatefulComponent', StatefulComponent);
	BR.Components.set('EmptyState', EmptyState);
	BR.Components.set('ErrorState', ErrorState);
	BR.Components.set('LoadingState', LoadingState);

	/* Register Layout Components */
	BR.Components.set('CenterLayout', CenterLayout);
	BR.Components.set('SystemLayout', SystemLayout);

	/* Register Pages */
	BR.Components.set('ErrorPage', ErrorPage);
	BR.Components.set('IndexPage', IndexPage);
	BR.Components.set('LoadingPage', LoadingPage);
	BR.Components.set('NotFoundPage', NotFoundPage);

	/* Main System Component */
	BR.Components.set('SystemApp', SystemApp);
};

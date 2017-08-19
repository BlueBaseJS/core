import kebabCase from 'lodash.kebabcase';
import type Props from './AppPropsType';
import App from './App';

/**
 * [Write docs]
 * @param {*} AppComponent
 * @param {*} opts
 */
const buildApp = (AppComponent: App, opts: Props) => {
	opts = opts || {};

	if (!opts.appName) {
		throw new Error('App name not given.');
	}

	AppComponent.appName = opts.appName;

	if (!opts.slug) {
		opts.slug = opts.appName;
	}

	AppComponent.slug = kebabCase(opts.slug);
	AppComponent.category = opts.category;
	AppComponent.description = opts.description;
	AppComponent.version = opts.version;
	AppComponent.appRoutePrefix = opts.appRoutePrefix;

	return AppComponent;
};

export default buildApp;

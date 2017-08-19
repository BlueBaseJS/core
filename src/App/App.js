/* @flow */

import RX from 'reactxp';

import type Props from './AppPropsType';

/**
 * A BlueRain App base class
 * @property {String}	appName	Name of the app
 * @property {String}	slug	App's slug, used in to build URL
 * @property {String}	category	Category the App belongs to
 * @property {String}	version	App version
 * @property {String}	appRoutePrefix	Path that will be prepended before slug to build URL.
 */
class App extends RX.Component<Props> {

	appName: string;
	slug: string;
	category: string;
	description: string;
	version: string;
	appRoutePrefix: string = '/app';

	/**
	 * Get the App's URL
	 */
	getPath() : string {
		return `${this.props.appRoutePrefix}/${this.props.slug}`;
	}
}

export default App;

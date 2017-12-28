

import RX from 'reactxp';

/**
 * A BlueRain App base class
 * @property {String}	appName	Name of the app
 * @property {String}	slug	App's slug, used in to build URL
 * @property {String}	category	Category the App belongs to
 * @property {String}	description	App description
 * @property {String}	version	App version
 * @property {String}	appRoutePrefix	Path that will be prepended before slug to build URL.
 * @property {String}	path	Path of the app's home page
 */
class App extends RX.Component<any> {
	appName: string;
	slug: string;
	category: string;
	description: string;
	version: string;
	appRoutePrefix: string = '/app';
	path: string;
}

export default App;

import AppRegistry from '../../src/registries/AppRegistry';

import { App } from '../../src/models/App';
// just only to test my code.These are not final tests
describe('AppRegistry Unit Tests', () => {
	const appRegistry = new AppRegistry();


	class HelloWorldApp  {

		static appName = HelloWorldApp;
		static slug = 'hello-world';

		render() {
			const { appName,BR } = this.constructor;
			return (
							<div>
								<h1>Hello World!</h1>
								<p>This is BlueRain's {appName} app!</p>
							</div>
			);
		}
	}

	it('will  throw error', () => {
		expect(() => {
			appRegistry.set('APP', () => 'APP');
		}).toThrowError();
	});
});

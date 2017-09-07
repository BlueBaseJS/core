/**
 * Created by umair on 9/7/17.
 */
import React from 'react';
import BR from '../../../src';
import ReduxDevtoolsPlugin from '../../../src/plugins/ReduxDevtoolsPlugin';
describe('Internationalization Plugin tests', () => {
	it('should test plugin', () => {
		class HelloWorld extends BR.App {
			static appName = 'Hello World';
			render() {
				return <div>Hello world</div>;
			}
    }
		BR.boot({
			apps: [HelloWorld],
			plugins: [ReduxDevtoolsPlugin],
			renderApp: false
		});
		expect(BR.Filters.FiltersTable['bluerain.redux.composed'].length).toEqual(
      1
    );
	});
});

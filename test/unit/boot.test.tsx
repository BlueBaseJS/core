import BR, { App } from '../../src';
import { Map } from 'immutable';
import React from 'react';

describe('BR.boot func tests', () => {
	document.body.innerHTML = '<div class="app-container"></div>';
	class HelloWorld extends App {
		static appName = 'Hello World';
		render() {
			return (
				<div>Hello world</div>
			);
		}
	}
	it('should throw error b/c null', () => {
		expect(() => BR.boot()).toThrow();
	});

	// it('should not throw error b/c empty handled', () => {
	// 	expect(() => BR.boot().toThrow());
	// });
	// it('should throw with expected params and unexpected values', () => {
	// 	BR.Components.data = Map();
	// 	BR.Plugins.data = Map();
	// 	BR.Filters.data = Map();
	// 	expect(() =>
	// 		BR.boot({ apps: undefined, plugins: undefined, config: undefined,renderApp:false })
	// 	).toThrow();
	// });
	// it('should throw with unexpected params', () => {
	// 	BR.Components.data = Map();
	// 	BR.Plugins.data = Map();
	// 	BR.Filters.data = Map();
	// 	expect(() => BR.boot({ Apps: {}, Plugin: {}, Config: {},renderApp:false })).toThrow();
	// });
	// it('should BR.boot with expected params and expected values', () => {
	// 	BR.Components.data = Map();
	// 	BR.Plugins.data = Map();
	// 	BR.Filters.data = Map();

	// 	expect(() =>
	// 		BR.boot({ apps: [HelloWorld], config: { title: 'Hello OS!' },renderApp:false })
	// 	).toThrow();
	// });

	// it('should BR.boot on server with expected params and expected values', () => {
	// 	BR.Components.data = Map();
	// 	BR.Plugins.data = Map();
	// 	BR.Filters.data = Map();
	// 	BR.Apps.data = Map();

	// 	expect(() =>
	// 		BR.boot({
	// 			apps: [HelloWorld],
	// 			config: { title: 'Hello OS!' },
	// 			serverMode: true
	// 		})
	// 	).toThrow();
	// });
});

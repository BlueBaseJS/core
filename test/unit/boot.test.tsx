import React from 'react';
import RX from 'reactxp';
import { Map } from 'immutable';
import BR, { App } from '../../src';

describe('BR.boot func tests', () => {
	document.body.innerHTML = '<div class="app-container"></div>';

	it('should throw error b/c null', () => {
		expect(() => BR.boot(null)).toThrow();
	});
	it('should not throw error b/c empty handled', () => {
		expect(() => BR.boot()).not.toThrow();
	});
	it('should throw with expected params and unexpected values', () => {
		BR.Components.data = Map();
		BR.Plugins.data = Map();
		BR.Filters.data = Map();
		expect(() =>
			BR.boot({ apps: undefined, plugins: undefined, config: undefined })
		).not.toThrow();
	});
	it('should throw with unexpected params', () => {
		BR.Components.data = Map();
		BR.Plugins.data = Map();
		BR.Filters.data = Map();
		expect(() => BR.boot({ Apps: {}, Plugin: {}, Config: {} })).not.toThrow();
	});
	it('should BR.boot with expected params and expected values', () => {
		BR.Components.data = Map();
		BR.Plugins.data = Map();
		BR.Filters.data = Map();
		class HelloWorld extends App {
			static appName = 'Hello World';
			render() {
				return (
					<RX.View>
						<RX.Text>Hello world</RX.Text>
					</RX.View>
				);
			}
		}
		expect(() =>
			BR.boot({ apps: [HelloWorld], config: { title: 'Hello OS!' } })
		).not.toThrow();
	});

	it('should BR.boot on server with expected params and expected values', () => {
		BR.Components.data = Map();
		BR.Plugins.data = Map();
		BR.Filters.data = Map();
		BR.Apps.data = Map();
		class HelloWorld extends App {
			static appName = 'Hello World';
			render() {
				return (
					<RX.View>
						<RX.Text>Hello world</RX.Text>
					</RX.View>
				);
			}
		}
		expect(() =>
			BR.boot({
				apps: [HelloWorld],
				config: { title: 'Hello OS!' },
				serverMode: true
			})
		).not.toThrow();
	});
});

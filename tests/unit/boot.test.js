import React from 'react';
import RX from 'reactxp';

import BR from '../../src';

describe('BR.boot func tests', () => {
	document.body.innerHTML = '<div class="app-container">' + '</div>';

	it('should throw error b/c null', () => {
		expect(() => BR.boot(null)).toThrow();
	});
	it('should not throw error b/c empty handled', () => {
		expect(() => BR.boot()).not.toThrow();
	});
	it('should throw with expected params and unexpected values', () => {
		expect(() =>
      BR.boot({ apps: undefined, plugins: undefined, config: undefined })
    ).not.toThrow();
	});
	it('should throw with unexpected params', () => {
		expect(() =>
      BR.boot({ Apps: {}, Plugin: {}, Config: {} })
    ).not.toThrow();
	});
	it('should BR.boot with expected params and expected values', () => {
		class HelloWorld extends BR.App {
			static appName = 'Hello World';
			render() {
				return <RX.View><RX.Text>Hello world</RX.Text></RX.View>;
			}
    }
		expect(() =>
      BR.boot({ apps: [HelloWorld], config: { title: 'Hello OS!' } })
    ).not.toThrow();
	});

	it('should BR.boot on server with expected params and expected values', () => {
		class HelloWorld extends BR.App {
			static appName = 'Hello World';
			render() {
				return <RX.View><RX.Text>Hello world</RX.Text></RX.View>;
			}
    }
		expect(() =>
      BR.bootOnServer({ apps: [HelloWorld], config: { title: 'Hello OS!' } })
    ).not.toThrow();
	});
});

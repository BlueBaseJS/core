import React from 'react';
import RX from 'reactxp';

import { boot, bootOnServer } from '../../src/boot';
import App from '../../src/models/App';

describe('boot func tests', () => {
	document.body.innerHTML = '<div class="app-container">' + '</div>';

	it('should throw error b/c null', () => {
		expect(() => boot(null)).toThrow();
	});
	it('should not throw error b/c empty handled', () => {
		expect(() => boot()).not.toThrow();
	});
	it('should throw with expected params and unexpected values', () => {
		expect(() =>
      boot({ apps: undefined, plugins: undefined, config: undefined })
    ).not.toThrow();
	});
  it('should throw with unexpected params', () => {
    expect(() =>
      boot({ Apps: {}, Plugin: {}, Config: {} })
    ).not.toThrow();
  });
	it('should boot with expected params and expected values', () => {
		class HelloWorld extends App {
			static appName = 'Hello World';
			render() {
				return <RX.View><RX.Text>Hello world</RX.Text></RX.View>;
			}
    }
		expect(() =>
      boot({ apps: [HelloWorld], config: { title: 'Hello OS!' } })
    ).not.toThrow();
	});

	it('should boot on server with expected params and expected values', () => {
		class HelloWorld extends App {
			static appName = 'Hello World';
			render() {
				return <RX.View><RX.Text>Hello world</RX.Text></RX.View>;
			}
    }
		expect(() =>
      bootOnServer({ apps: [HelloWorld], config: { title: 'Hello OS!' } })
    ).not.toThrow();
	});
});

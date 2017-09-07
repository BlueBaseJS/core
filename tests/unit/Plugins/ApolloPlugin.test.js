/**
 * Created by umair on 9/6/17.
 */
import React from 'react';
import RX from 'reactxp';
import { shallow, mount } from 'enzyme';
import BR from '../../../src';
import ApolloPlugin from '../../../src/plugins/ApolloPlugin';
describe('Apollo Plugin tests', () => {
	it('throw error', () => {
		class HelloWorld extends BR.App {
			static appName = 'Hello World';
			render() {
				return <RX.View><RX.Text>Hello world</RX.Text></RX.View>;
			}
    }

		expect(() =>
      BR.boot({
	apps: [HelloWorld],
	plugins: [ApolloPlugin],
	renderApp: false
})
    ).toThrow('Websocket Server URI not provided to Apollo');
	});
	it('throw error', () => {
		class HelloWorld extends BR.App {
			static appName = 'Hello World';
			render() {
				return <RX.View><RX.Text>Hello world</RX.Text></RX.View>;
			}
    }
		const config = {
			plugins: {
				apollo: {
					networkInterface: {
						uri: 'http://localhost:3000/graphql'
					},
					subscriptions: true
				}
			}
		};

    // InternationalizationPlugin.initialize();

		expect(() =>
      BR.boot({
	apps: [HelloWorld],
	plugins: [ApolloPlugin],
	renderApp: false,
	config
})
    ).toThrow('Websocket Server URI not provided to Apollo');
	});
	it('Plugin without ws', () => {
		BR.Configs.ConfigsTable.plugins.apollo = {};
		class HelloWorld extends BR.App {
			static appName = 'Hello World';
			render() {
				return <RX.View><RX.Text>Hello world</RX.Text></RX.View>;
			}
    }
		const element = BR.boot({
			apps: [HelloWorld],
			plugins: [ApolloPlugin],
			renderApp: false,
			config: {
				plugins: {
					apollo: {
						networkInterface: {
							uri: 'http://localhost:3000/graphql'
						}
					}
				}
			}
		});
		const wrapper = shallow(<element />);
    // InternationalizationPlugin.initialize();

		expect(wrapper.find('ApolloProvider')).toBeTruthy();
	});
	it('', () => {
		BR.Configs.ConfigsTable.plugins.apollo = {};
		class HelloWorld extends BR.App {
			static appName = 'Hello World';
			render() {
				return <RX.View><RX.Text>Hello world</RX.Text></RX.View>;
			}
    }
		const config = {
			plugins: {
				apollo: {
					networkInterface: {
						uri: 'http://localhost:3000/graphql'
					},
					subscriptions: true,
					wsUri: 'ws://abc'
				}
			}
		};
		expect(() => BR.boot({ apps: [HelloWorld], plugins:[ApolloPlugin], renderApp:false, config })
    ).toThrow();
	});
});

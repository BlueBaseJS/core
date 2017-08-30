import React from 'react';

import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import  { Plugin, BlueRain } from '../../';

import defaultParams from './defaultParams';

let client;

function addApolloReducer(reducers) {
	return Object.assign({}, reducers, { apollo: client.reducer() });
}

function addApolloMiddlewares(middlewares) {
	return middlewares.push(client.middleware());
}

function replaceReduxProvider(Provider) {
	return ({ store, children }) => (<ApolloProvider store={store} client={client}>{children}</ApolloProvider>);
}

class ApolloPlugin extends Plugin {

	static pluginName = 'ApolloPlugin';
	static slug = 'apollo';

	static initialize(config = {}) {

		// Configurations
		config = Object.assign({}, defaultParams, config);

		let networkInterface;

		if (!config.networkInterface.uri) {
			throw new Error('Websocket Server URI not provided to Apollo');
		}

		// Setup with Subscriptions
		if (config.subscriptions === true) {

			if (!config.wsUri) {
				throw new Error('Websocket Server URI not provided to Apollo');
			}

			// Create websocket client
			const wsClient = new SubscriptionClient(config.wsUri, config.subscriptionClient);

			// Create a normal network interface:
			const simpleNetworkInterface = createNetworkInterface(config.networkInterface);

			// Extend the network interface with the WebSocket
			networkInterface = addGraphQLSubscriptions(
				simpleNetworkInterface,
				wsClient
			);

		} else {
			networkInterface = createNetworkInterface(config.networkInterface);
		}

		// Finally, create your ApolloClient instance with the modified network interface
		client = new ApolloClient({ networkInterface });

		// Add callbacks
		BlueRain.filters.add('bluerain.redux.reducers', addApolloReducer);
		BlueRain.filters.add('bluerain.redux.middlewares', addApolloMiddlewares);
		BlueRain.filters.add('bluerain.redux.provider', replaceReduxProvider);
	}

	static getClient() {
		return client;
	}
}

export default ApolloPlugin;

/* @flow */

import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import type { ChildrenArray } from 'react';
import type { Store as StoreType } from 'redux';

import defaultParams from './defaultParams';

let client: ApolloClient;
let subscriptionClient: SubscriptionClient;

function addApolloReducer(reducers: { [string]: any }) {
	return Object.assign({}, reducers, { apollo: client.reducer() });
}

function addApolloMiddlewares(middlewares) {
	middlewares.push(client.middleware());
	return middlewares;
}

function replaceReduxProvider(Provider) {
	const ApolloProviderHoc = ({ store, children } : {
		store: StoreType<*>,
		children: ChildrenArray<any>
	}) => (<ApolloProvider store={store} client={client}>{children}</ApolloProvider>);

	return ApolloProviderHoc;
}

/**
 * Main Apollo Plugin class.
 */
class ApolloPlugin extends Plugin {

	static pluginName = 'ApolloPlugin';
	static slug = 'apollo';

	static initialize(config = {}, ctx) {

		// Configurations
		config = Object.assign({}, defaultParams, config);
		config = ctx.Filters.run('apollo.config', config);

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
			subscriptionClient = new SubscriptionClient(config.wsUri, config.subscriptionClient);

			// Create a normal network interface:
			const simpleNetworkInterface = createNetworkInterface(config.networkInterface);

			// Extend the network interface with the WebSocket
			networkInterface = addGraphQLSubscriptions(
				simpleNetworkInterface,
				subscriptionClient
			);

		} else {
			networkInterface = createNetworkInterface(config.networkInterface);
		}

		// Finally, create your ApolloClient instance with the modified network interface
		client = new ApolloClient({ networkInterface });

		// Add callbacks
		ctx.Filters.add('bluerain.redux.reducers', addApolloReducer);
		ctx.Filters.add('bluerain.redux.middlewares', addApolloMiddlewares);
		ctx.Filters.add('bluerain.redux.provider', replaceReduxProvider);
	}

	/**
	 * Returns Apollo client
	 * @returns {ApolloClient}
	 */
	static getClient() {
		return client;
	}

	/**
	 * Returns Apollo's Subscription Client
	 * @returns {SubscriptionClient}
	 */
	static getSubscriptionClient() {
		return subscriptionClient;
	}
}

export default ApolloPlugin;

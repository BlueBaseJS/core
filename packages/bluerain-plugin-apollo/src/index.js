/* @flow */

import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';

// import PropTypes from 'prop-types';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import type { ChildrenArray } from 'react';
import type { Store as StoreType } from 'redux';

import defaultConfigs from './defaultConfigs';

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

	// ApolloProviderHoc.propTypes = {
	// 	store: PropTypes.object.isRequired,
	// 	children: PropTypes.oneOfType([
	// 		PropTypes.arrayOf(PropTypes.node),
	// 		PropTypes.node
	// 	]).isRequired
	// };

	return ApolloProviderHoc;
}

/**
 * Main Apollo Plugin class.
 * @property {string} pluginName "ApolloPlugin"
 * @property {string} slug "apollo"
 */
class ApolloPlugin extends Plugin {

	static pluginName = 'ApolloPlugin';
	static slug = 'apollo';

	static initialize(config = {}, ctx) {

		// Configurations
		config = Object.assign({}, defaultConfigs, config);
		config = ctx.Filters.run('plugin.apollo.config', config);

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

		networkInterface = ctx.Filters.add('plugin.apollo.networkInterface', networkInterface);

		// Finally, create your ApolloClient instance with the modified network interface
		client = new ApolloClient({ networkInterface });

		// Add callbacks
		ctx.Filters.add('bluerain.redux.reducers', addApolloReducer);
		ctx.Filters.add('bluerain.redux.middlewares', addApolloMiddlewares);
		ctx.Filters.add('bluerain.redux.provider', replaceReduxProvider);
	}

	/**
	 * Returns Apollo client
	 * @static
	 * @returns {ApolloClient}
	 */
	static getClient() {
		return client;
	}

	/**
	 * Returns Apollo's Subscription Client
	 * @static
	 * @returns {SubscriptionClient}
	 */
	static getSubscriptionClient() {
		return subscriptionClient;
	}
}

export default ApolloPlugin;

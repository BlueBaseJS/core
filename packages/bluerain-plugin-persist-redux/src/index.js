/* @flow */

import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';

// import PropTypes from 'prop-types';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import {persistStore, autoRehydrate} from 'redux-persist'
import type { ChildrenArray } from 'react';
import type { Store as StoreType } from 'redux';

import defaultConfigs from './defaultConfigs';
import reducer from './reducer';


/**
 * Main Apollo Plugin class.
 * @property {string} pluginName "PersistReduxPlugin"
 * @property {string} slug "apollo"
 */
class ApolloPlugin extends Plugin {

	static pluginName = 'PersistReduxPlugin';
	static slug = 'persist-redux';

	static initialize(config = {}, ctx) {
		ctx.Filters.add('bluerain.redux.enhancers', (enhancers) => {
			enhancers.push(autoRehydrate());
		});
		ctx.Filters.add('bluerain.redux.reducers.bluerain', (reducers) => {
			return Object.assign({}, reducers, {
				window: reducer
			});
		});
		console.log(ctx.ref);
		persistStore(ctx.ref.store);
	}

	
}

export default ApolloPlugin;

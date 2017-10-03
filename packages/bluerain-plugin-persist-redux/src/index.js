/* @flow */

import { Plugin } from '@blueeast/bluerain-os';

// import PropTypes from 'prop-types';

import { persistStore, autoRehydrate } from 'redux-persist';

/**
 * Main Persist Redux Plugin class.
 * @property {string} pluginName "PersistReduxPlugin"
 * @property {string} slug "apollo"
 */
class ApolloPlugin extends Plugin {

	static pluginName = 'PersistReduxPlugin';
	static slug = 'persist-redux';

	static initialize(config = {}, ctx) {
		ctx.Filters.add('bluerain.redux.enhancers', (enhancers) => {
			enhancers.push(autoRehydrate());
			return enhancers;
		});
		ctx.Filters.add('bluerain.redux.store', (store) => {
			persistStore(store);
		});
	}


}

export default ApolloPlugin;
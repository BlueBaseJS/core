'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactApollo = require('react-apollo');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _ = require('../../');

var _2 = _interopRequireDefault(_);

var _defaultParams = require('./defaultParams');

var _defaultParams2 = _interopRequireDefault(_defaultParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import type { Store } from 'redux';


var client = void 0;

function addApolloReducer(reducers) {
	return Object.assign({}, reducers, { apollo: client.reducer() });
}

function addApolloMiddlewares(middlewares) {
	middlewares.push(client.middleware());
	return middlewares;
}

function replaceReduxProvider(Provider) {
	var ApolloProviderHoc = function ApolloProviderHoc(_ref) {
		var store = _ref.store,
		    children = _ref.children;
		return _react2.default.createElement(
			_reactApollo.ApolloProvider,
			{ store: store, client: client },
			children
		);
	};

	ApolloProviderHoc.propTypes = {
		store: _propTypes2.default.node.isRequired,
		children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired
	};

	return ApolloProviderHoc;
}

var ApolloPlugin = function (_BR$Plugin) {
	_inherits(ApolloPlugin, _BR$Plugin);

	function ApolloPlugin() {
		_classCallCheck(this, ApolloPlugin);

		return _possibleConstructorReturn(this, (ApolloPlugin.__proto__ || Object.getPrototypeOf(ApolloPlugin)).apply(this, arguments));
	}

	_createClass(ApolloPlugin, null, [{
		key: 'initialize',
		value: function initialize() {
			var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


			// Configurations
			config = Object.assign({}, _defaultParams2.default, config);

			var networkInterface = void 0;

			if (!config.networkInterface.uri) {
				throw new Error('Websocket Server URI not provided to Apollo');
			}

			// Setup with Subscriptions
			if (config.subscriptions === true) {

				if (!config.wsUri) {
					throw new Error('Websocket Server URI not provided to Apollo');
				}

				// Create websocket client
				var wsClient = new _subscriptionsTransportWs.SubscriptionClient(config.wsUri, config.subscriptionClient);

				// Create a normal network interface:
				var simpleNetworkInterface = (0, _reactApollo.createNetworkInterface)(config.networkInterface);

				// Extend the network interface with the WebSocket
				networkInterface = (0, _subscriptionsTransportWs.addGraphQLSubscriptions)(simpleNetworkInterface, wsClient);
			} else {
				networkInterface = (0, _reactApollo.createNetworkInterface)(config.networkInterface);
			}

			// Finally, create your ApolloClient instance with the modified network interface
			client = new _reactApollo.ApolloClient({ networkInterface: networkInterface });

			// Add callbacks
			_2.default.Filters.add('bluerain.redux.reducers', addApolloReducer);
			_2.default.Filters.add('bluerain.redux.middlewares', addApolloMiddlewares);
			_2.default.Filters.add('bluerain.redux.provider', replaceReduxProvider);
		}
	}, {
		key: 'getClient',
		value: function getClient() {
			return client;
		}
	}]);

	return ApolloPlugin;
}(_2.default.Plugin);

ApolloPlugin.pluginName = 'ApolloPlugin';
ApolloPlugin.slug = 'apollo';
exports.default = ApolloPlugin;
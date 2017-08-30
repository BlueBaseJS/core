'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getInitialState = exports.createStore = exports.getStore = undefined;

var _redux = require('redux');

var _index = require('../index');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
	bluerain: {}
};

var store = void 0;

var createStore = function createStore() {

	initialState = _index.CallbackRegistry.run('bluerain.redux.initialState', initialState);

	var reducers = (0, _reducers2.default)();

	var middlewares = [];
	middlewares = _index.CallbackRegistry.run('bluerain.redux.middlewares', middlewares);

	var enhancers = [_redux.applyMiddleware.apply(undefined, _toConsumableArray(middlewares))];
	enhancers = _index.CallbackRegistry.run.apply(_index.CallbackRegistry, ['bluerain.redux.enhancers', enhancers].concat(_toConsumableArray(middlewares)));

	var composed = _redux.compose.apply(undefined, _toConsumableArray(enhancers));
	composed = _index.CallbackRegistry.run.apply(_index.CallbackRegistry, ['bluerain.redux.composed', composed].concat(_toConsumableArray(enhancers)));

	store = (0, _redux.createStore)(reducers, initialState, composed);

	return store;
};

var getStore = function getStore() {
	return store;
};
var getInitialState = function getInitialState() {
	return initialState;
};

exports.getStore = getStore;
exports.createStore = createStore;
exports.getInitialState = getInitialState;
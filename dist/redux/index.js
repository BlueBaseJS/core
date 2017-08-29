'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getInitialState = exports.createStore = exports.getStore = exports.getProvider = undefined;

var _provider = require('./provider');

var _provider2 = _interopRequireDefault(_provider);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getProvider = _provider2.default;
exports.getStore = _store.getStore;
exports.createStore = _store.createStore;
exports.getInitialState = _store.getInitialState;
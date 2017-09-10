'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getInitialState = exports.createStore = exports.getStore = exports.default = undefined;

var _store = require('./store');

var _Plugin = require('./Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Plugin2.default;
exports.getStore = _store.getStore;
exports.createStore = _store.createStore;
exports.getInitialState = _store.getInitialState;
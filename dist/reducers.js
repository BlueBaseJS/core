'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _Callbacks = require('./Callbacks');

var bluerainReducers = (0, _Callbacks.runCallbacks)('bluerain.reducers.bluerain', {});

var reducers = (0, _Callbacks.runCallbacks)('bluerain.reducers', {
	bluerain: (0, _redux.combineReducers)(bluerainReducers)
});

exports.default = function () {
	return (0, _redux.combineReducers)(reducers);
};
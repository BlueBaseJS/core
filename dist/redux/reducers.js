'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _index = require('../index');

exports.default = function () {

	var bluerainReducers = _index.blueRain.filters.run('bluerain.redux.reducers.bluerain', {
		// stub: (state = {}) => state
	});

	var reducers = {
		bluerain: (0, _redux.combineReducers)(bluerainReducers)
	};

	reducers = _index.blueRain.filters.run('bluerain.redux.reducers', reducers);
	return (0, _redux.combineReducers)(reducers);
};
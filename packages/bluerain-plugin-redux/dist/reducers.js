'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

exports.default = function (ctx) {

	var bluerainReducers = ctx.Filters.run('bluerain.redux.reducers.bluerain', {
		// stub: (state = {}) => state
	});

	var reducers = {
		bluerain: (0, _redux.combineReducers)(bluerainReducers)
	};

	reducers = ctx.Filters.run('bluerain.redux.reducers', reducers);
	return (0, _redux.combineReducers)(reducers);
};
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _index = require('../index');

exports.default = function () {

	var bluerainReducers = _index.CallbackRegistry.run('bluerain.redux.reducers.bluerain', {
		stub: function stub() {
			var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			return state;
		}
	});

	var reducers = {
		bluerain: (0, _redux.combineReducers)(bluerainReducers)
	};

	reducers = _index.CallbackRegistry.run('bluerain.redux.reducers', reducers);
	return (0, _redux.combineReducers)(reducers);
};
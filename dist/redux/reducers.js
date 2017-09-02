'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

	var bluerainReducers = _index2.default.Filters.run('bluerain.redux.reducers.bluerain', {
		// stub: (state = {}) => state
	});

	var reducers = {
		bluerain: (0, _redux.combineReducers)(bluerainReducers)
	};

	reducers = _index2.default.Filters.run('bluerain.redux.reducers', reducers);
	return (0, _redux.combineReducers)(reducers);
};
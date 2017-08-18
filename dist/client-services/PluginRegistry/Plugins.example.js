'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.calback = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Plugin3 = require('../../Plugin');

var _Plugin4 = _interopRequireDefault(_Plugin3);

var _Callbacks = require('../../Callbacks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddPlugin = function (_Plugin) {
	_inherits(AddPlugin, _Plugin);

	function AddPlugin() {
		_classCallCheck(this, AddPlugin);

		return _possibleConstructorReturn(this, (AddPlugin.__proto__ || Object.getPrototypeOf(AddPlugin)).apply(this, arguments));
	}

	_createClass(AddPlugin, [{
		key: 'initialize',
		value: function initialize() {
			(0, _Callbacks.addCallback)('plugin.add', function (num) {
				return num + 1;
			});
			(0, _Callbacks.addCallback)('plugin.add', function (num) {
				return num + 5;
			});
			(0, _Callbacks.addCallback)('plugin.add', function (num) {
				return num + 3;
			});
		}
	}]);

	return AddPlugin;
}(_Plugin4.default);

var SubtractPlugin = function (_Plugin2) {
	_inherits(SubtractPlugin, _Plugin2);

	function SubtractPlugin() {
		_classCallCheck(this, SubtractPlugin);

		return _possibleConstructorReturn(this, (SubtractPlugin.__proto__ || Object.getPrototypeOf(SubtractPlugin)).apply(this, arguments));
	}

	_createClass(SubtractPlugin, [{
		key: 'initialize',
		value: function initialize() {
			(0, _Callbacks.addCallback)('plugin.subtract', function (num) {
				return num - 1;
			});
			(0, _Callbacks.addCallback)('plugin.subtract', function (num) {
				return num - 2;
			});
			(0, _Callbacks.addCallback)('plugin.subtract', function (num) {
				return num - 3;
			});
		}
	}]);

	return SubtractPlugin;
}(_Plugin4.default);

var calback = exports.calback = function calback() {
	var addObj = new AddPlugin();
	addObj.initialize();
	var subObj = new SubtractPlugin();
	subObj.initialize();
	console.log((0, _Callbacks.runCallbacks)('plugin.add', 2));
	console.log((0, _Callbacks.runCallbacks)('plugin.subtract', 2));
};
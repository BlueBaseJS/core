'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.withSystemNav = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluerainOs = require('@blueeast/bluerain-os');

var _taskbar = require('./pages/taskbar');

var _taskbar2 = _interopRequireDefault(_taskbar);

var _reducer = require('./systemnav/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _withSystemNav = require('./systemnav/withSystemNav');

var _withSystemNav2 = _interopRequireDefault(_withSystemNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React from 'react';


/**
 * Main Taskbar Plugin class.
 * @property {string} pluginName "TaskbarPlugin"
 * @property {string} slug "taskbar"
 */
var TaskbarPlugin = function (_Plugin) {
	_inherits(TaskbarPlugin, _Plugin);

	function TaskbarPlugin() {
		_classCallCheck(this, TaskbarPlugin);

		return _possibleConstructorReturn(this, (TaskbarPlugin.__proto__ || Object.getPrototypeOf(TaskbarPlugin)).apply(this, arguments));
	}

	_createClass(TaskbarPlugin, null, [{
		key: 'initialize',
		value: function initialize() {
			var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var ctx = arguments[1];


			// add withSystemNav HOC to SystemLayout
			ctx.Filters.add('bluerain.systemlayout', function addSystemNav() {
				ctx.Components.addHOCs('SystemLayout', _withSystemNav2.default);
			});

			// Add taskbar
			ctx.Filters.add('bluerain.system.app.layout', function taskbar(schema, disabled) {
				ctx.Components.addHOCs('SystemLayout', _withSystemNav2.default);
				if (!disabled) {
					schema.children.unshift({ component: _taskbar2.default });
				}
				return schema;
			});
			ctx.Filters.add('bluerain.redux.reducers.bluerain', function AddSystemNavReducers(reducers) {
				return Object.assign({}, reducers, {
					systemNav: _reducer2.default
				});
			});

			// Add translations
			ctx.Filters.add('bluerain.intl.messages', function eng(messages) {
				var en = require('./lang/en.json');
				var ur = require('./lang/ur.json');

				messages.en = Object.assign(messages.en ? messages.en : {}, en);
				messages.ur = Object.assign(messages.ur ? messages.ur : {}, ur);

				return messages;
			});
		}
	}]);

	return TaskbarPlugin;
}(_bluerainOs.Plugin);

TaskbarPlugin.pluginName = 'TaskbarPlugin';
TaskbarPlugin.slug = 'taskbar';

TaskbarPlugin.withSystemNav = _withSystemNav2.default;
exports.withSystemNav = _withSystemNav2.default;
exports.default = TaskbarPlugin;
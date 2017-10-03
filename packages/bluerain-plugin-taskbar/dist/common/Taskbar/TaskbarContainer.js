'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bluerainOs = require('@blueeast/bluerain-os');

var _reactIntl = require('react-intl');

var _TaskbarComponent = require('./TaskbarComponent');

var _TaskbarComponent2 = _interopRequireDefault(_TaskbarComponent);

var _Bulb = require('../icons/Bulb.component');

var _Bulb2 = _interopRequireDefault(_Bulb);

var _Launcher = require('../icons/Launcher.component');

var _Launcher2 = _interopRequireDefault(_Launcher);

var _Mevris = require('../icons/Mevris.component');

var _Mevris2 = _interopRequireDefault(_Mevris);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by amna on 9/9/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var messages = (0, _reactIntl.defineMessages)({
	mevris: {
		id: 'plugin.taskbar.mevris',
		defaultMessage: 'Mevris'
	},
	apps: {
		id: 'plugin.taskbar.apps',
		defaultMessage: 'Apps'
	},
	deviceexplorer: {
		id: 'plugin.taskbar.deviceexplorer',
		defaultMessage: 'Device Explorer'
	}
});

var TaskbarContainer = function (_React$Component) {
	_inherits(TaskbarContainer, _React$Component);

	function TaskbarContainer(props) {
		_classCallCheck(this, TaskbarContainer);

		return _possibleConstructorReturn(this, (TaskbarContainer.__proto__ || Object.getPrototypeOf(TaskbarContainer)).call(this, props));
	}

	_createClass(TaskbarContainer, [{
		key: 'render',
		value: function render() {

			var history = this.props.bluerain.refs.router.history;
			var intl = this.props.intl;

			var items = [{
				icon: _react2.default.createElement(_Mevris2.default, null),
				label: intl.formatMessage(messages.mevris),
				onClick: function onClick() {
					history.push('/');
				}
			}, {
				icon: _react2.default.createElement(_Launcher2.default, null),
				label: intl.formatMessage(messages.apps),
				onClick: function onClick() {
					history.push('/');
				}
			}, {
				icon: _react2.default.createElement(_Bulb2.default, null),
				label: intl.formatMessage(messages.deviceexplorer),
				onClick: function onClick() {
					history.push('/app/hello-world');
				}
			}];

			return _react2.default.createElement(_TaskbarComponent2.default, {
				items: items,
				hideLabels: this.props.hideLabels,
				style: { justifyContent: 'space-evenly' }
			});
		}
	}]);

	return TaskbarContainer;
}(_react2.default.Component);

TaskbarContainer.propTypes = {
	hideLabels: _propTypes2.default.bool
};

TaskbarContainer.defaultProps = {
	hideLabels: false
};

exports.default = (0, _reactIntl.injectIntl)((0, _bluerainOs.withBlueRain)(TaskbarContainer));
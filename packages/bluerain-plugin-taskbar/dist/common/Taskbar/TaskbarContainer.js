'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
	},
	settings: {
		id: 'plugin.taskbar.settings',
		defaultMessage: 'Settings'
	}
});

var TaskbarContainer = function TaskbarContainer(props) {

	var history = props.bluerain.refs.router.history;
	var intl = props.intl;

	var items = [{
		icon: _react2.default.createElement(_Launcher2.default, null),
		label: intl.formatMessage(messages.apps),
		onClick: function onClick() {
			history.push('/');
		}
	}, '-', {
		icon: _react2.default.createElement(_Bulb2.default, null),
		label: intl.formatMessage(messages.deviceexplorer),
		onClick: function onClick() {
			history.push('/app/hello-world');
		}
	}, '->', {
		icon: _react2.default.createElement(_Bulb2.default, null),
		label: intl.formatMessage(messages.settings),
		onClick: function onClick() {
			history.push('/app/settings');
		}
	}];

	return _react2.default.createElement(_TaskbarComponent2.default, { logo: _react2.default.createElement(_Mevris2.default, null), title: intl.formatMessage(messages.mevris), items: items, hideLabels: props.hideLabels });
};

TaskbarContainer.defaultProps = {
	hideLabels: false
};

exports.default = (0, _reactIntl.injectIntl)((0, _bluerainOs.withBlueRain)(TaskbarContainer));
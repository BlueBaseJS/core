'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactIntl = require('react-intl');

var _bluerainOs = require('@blueeast/bluerain-os');

var _bluerainOs2 = _interopRequireDefault(_bluerainOs);

var _pageStyles = require('./pageStyles');

var _pageStyles2 = _interopRequireDefault(_pageStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var match = _ref.match,
	    appName = _ref.appName;

	var layout = {
		component: 'View',
		props: { style: _pageStyles2.default },
		children: [{
			component: 'FormattedMessage',
			props: {
				id: 'hello.home',
				defaultMessage: 'Welcome to the home page! default'
			}
		}, {
			component: _reactIntl.FormattedNumber,
			props: {
				value: 10000
			}
		}, {
			component: _reactIntl.FormattedDate,
			props: {
				value: Date.now()
			}
		}]
	};

	return _bluerainOs2.default.Utils.parseJsonSchema(layout);
};
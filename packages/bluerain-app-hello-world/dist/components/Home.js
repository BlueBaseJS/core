'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bluerainOs = require('@blueeast/bluerain-os');

var _pageStyles = require('./pageStyles');

var _pageStyles2 = _interopRequireDefault(_pageStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _bluerainOs.withBlueRain)(function (_ref) {
	var match = _ref.match,
	    appName = _ref.appName,
	    BR = _ref.bluerain;

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
			component: 'FormattedNumber',
			props: {
				value: 10000
			}
		}, {
			component: 'FormattedDate',
			props: {
				value: Date.now()
			}
		}]
	};

	return BR.Utils.parseJsonSchema(layout);
});
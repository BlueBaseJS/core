'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactIntl = require('react-intl');

var _src = require('../../../bluerain-os/src');

var _src2 = _interopRequireDefault(_src);

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
			component: _reactIntl.FormattedMessage,
			props: {
				id: 'hello.contact',
				defaultMessage: 'Welcome to the contact page!'
			}
		}]
	};

	return _src2.default.Utils.parseJsonSchema(layout);
};
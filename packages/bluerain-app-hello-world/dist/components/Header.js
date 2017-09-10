'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactxp = require('reactxp');

var _bluerainOs = require('@blueeast/bluerain-os');

var _bluerainOs2 = _interopRequireDefault(_bluerainOs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headerStyle = _reactxp.Styles.createViewStyle({
	backgroundColor: 'rgba(240, 240, 240, 0.5)',
	shadowOffset: { height: 1, width: 0 },
	shadowRadius: 5,
	shadowColor: 'rgba(0, 0, 0, 0.5)'
});

var titleStyle = _reactxp.Styles.createViewStyle({
	fontSize: 18,
	paddingTop: 10,
	paddingLeft: 10,
	paddingRight: 10
});

var navBarStyle = _reactxp.Styles.createViewStyle({
	flexDirection: 'row'
});

var navItemStyle = _reactxp.Styles.createViewStyle({
	padding: 10
});

exports.default = function (_ref) {
	var match = _ref.match,
	    appName = _ref.appName;

	var layout = {
		component: 'View',
		props: { style: headerStyle },
		children: [{
			component: 'View',
			props: { style: titleStyle },
			children: [{
				component: 'FormattedMessage',
				props: {
					style: titleStyle,
					id: 'hello.header.title',
					defaultMessage: 'Welcome to the {appName}',
					values: { appName: appName }
				}
			}]
		}, {
			component: 'View',
			props: { style: navBarStyle },
			children: [{
				component: 'Link',
				props: { to: '' + match.url, style: navItemStyle },
				children: [{
					component: 'FormattedMessage',
					props: {
						id: 'hello.header.homeLinkText',
						defaultMessage: 'Home d'
					}
				}]
			}, {
				component: 'Link',
				props: { to: match.url + '/about', style: navItemStyle },
				children: [{
					component: 'FormattedMessage',
					props: {
						id: 'hello.header.aboutLinkText',
						defaultMessage: 'about'
					}
				}]
			}, {
				component: 'Link',
				props: { to: match.url + '/responsive', style: navItemStyle },
				children: [{
					component: 'View',
					text: 'Responsive'
				}]
			}, {
				component: 'Link',
				props: { to: match.url + '/contact', style: navItemStyle },
				children: [{
					component: 'FormattedMessage',
					props: {
						id: 'hello.header.contactLinkText',
						defaultMessage: 'Conta'
					}
				}]
			}]
		}]
	};

	return _bluerainOs2.default.Utils.parseJsonSchema(layout);
};
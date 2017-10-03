'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidebarStyles = _reactxp2.default.Styles.createViewStyle({
	width: '16%'
});

exports.default = function (BR, Content) {
	return function (props) {

		var layout = {

			// Sidebar Layout
			component: 'View',
			props: { style: SidebarStyles },
			children: [{
				component: Content
			}]
		};

		return BR.Utils.parseJsonSchema(layout);
	};
};
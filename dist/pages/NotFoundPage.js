'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = NotFoundPage;

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _JsonSchemaToReact = require('../utils/JsonSchemaToReact');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageStyle = _reactxp2.default.Styles.createViewStyle({
	justifyContent: 'center',
	padding: 20,
	textAlign: 'center'
}, false);

var titleStyle = _reactxp2.default.Styles.createViewStyle({
	alignSelf: 'center',
	backgroundColor: 'rgb(220,53,69)',
	borderColor: 'rgb(220,53,69)',
	borderRadius: 10,
	borderWidth: 1,
	color: '#fff',
	fontSize: 68,
	marginBottom: 20,
	padding: 20,
	shadowOffset: { height: 5, width: 0 },
	shadowRadius: 15,
	shadowColor: 'rgba(0,0,0,.3)'
}, false);

var subTitleStyle = _reactxp2.default.Styles.createViewStyle({
	color: 'rgb(150, 150, 150)',
	marginBottom: 20,
	overflow: 'initial'
}, false);

/**
 * Returns the 404 Page layout.
 *
 * @returns {React.Component} The layout react component
 */
function NotFoundPage() {
	var schema = {
		component: 'Page',
		props: { style: pageStyle },
		children: [{
			component: 'View',
			props: { style: titleStyle },
			children: [{
				component: 'Text',
				text: '404'
			}]
		}, {
			component: 'Text',
			props: { style: subTitleStyle },
			text: 'Page not found!'
		}]
	};

	return (0, _JsonSchemaToReact.parseJsonSchema)(schema);
}
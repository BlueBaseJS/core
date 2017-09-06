'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = IndexPage;

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
	backgroundColor: 'rgba(0,123,255,1)',
	borderColor: 'rgba(0,123,255,1)',
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
	marginBottom: 20
}, false);

/**
 * Returns the Index Page layout.
 *
 * @returns {React.Component} The layout react component
 */
function IndexPage() {
	var schema = {
		component: 'Page',
		props: { style: pageStyle },
		children: [{
			component: 'View',
			props: { style: titleStyle },
			children: [{
				component: 'Text',
				text: 'BR'
			}]
		}, {
			component: 'Text',
			props: { style: subTitleStyle },
			text: 'Welcome to BlueRain OS!'
		}]
	};

	return (0, _JsonSchemaToReact.parseJsonSchema)(schema);
}
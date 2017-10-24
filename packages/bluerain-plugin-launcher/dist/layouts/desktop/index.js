'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayoutStyles = _reactxp2.default.Styles.createViewStyle({
	flexDirection: 'row',
	overflow: 'auto',
	flexGrow: 1
});

// const MainStyles = RX.Styles.createViewStyle({
// 	flex: 1
// });

exports.default = function (BR, Content, bannerUrl) {
	return function (props) {

		var layout = {
			// Main Layout
			component: 'View',
			props: { style: LayoutStyles },
			children: [

			// Main Container
			{
				component: 'div',
				props: { style: { flex: 1,
						backgroundImage: 'url(' + bannerUrl + ')',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center'
					}
				},
				children: [{
					component: Content,
					props: { style: { width: '100%' } }
				}]
			}]
		};
		return BR.Utils.parseJsonSchema(layout);
	};
};
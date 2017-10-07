'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GridList = require('material-ui/GridList');

var _IconCard = require('./IconCard.component');

var _IconCard2 = _interopRequireDefault(_IconCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleMainPage = {
	height: '100vh',
	width: '100%',
	justifyContent: 'center',
	display: 'flex'
};

var styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},
	gridList: {
		width: '90%',
		marginTop: 20
	}
};

var MainPage = function MainPage(props) {
	return _react2.default.createElement(
		'div',
		{ style: styleMainPage },
		_react2.default.createElement(
			_GridList.GridList,
			{ style: styles.gridList, cols: 0, cellHeight: 200, padding: 20 },
			props.apps.map(function (tile) {
				return _react2.default.createElement(
					_GridList.GridTile,
					null,
					_react2.default.createElement(_IconCard2.default, { icon: tile.icon, appName: tile.appName, backgroundColors: tile.backgroundColors, gradient: tile.gradient, link: tile.link })
				);
			})
		)
	);
};

exports.default = MainPage;
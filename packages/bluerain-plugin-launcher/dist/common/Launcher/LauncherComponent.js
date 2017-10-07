'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GridList = require('material-ui/GridList');

var _IconCard = require('./IconCard.component');

var _IconCard2 = _interopRequireDefault(_IconCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},
	gridList: {
		padding: 30
	}
};

var MainPage = function MainPage(props) {
	return _react2.default.createElement(
		_GridList.GridList,
		{ style: styles.gridList, cols: props.cols, cellHeight: 'auto', padding: 20 },
		props.apps.map(function (tile) {
			return _react2.default.createElement(
				_GridList.GridTile,
				{ key: tile.slug },
				_react2.default.createElement(_IconCard2.default, { icon: tile.icon, name: tile.name, backgroundColors: tile.backgroundColors, gradient: tile.gradient, link: tile.link, color: tile.color })
			);
		})
	);
};

exports.default = MainPage;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Bulb = require('../icons/Bulb.component');

var _Bulb2 = _interopRequireDefault(_Bulb);

var _IconCard = require('./IconCard.component');

var _IconCard2 = _interopRequireDefault(_IconCard);

var _propTypes = require('prop-types');

var _folder = require('material-ui/svg-icons/file/folder');

var _folder2 = _interopRequireDefault(_folder);

var _GridList = require('material-ui/GridList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var MainPage = function (_React$Component) {
	_inherits(MainPage, _React$Component);

	function MainPage() {
		_classCallCheck(this, MainPage);

		return _possibleConstructorReturn(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).apply(this, arguments));
	}

	_createClass(MainPage, [{
		key: 'render',
		value: function render() {
			var Apps = this.props.Apps;

			return _react2.default.createElement(
				'div',
				{ style: styleMainPage },
				_react2.default.createElement(
					_GridList.GridList,
					{ style: styles.gridList, cols: 0, cellHeight: 200, padding: 20 },
					Apps.map(function (tile) {
						var Icon = tile.icon,
						    appName = tile.appName,
						    backgroundColors = tile.backgroundColors,
						    gradient = tile.gradient,
						    link = tile.link;

						return _react2.default.createElement(
							_GridList.GridTile,
							null,
							_react2.default.createElement(_IconCard2.default, { icon: _react2.default.createElement(Icon, null), appName: appName, backgroundColors: backgroundColors, gradient: gradient, link: link })
						);
					})
				)
			);
		}
	}]);

	return MainPage;
}(_react2.default.Component);

MainPage.propTypes = {
	Apps: _propTypes.PropTypes.array
};
exports.default = MainPage;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bluerainTaskbar = require('bluerain-taskbar');

var _bluerainTaskbar2 = _interopRequireDefault(_bluerainTaskbar);

require('../styles/normalize.css');

require('../styles/raleway.css');

var _skeleton = require('../styles/skeleton.css');

var _skeleton2 = _interopRequireDefault(_skeleton);

var _custom = require('../styles/custom.css');

var _custom2 = _interopRequireDefault(_custom);

var _electrode = require('../images/electrode.png');

var _electrode2 = _interopRequireDefault(_electrode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Temoprary Code End, Please remove!

exports.default = function (props) {
  return _react2.default.createElement(
    'div',
    { className: 'system-layout' },
    _react2.default.createElement(
      'a',
      { href: '#' },
      'BlueRain OS',
      ' ',
      _react2.default.createElement('img', { src: _electrode2.default })
    ),
    _react2.default.createElement(
      _bluerainTaskbar2.default,
      null,
      _react2.default.createElement(
        'div',
        { className: 'system-body' },
        props.children
      )
    )
  );
};

// Temoprary Code Start, Please remove!
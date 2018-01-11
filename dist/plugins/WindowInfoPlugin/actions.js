'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setWindowDimentions = setWindowDimentions;
/*
 * action types
 */
var SET_WINDOW_INFO = exports.SET_WINDOW_INFO = '@@BLUERAIN/SET_WINDOW_INFO';
/*
 * action creators
 */
function setWindowDimentions(width, height) {
  return { type: SET_WINDOW_INFO, width: width, height: height };
}
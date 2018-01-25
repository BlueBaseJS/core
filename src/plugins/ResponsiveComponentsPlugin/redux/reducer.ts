import { SET_WINDOW_INFO } from './actions';
import getWindowSize from '../helpers/getWindowSize';
import initialState from './initialState';

export default (state = initialState(), action) => {
	switch (action.type) {
		case SET_WINDOW_INFO: {
			const { width, height } = action;
			return {
				width,
				height,
				size: getWindowSize(width)
			};
		}
		default:
			return state;
	}
};

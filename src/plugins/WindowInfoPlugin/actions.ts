/*
 * action types
 */
export const SET_WINDOW_INFO = '@@BLUERAIN/SET_WINDOW_INFO';

/*
 * action creators
 */
export function setWindowDimentions(width: number, height: number) {
	return { type: SET_WINDOW_INFO, width, height };
}

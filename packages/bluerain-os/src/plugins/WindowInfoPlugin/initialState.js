import getWindowSize from './getWindowSize';

/**
 * The state of current window or screen. Stored in `bluerain.window` in the redux store.
 * @property {number} width The window width
 * @property {number} height The window height
 * @property {"xs" | "sm" | "md" | "lg" | "xl"} size The window size i.e. (xs|sm|md|lg|xl)
 */
export type WindowState = {
	width: number,
	height: number,
	size: "xs" | "sm" | "md" | "lg" | "xl"
};
		//eslint-disable-next-line
export default function initialState(): WindowState {
		//eslint-disable-next-line
		const dimentions = BR.Dimensions;

	const initState = {
		width: dimentions.width || 0,
		height: dimentions.height || 0,
	};

	initState.size = getWindowSize(dimentions.width);
	return initState;
}

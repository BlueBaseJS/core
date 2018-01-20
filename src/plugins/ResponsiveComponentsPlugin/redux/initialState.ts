import getWindowSize from './getWindowSize';
import BR from '../../../index';

/**
 * The state of current window or screen. Stored in `bluerain.window` in the redux store.
 * @property {number} width The window width
 * @property {number} height The window height
 * @property {"xs" | "sm" | "md" | "lg" | "xl"} size The window size i.e. (xs|sm|md|lg|xl)
 */
export type WindowState = {
	width: number;
	height: number;
	size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export default function initialState(): WindowState {
	const dimentions = BR.Dimensions;

	const initState: WindowState = {
		width: dimentions.width || 0,
		height: dimentions.height || 0,
		size: getWindowSize(dimentions.width)
	};

	return initState;
}

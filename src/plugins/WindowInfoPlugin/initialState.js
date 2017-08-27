import RX from 'reactxp';
import getWindowSize from './getWindowSize';

export default function initialState() {
	const dimentions = RX.UserInterface.measureWindow();

	const initState = {
		width: dimentions.width || 0,
		height: dimentions.height || 0,
	};

	initState.size = getWindowSize(dimentions.width);
	return initState;
}

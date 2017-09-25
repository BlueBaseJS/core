import {REHYDRATE} from 'redux-persist/constants'
export default (state , action) => {
	switch (action.type) {
	case SET_WINDOW_INFO: {

		const { width, height } = action;
		return {
			width,
			height,
			size: getWindowSize(width)
		};
    }
    case REHYDRATE:
        var incoming = action.payload.myReducer
        console.log('incoming ', incoming);
        if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
        return state
	default:
		return state;
	}
};
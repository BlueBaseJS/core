import { REHYDRATE } from 'redux-persist/constants';
export default (state = {}, action) => {
	switch (action.type) {
	case REHYDRATE:
		return { ...state, ...action.payload };
	default:
		return state;
	}
};

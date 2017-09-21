const rtlDetect = require('rtl-detect');

export IntlProvider from './IntlProvider';
export Provider from './Provider';

export const UPDATE = '@@BLUERAIN/INTL/UPDATE';

export const updateIntl = locale => ({
	type: UPDATE,
	payload: { locale },
});

export const initialState = {
	locale: 'en',
	rtl: false,
	messages: {},
};

export function intlReducer(state = initialState, action) {
	if (action.type !== UPDATE) {
		return state;
	}

	const update = Object.assign({}, action.payload, { rtl: rtlDetect.isRtlLang(action.payload.locale) });
	return { ...state, ...update };
}

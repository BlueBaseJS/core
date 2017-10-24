import {
  ENABLE_SYSTEM_NAV,
  DISABLE_SYSTEM_NAV,
  OPEN_SYSTEM_NAV,
  CLOSE_SYSTEM_NAV,
  TOGGLE_SYSTEM_NAV,
  DOCK_SYSTEM_NAV,
	UNDOCK_SYSTEM_NAV,
	SHOW_LABELS_SYSTEM_NAV,
	HIDE_LABELS_SYSTEM_NAV,
	SET_STATE_SYSTEM_NAV
} from './actions';

import initialState from './InitialState';

export default (state = initialState(), action) => {

	if (!action.type.startsWith('@@BLUERAIN/SYSTEM_NAV/')) {
		return state;
	}

	switch (action.type) {

		// Activate/Deactivate
	case ENABLE_SYSTEM_NAV:
		return Object.assign({}, state, {
			disabled: false
		});

	case DISABLE_SYSTEM_NAV:
		return Object.assign({}, state, {
			disabled: true
		});

		// Open/Close
	case OPEN_SYSTEM_NAV:
		return Object.assign({}, state, {
			open: true
		});

	case CLOSE_SYSTEM_NAV:
		return Object.assign({}, state, {
			open: false
		});

	case TOGGLE_SYSTEM_NAV:
		return Object.assign({}, state, {
			open: state.open !== true
		});

		// Docking
	case DOCK_SYSTEM_NAV:

		return Object.assign({}, state, {
			docked: true
		});

	case UNDOCK_SYSTEM_NAV:

		return Object.assign({}, state, {
			docked: false
		});

		// Labels
	case HIDE_LABELS_SYSTEM_NAV:

		return Object.assign({}, state, {
			hideLabels: true
		});

	case SHOW_LABELS_SYSTEM_NAV:

		return Object.assign({}, state, {
			hideLabels: false
		});

	case SET_STATE_SYSTEM_NAV:

		return Object.assign({}, state, action.payload);

	default:
		return state;
	}
};


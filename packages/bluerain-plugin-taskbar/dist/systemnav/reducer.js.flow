import {
  ENABLE_SYSTEM_NAV,
  DISABLE_SYSTEM_NAV,
  OPEN_SYSTEM_NAV,
  CLOSE_SYSTEM_NAV,
  TOGGLE_SYSTEM_NAV,
  DOCK_SYSTEM_NAV,
  UNDOCK_SYSTEM_NAV
} from './actions';

import initialState from './InitialState';

export default function systemNav(state = initialState, action) {

	let obj;

	switch (action.type) {

	  // Activate/Deactivate
	case ENABLE_SYSTEM_NAV:
		obj = Object.assign({}, state);
		state.disabled = false;
		return obj;

	case DISABLE_SYSTEM_NAV:
		obj = Object.assign({}, state);
		state.disabled = true;
		return obj;
	// { return { disabled:true,
	// 	docked:false,
	// 	open:false }; }
    // state.disabled = true;
		// obj = Object.assign({}, state, { disabled: true });
		// console.log('obj', obj);
		// // obj.disabled  = true;
		// return obj;

	  // Open/Close
	case OPEN_SYSTEM_NAV:
		obj = Object.assign({}, state);
		state.open = true;
		return obj;

	case CLOSE_SYSTEM_NAV:
		obj = Object.assign({}, state);
		state.open = false;
		return obj;

	case TOGGLE_SYSTEM_NAV:
		let open = true;
		if (state.open === true) {
			open = false;
		}

		obj = Object.assign({}, state);
		obj.open = open;
		return obj;

    // Docking
	case DOCK_SYSTEM_NAV:

		obj = Object.assign({}, state);
		state.docked = true;
		return obj;

	case UNDOCK_SYSTEM_NAV:

		obj = Object.assign({}, state);
		state.docked = false;
		return obj;

	default:
		return state;
	}
}

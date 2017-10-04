/*
 * action types
 */

export const ENABLE_SYSTEM_NAV = '@@BLUERAIN/SYSTEM_NAV/ENABLE';
export const DISABLE_SYSTEM_NAV = '@@BLUERAIN/SYSTEM_NAV/DISABLE';

export const OPEN_SYSTEM_NAV = '@@BLUERAIN/SYSTEM_NAV/OPEN';
export const CLOSE_SYSTEM_NAV = '@@BLUERAIN/SYSTEM_NAV/CLOSE';
export const TOGGLE_SYSTEM_NAV = '@@BLUERAIN/SYSTEM_NAV/TOGGLE';

export const DOCK_SYSTEM_NAV = '@@BLUERAIN/SYSTEM_NAV/DOCK';
export const UNDOCK_SYSTEM_NAV = '@@BLUERAIN/SYSTEM_NAV/UNDOCK';

export const SHOW_LABELS_SYSTEM_NAV = '@@BLUERAIN/SYSTEM_NAV/SHOW_LABELS';
export const HIDE_LABELS_SYSTEM_NAV = '@@BLUERAIN/SYSTEM_NAV/HIDE_LABELS';

/*
 * action creators
 */

export function enableSystemNav() {
	return { type: ENABLE_SYSTEM_NAV };
}

export function disableSystemNav() {
	return { type: DISABLE_SYSTEM_NAV };
}

export function openSystemNav() {
	return { type: OPEN_SYSTEM_NAV };
}

export function closeSystemNav() {
	return { type: CLOSE_SYSTEM_NAV };
}

export function toggleSystemNav() {
	return { type: TOGGLE_SYSTEM_NAV };
}

export function dockSystemNav() {
	return { type: DOCK_SYSTEM_NAV };
}

export function undockSystemNav() {
	return { type: UNDOCK_SYSTEM_NAV };
}

export function showLabelsSystemNav() {
	return { type: SHOW_LABELS_SYSTEM_NAV };
}

export function hideLabelsSystemNav() {
	return { type: HIDE_LABELS_SYSTEM_NAV };
}

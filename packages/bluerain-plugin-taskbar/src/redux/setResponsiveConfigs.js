import {
  openSystemNav,
  closeSystemNav,
  dockSystemNav,
	undockSystemNav,
	showLabelsSystemNav,
	hideLabelsSystemNav
} from './actions';

export default (dispatch, size, open) => {
	if (open !== false) {
		if (size === 'xs' || size === 'sm') {
			dispatch(closeSystemNav());
			dispatch(undockSystemNav());
			dispatch(showLabelsSystemNav());
		} else {
			dispatch(openSystemNav());
			dispatch(dockSystemNav());
			dispatch(hideLabelsSystemNav());
		}
	}
};

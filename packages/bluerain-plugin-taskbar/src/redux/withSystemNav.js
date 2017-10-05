import { connect } from 'react-redux';

import {
  enableSystemNav,
  disableSystemNav,
  openSystemNav,
  closeSystemNav,
  toggleSystemNav,
  dockSystemNav,
	undockSystemNav,
	showLabelsSystemNav,
	hideLabelsSystemNav,
	setStateSystemNav
} from './actions';

const mapStateToProps = state => ({
	systemNav: state.bluerain.systemNav
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	systemNavActions: {
		enable: () => dispatch(enableSystemNav()),
		disable: () => dispatch(disableSystemNav()),
		open: () => dispatch(openSystemNav()),
		close: () => dispatch(closeSystemNav()),
		toggle: () => dispatch(toggleSystemNav()),
		dock: () => dispatch(dockSystemNav()),
		undock: () => dispatch(undockSystemNav()),
		hideLabels: () => dispatch(hideLabelsSystemNav()),
		showLabels: () => dispatch(showLabelsSystemNav()),
		setState: state => dispatch(setStateSystemNav(state)),
	}
});

export default function withSystemNav(Component) {

	const WithSystemNavComponent =  connect(
		mapStateToProps,
		mapDispatchToProps
	)(Component);

	return WithSystemNavComponent;
}


import {
  enableSystemNav,
  disableSystemNav,
  openSystemNav,
  closeSystemNav,
  toggleSystemNav,
  dockSystemNav,
  undockSystemNav
} from './actions';

export const mapStateToProps = (state) => {
	console.log('updated state: ', state);
	return {
		systemNav: state.bluerain
	};
};

export const mapDispatchToProps = (dispatch, ownProps) => {

	const systemNav = ownProps.systemNav;
	console.log('ownProps: ', ownProps);
	systemNav.actions = {};

	systemNav.actions.enable = () => dispatch(enableSystemNav());
	systemNav.actions.disable = () => dispatch(disableSystemNav());
	systemNav.actions.open = () => dispatch(openSystemNav());
	systemNav.actions.close = () => dispatch(closeSystemNav());
	systemNav.actions.toggle = () => dispatch(toggleSystemNav());
	systemNav.actions.dock = () => dispatch(dockSystemNav());
	systemNav.actions.undock = () => dispatch(undockSystemNav());

	return {
		systemNav
	};
};

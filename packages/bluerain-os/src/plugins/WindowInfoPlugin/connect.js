import { connect } from 'react-redux';
import { setWindowDimentions } from './actions';

const mapStateToProps = state => ({
	window: state.bluerain.window
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setWindowDimentions: (w, h) => dispatch(setWindowDimentions(w, h))
});

const withWindowInfo = Component => connect(mapStateToProps, mapDispatchToProps)(Component);

export default withWindowInfo;
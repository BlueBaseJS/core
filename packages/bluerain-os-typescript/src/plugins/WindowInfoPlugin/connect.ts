import { connect } from 'react-redux';
import { setWindowDimentions } from './actions';

const mapStateToProps = state => ({
	window: state.bluerain.window
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	setWindowDimentions: (w, h) => dispatch(setWindowDimentions(w, h))
});

export const withWindowInfo = Component =>
	connect(mapStateToProps, mapDispatchToProps)(Component);

	export const withWindowSize = Component =>
	connect(state => ({
		windowSize: state.bluerain.window.size
	}), {})(Component);

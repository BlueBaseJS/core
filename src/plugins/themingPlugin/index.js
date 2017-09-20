import { connect } from 'react-redux';
import { setTheme } from './actions';
import BR from '../../';
import ThemeReducer from './reducers';

class ThemePlugin extends BR.Plugin {
	static pluginName = 'ThemingPlugin';
	static slug = 'theme';
	static initialize(config = {}) {
    // Configurations

		BR.Filters.add(
      'bluerain.redux.reducers.bluerain',
      function addThemingReducer(reducers) {
	return Object.assign({}, reducers, { theme: ThemeReducer });
}
    );
	}

	static withTheme = (component, options) => {
		const mapStateToProps = state => ({
			style: state.bluerainTheme.theme.IndexPage
		});

		const mapDispatchToProps = (dispatch, ownProps) => ({
			setTheme: theme => dispatch(setTheme(theme))
		});

		const bindedComponent = connect(mapStateToProps, mapDispatchToProps)(
      component
    );
		return bindedComponent;
	};
}

export default ThemePlugin;

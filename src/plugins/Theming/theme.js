import { connect } from 'react-redux';
import { setTheme } from './actions';
import  { Plugin, CallbackRegistry } from '../../';
import { ThemeReducer } from './reducers';


class ThemePlugin extends Plugin {

	static pluginName = 'ThemingPlugin';
	static slug = 'theme';
  static initialize(config = {}) {

		// Configurations

		CallbackRegistry.add('bluerain.redux.reducers', function addApolloReducer(reducers) {
			return Object.assign({}, reducers, { theme: ThemeReducer.reducer() });
		} );
	}

  static withTheme = (component, options) => {
    const { name } = options;

    const mapStateToxProps = (state) => { style: state.bluerainTheme.theme.IndexPage; };

    const mapDispatchToProps = (dispatch) => { setTheme: (theme) => dispatch(setTheme(theme)); };

    const bindedComponent = connect(
      mapStateToProps,
      mapDispatchToProps,
    )(component);
    return bindedComponent;
  };

}

export default ThemePlugin;

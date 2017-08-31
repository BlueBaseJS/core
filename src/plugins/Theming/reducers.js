import indexPageStyles from './components/IndexPage';
import cardStyles from './components/Card';

const initialState = {

  theme: {
    IndexPage: indexPageStyles,
    Card: cardStyles,
  },

};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CHANGE_DEFAULT_THEME':
      return { ...state, theme: Object.assign({}, state.theme, action.theme) };

    default:
      return state;
  }
};

export default themeReducer;

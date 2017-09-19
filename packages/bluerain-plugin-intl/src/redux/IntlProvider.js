import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

function defaultSelector(state) {
	return state.bluerain.intl;
}

const mapStateToProps = (state, { intlSelector = defaultSelector }) => {
	const intl = intlSelector(state);

	return Object.assign({}, intl, {
		key: intl.locale,
		messages: intl.messages[intl.locale]
	});
};

export default connect(mapStateToProps)(IntlProvider);

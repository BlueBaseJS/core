import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { updateIntl } from '../redux';

const LanguageDropDown = ({ options, intl, updateIntl }) => {
	if (!options) {
		return <div />;
	}
	const keys = Object.keys(options);

	return (
  <div >
    <DropDownMenu value={intl.locale} onChange={(event, index, value) => updateIntl(value)}>
      {keys.map(key => (<MenuItem value={key} key={key} primaryText={options[key]} />))}
    </DropDownMenu>
  </div>
	);
};

const mapStateToProps = state => ({ intl: state.bluerain.intl });
const mapDispatchToProps = dispatch => ({
	updateIntl: locale => dispatch(updateIntl(locale))
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageDropDown);

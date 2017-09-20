// @flow
import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { updateIntl } from '../redux';

type Props = {
	intl: {
		rtl: boolean
	},
	updateIntl: Function,
	options: {[id: string]: string}
}

const LanguageDropDown = ({ options, intl, updateIntl }: Props) => {
	if (!options) {
		return <div />;
	}
	const keys = Object.keys(options);

	const style = (intl.rtl === false) ? { right: 4 } : { left: 4 };
	style.position = 'absolute';
	style.top = 8;

	return (
  <DropDownMenu style={style} value={intl.locale} onChange={(event, index, value) => updateIntl(value)} >
    {keys.map(key => (<MenuItem value={key} key={key} primaryText={options[key]} />))}
  </DropDownMenu>
	);
};

const mapStateToProps = state => ({ intl: state.bluerain.intl });
const mapDispatchToProps = dispatch => ({
	updateIntl: locale => dispatch(updateIntl(locale))
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageDropDown);

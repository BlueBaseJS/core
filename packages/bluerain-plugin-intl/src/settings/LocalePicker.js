import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
	customWidth: {
    // width: 200,
	},
};

export default class LanguageDropDown extends React.Component {

	constructor(props) {
		super(props);
		this.state = { value: 'en' };
	}

	handleChange = (event, index, value) => this.setState({ value });

	render() {

		const { options } = this.props;

		if (!options) {
			return <div />;
		}
		const keys = Object.keys(options);

		return (
  <div>
    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
      {keys.map(key => (<MenuItem value={key} key={key} primaryText={options[key]} />))}
    </DropDownMenu>
  </div>
		);
	}
}

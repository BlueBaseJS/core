import React from 'react';
import { withBlueRain  } from '@blueeast/bluerain-os';

import { List, ListItem } from 'material-ui/List';
import Card from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import LocalePicker from './LocalePicker';

const styles = {
	root: {
	},
	card: {
		// display: 'flex',
		// flexDirection: 'column',
		// flexWrap: 'wrap',
	},
};

const ListExampleSettings = ({ bluerain: BR }) => {

	const FormattedMessage = BR.Components.get('FormattedMessage');

	let schema = {
		component: 'View',
		children: []
	};

	schema = BR.Filters.run('app.settings.general', schema);

	return BR.Utils.parseJsonSchema(schema);
};

// primaryText={<FormattedMessage id="app.settings.language" defaultMessage="Language" />}
// secondaryText={<FormattedMessage id="app.settings.language.description" defaultMessage="Select your preferred language" />}

export default withBlueRain(ListExampleSettings);

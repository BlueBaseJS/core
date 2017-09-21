import React from 'react';
import { withBlueRain  } from '@blueeast/bluerain-os';

import Card from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const ListExampleSettings = ({ bluerain: BR }) => {

	const FormattedMessage = BR.Components.get('FormattedMessage');

	let schema = {
		component: 'View',
		children: [{
			component: Card,
			props: { style: { margin: 16 } },
			children: [{
				component: List,
				children: [{
					component: Subheader,
					text: <FormattedMessage id="app.settings.about" defaultMessage="General" />
				}, {
					component: ListItem,
					props: {
						primaryText: 'Version',
						secondaryText: 'Some Version here',
						disabled: true
					}
				}]
			}]
		}]
	};

	schema = BR.Filters.run('app.settings.about', schema);

	return BR.Utils.parseJsonSchema(schema);
};

export default withBlueRain(ListExampleSettings);

import React from 'react';

import Card from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionTranslate from 'material-ui/svg-icons/action/translate';

import LocalePicker from './LocalePicker';

export default (BR, config) => (schema) => {

	const FormattedMessage = BR.Components.get('FormattedMessage');

	schema.children.push({
		component: Card,
		props: { style: { margin: 16 } },
		children: [{
			component: List,
			children: [{
				component: Subheader,
				text: <FormattedMessage id="app.settings.general" defaultMessage="General" />
			}, {
				component: ListItem,
				props: {
					primaryText: <FormattedMessage id="app.settings.language" defaultMessage="Language" />,
					secondaryText: <div><FormattedMessage id="app.settings.language.description" defaultMessage="Select your preferred language" /></div>,
					leftIcon: <ActionTranslate />,
					disabled: true
				}
			}, {
				component: () => <LocalePicker options={config.selectable} />
			}]
		}]
	});

	return schema;
};

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

import Card from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionTranslate from 'material-ui/svg-icons/action/translate';

import LocalePicker from './LocalePicker';

export default (BR, config) => (schema) => {

	const FormattedMessage = BR.Components.get('FormattedMessage');

	schema.children.push({
		component: Card,
		children: [{
			component: List,
			children: [{
				component: Subheader,
				text: <FormattedMessage id="app.settings.general" defaultMessage="General" />
			}, {
				component: ListItem,
				props: {
					primaryText: <FormattedMessage id="app.settings.language" defaultMessage="Language" />,
					secondaryText: <FormattedMessage id="app.settings.language.description" defaultMessage="Select your preferred language" />,
					leftIcon: <ActionTranslate />,
					rightAvatar: <LocalePicker options={config.selectable} />,
					disabled: true
				}
			}]
		}]
	});
	schema.children.push({
		component: Card,
		props: { style: { margin: 10 } },
		children: [{
			component: List,
			children: [{
				component: Subheader,
				text: 'General'
			}, {
				component: ListItem,
				props: {
					primaryText: 'Language',
					secondaryText: 'Select your preferred language',
					leftIcon: <ActionTranslate />,
					rightIcon: <LocalePicker />,
					disabled: true
				}
			}]
		}]
	});

	return schema;
};

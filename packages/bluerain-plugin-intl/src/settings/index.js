import React from 'react';

import Card from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import LocalePicker from './LocalePicker';

export default (BR, config) => (schema) => {

	schema.children.push({
		component: Card,
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
					rightIcon: <LocalePicker options={config.selectable} />,
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
					rightIcon: <LocalePicker />,
					disabled: true
				}
			}]
		}]
	});

	return schema;
};

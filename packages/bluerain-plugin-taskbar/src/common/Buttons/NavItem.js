// @flow

import React from 'react';
import ListItem from 'material-ui/List/ListItem';

export default (props: {
	primaryText: string,
	hideLabel: boolean
}) => {

	const { label, hideLabel, ...other } = props; // eslint-disable-line

	let primaryText;
	let icon;

	if (hideLabel === true) {
		primaryText = props.icon;
		icon = null;
	} else {
		primaryText = label;
		icon = props.icon;
	}

	return <ListItem primaryText={primaryText} leftIcon={icon} {...other} />;
};

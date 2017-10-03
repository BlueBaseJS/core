// @flow

import React from 'react';
import ListItem from 'material-ui/List/ListItem';

export default (props: {
	primaryText: string,
	hideLabel: boolean
}) => {

	const { primaryText, hideLabel, ...other } = props;
	const label = (hideLabel === true) ? (<span>.</span>) : primaryText; // dirty hack, should send undefined not span
	return <ListItem primaryText={label} {...other} />;
};

// @flow

import React, { type Node } from 'react';
import AppBar from 'material-ui/AppBar';

export default (props: {
	title: string,
	logo: Node,
	hideLabel: boolean
}) => {

	const { title, hideLabel, logo, ...other } = props;
	const label = (hideLabel === true) ? undefined : title; // dirty hack, should send undefined not span
	return <AppBar title={label} iconElementLeft={logo} {...other} />;
};

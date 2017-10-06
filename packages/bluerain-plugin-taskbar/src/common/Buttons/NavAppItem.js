// @flow

import React from 'react';
import { withBlueRain, type BlueRain } from '@blueeast/bluerain-os';
import ListItem from 'material-ui/List/ListItem';

// import icon from 'material-ui/svg-icons/hardware/speaker';
import icon from 'material-ui/svg-icons/navigation/apps';

const NavAppItem =  (props: {
	slug: string,
	hideLabel: boolean,
	bluerain: BlueRain
}) => {

	const { hideLabel, slug, bluerain: BR, ...other } = props; // eslint-disable-line

	const App = BR.Apps.get(slug);
	const history = BR.refs.router.history;

	if (!App) {
		return null;
	}

	let label = App.appName;
	let Icon = App.appIcon || icon;
	const path = App.path;

	if (hideLabel === true) {
		label = <Icon />;
		Icon = undefined;
	}

	if (Icon) {
		other.leftIcon = <Icon />;
	}

	return <ListItem {...other} primaryText={label} onClick={() => { history.push(path); }} />;
};

export default withBlueRain(NavAppItem);

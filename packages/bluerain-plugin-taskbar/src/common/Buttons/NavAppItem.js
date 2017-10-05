// @flow

import React from 'react';
import { withBlueRain, type BlueRain } from '@blueeast/bluerain-os';
import ListItem from 'material-ui/List/ListItem';

import Launcher from '../icons/Launcher.component';

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
	let icon = App.appIcon || <Launcher />;
	const path = App.path;

	// debugger;
	if (hideLabel === true) {
		label = icon;
		icon = null;
	}

	return <ListItem {...other} primaryText={label} leftIcon={icon} onClick={() => { history.push(path); }} />;
};

export default withBlueRain(NavAppItem);

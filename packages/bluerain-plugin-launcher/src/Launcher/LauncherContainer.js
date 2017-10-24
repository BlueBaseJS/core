import React from 'react';
import { withBlueRain, type BlueRain } from '@blueeast/bluerain-os';
import AppIcon from 'material-ui/svg-icons/navigation/apps';
import Launcher from './LauncherComponent';

const Container = (props: {
	bluerain: BlueRain
}) => {

	const { bluerain: BR } = props;

	const appsList = Object.keys(BR.Apps.AppsTable);
	const appListData = [];

	appsList.forEach((appName) => {
		const app = BR.Apps.get(appName);

		appListData.push({
			icon: app.appIcon || AppIcon,
			name: app.appName,
			color: app.iconColor,
			slug: app.slug,
			link:  app.path
		});
	});

	return (<Launcher apps={appListData} {...props} />);
};

export default withBlueRain(Container);

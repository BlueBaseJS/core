// @flow

import React from 'react';
import { withBlueRain, type BlueRain } from '@blueeast/bluerain-os';
import { defineMessages, injectIntl } from 'react-intl';

import TaskbarComponent from './TaskbarComponent';
import Bulb from '../icons/Bulb.component';
import Launcher from '../icons/Launcher.component';

const messages = defineMessages({
	mevris: {
		id: 'plugin.taskbar.mevris',
		defaultMessage: 'Mevris'
	},
	apps: {
		id: 'plugin.taskbar.apps',
		defaultMessage: 'Apps'
	},
	deviceexplorer: {
		id: 'plugin.taskbar.deviceexplorer',
		defaultMessage: 'Device Explorer'
	},
	settings: {
		id: 'plugin.taskbar.settings',
		defaultMessage: 'Settings'
	}
});

const TaskbarContainer = (props: {
	bluerain: BlueRain,
	intl: {}
}) => {

	const { intl, systemNav, bluerain: BR } = props;
	const hideLabels = systemNav.hideLabels;

	// Items
	const history = BR.refs.router.history;
	const items = [
		{
			icon: <Launcher />,
			label: intl.formatMessage(messages.deviceexplorer),
			onClick: () => { history.push('/app/hello-world'); }
		},
		'->',
		{
			icon: <Bulb />,
			label: intl.formatMessage(messages.settings),
			onClick: () => { history.push('/app/settings'); }
		}
	];

	return (<TaskbarComponent
  items={items}
  hideLabels={hideLabels}
  open={systemNav.open}
  docked={systemNav.docked}
	/> );
};

export default injectIntl(withBlueRain(TaskbarContainer));

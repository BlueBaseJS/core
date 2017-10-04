// @flow

import React from 'react';
import { withBlueRain, type BlueRain } from '@blueeast/bluerain-os';
import { defineMessages, injectIntl } from 'react-intl';

import TaskbarComponent from './TaskbarComponent';
import Bulb from '../icons/Bulb.component';
import Launcher from '../icons/Launcher.component';
import Mevris from '../icons/Mevris.component';

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

	console.log('taskbar props', props)
	const { intl, systemNav, bluerain: BR, window } = props;
	const hideLabels = systemNav.hideLabels;
	const windowSize = window.size;

	const Logo = <Mevris />; // TODO: This should come from bluerain config as a SVG path
	const title = BR.Configs.get('title');

	// Items
	const history = BR.refs.router.history;
	const items = [
		{
			icon: <Launcher />,
			label: intl.formatMessage(messages.apps),
			onClick: () => { history.push('/'); }
		},
		'-',
		{
			icon: <Bulb />,
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

	// Props based on screen size
	// // This is just temporary
	// if (windowSize === 'xs' || windowSize === 'sm') {
	// 	props.systemNavActions.undock();
	// } else {
	// 	props.systemNavActions.dock();
	// }

	return (<TaskbarComponent
  logo={Logo}
  title={title}
  items={items}
  hideLabels={hideLabels}
  open={systemNav.open}
  docked={systemNav.docked}
	/> );
};

export default injectIntl(withBlueRain(TaskbarContainer));

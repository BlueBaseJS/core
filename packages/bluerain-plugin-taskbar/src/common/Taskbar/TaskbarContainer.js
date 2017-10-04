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

	console.log('Taskbar Container props', props)

	const { intl, systemNav } = props;
	const history = props.bluerain.refs.router.history;
	const hideLabels = systemNav.hideLabels;

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

	return (<TaskbarComponent logo={<Mevris />} title={intl.formatMessage(messages.mevris)} items={items} hideLabels={hideLabels} /> );
};

TaskbarContainer.defaultProps = {
	hideLabels: false
};

export default injectIntl(withBlueRain(TaskbarContainer));

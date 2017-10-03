/**
 * Created by amna on 9/9/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withBlueRain } from '@blueeast/bluerain-os';
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
	}
});

class TaskbarContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const history = this.props.bluerain.refs.router.history;
		const intl = this.props.intl;

		const items = [
			{
				icon: <Mevris />,
				label: intl.formatMessage(messages.mevris),
				onClick: () => { history.push('/'); }
			},
			{
				icon: <Launcher />,
				label: intl.formatMessage(messages.apps),
				onClick: () => { history.push('/'); }
			},
			{
				icon: <Bulb />,
				label: intl.formatMessage(messages.deviceexplorer),
				onClick: () => { history.push('/app/hello-world'); }
			}
		];

		return (<TaskbarComponent
  items={items}
  hideLabels={this.props.hideLabels}
  style={{ justifyContent: 'space-evenly' }}
		/> );
	}
}

TaskbarContainer.propTypes = {
	hideLabels: PropTypes.bool
};

TaskbarContainer.defaultProps = {
	hideLabels: false
};

export default injectIntl(withBlueRain(TaskbarContainer));

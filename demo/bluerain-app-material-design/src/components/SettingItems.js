import React from 'react';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';

import GeneralSettings from './GeneralSettings';

export default [
	{
		path: 'inbox',
		listItemProps: {
			primaryText: 'Inbox',
			leftIcon: <ContentInbox />
		},
		main: GeneralSettings
	},
	{
		path: 'bubblegum',
		listItemProps: {
			primaryText: 'Bubblegum',
			leftIcon: <ActionGrade />
		},
		main: () => <h2>Bubblegum</h2>
	},
	'-',
	{ path: 'shoelaces',
		listItemProps: {
			primaryText: 'Shoelaces',
			leftIcon: <ContentSend />
		},
		main: () => <h2>Shoelaces</h2>
	}
];

import React from 'react';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionInfo from 'material-ui/svg-icons/action/info';

import GeneralSettings from './pages/GeneralSettings';

export default (BR) => {
	const FormattedMessage = BR.Components.get('FormattedMessage');

	const SettingItems = [
		{
			path: 'general',
			listItemProps: {
				primaryText: (<FormattedMessage id="app.settings.general" defaultMessage="General" />),
				leftIcon: <ActionSettings />
			},
			main: GeneralSettings
		},
		'-',
		{
			path: 'about',
			listItemProps: {
				primaryText: (<FormattedMessage id="app.settings.about" defaultMessage="About" />),
				leftIcon: <ActionInfo />
			},
			main: () => <h2>About</h2>
		}
	];

	return BR.Filters.run('app.settings.items', SettingItems);
};

import React from 'react';
import AppBar from 'material-ui/AppBar';

import type { BlueRainType } from '@blueeast/bluerain-os';

const EnhancedAppBar = (props: { BR: BlueRainType }) => {

	const { BR } = props;
	const FormattedMessage = BR.Components.get('FormattedMessage');

	const appBarProps = {
		title: <FormattedMessage id="app.settings.title" defaultMessage="Title" />,
		showMenuIconButton: false
	};

	return (
  <AppBar {...appBarProps} />
	);
};

export default EnhancedAppBar;

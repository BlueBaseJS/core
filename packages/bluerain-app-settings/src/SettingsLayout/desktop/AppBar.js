import React from 'react';
import { withBlueRain } from '@blueeast/bluerain-os';
import AppBar from 'material-ui/AppBar';

const EnhancedAppBar = (props) => {

	const { bluerain: BR, } = props;
	const FormattedMessage = BR.Components.get('FormattedMessage');

	const appBarProps = {
		title: <FormattedMessage id="app.settings.title" defaultMessage="Title" />,
		showMenuIconButton: false
	};

	return (
  <AppBar {...appBarProps} />
	);
};

export default withBlueRain(EnhancedAppBar);

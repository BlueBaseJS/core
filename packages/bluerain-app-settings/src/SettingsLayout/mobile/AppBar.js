import React from 'react';
import { withBlueRain } from '@blueeast/bluerain-os';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';


const EnhancedAppBar = (props) => {

	const { bluerain: BR, match, location } = props;
	const FormattedMessage = BR.Components.get('FormattedMessage');

	const appUrl = match.url;
	const currentUrl = location.pathname;

	const appBarProps = {
		title: <FormattedMessage id="app.settings.title" defaultMessage="Title" />,
	};

	if (appUrl !== currentUrl) {
		appBarProps.title = <FormattedMessage id="global.back" defaultMessage="Back" />;
		appBarProps.iconElementLeft = <IconButton><NavigationArrowBack /></IconButton>;
	} else {
		appBarProps.showMenuIconButton = false;
	}
	console.log('props', props);


	return (
  <AppBar {...appBarProps} />
	);
};

export default withBlueRain(EnhancedAppBar);

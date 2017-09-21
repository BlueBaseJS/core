import React from 'react';
import type { BlueRainType } from '@blueeast/bluerain-os';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

const warning = require('warning');

const EnhancedAppBar = (props: {
	BR: BlueRainType,
	match: { url: string },
	location: { pathname: string },
	intl: { rtl: boolean }
}) => {

	const { BR, match, location, intl } = props;
	const FormattedMessage = BR.Components.get('FormattedMessage');

	const appUrl = match.url;
	const currentUrl = location.pathname;

	const appBarProps = {
		title: <FormattedMessage id="app.settings.title" defaultMessage="Title" />,
	};

	if (appUrl !== currentUrl) {
		appBarProps.title = <FormattedMessage id="global.back" defaultMessage="Back" />;
		appBarProps.iconElementLeft = (intl.rtl === true) ?
  <IconButton><NavigationArrowForward /></IconButton> :
  <IconButton><NavigationArrowBack /></IconButton>;
		appBarProps.onLeftIconButtonTouchTap = () => {
			try {
				BR.refs.router.history.goBack();
			} catch (e) {
				warning('No router found');
			}
		};
	} else {
		appBarProps.showMenuIconButton = false;
	}

	return (
  <AppBar {...appBarProps} />
	);
};

export default EnhancedAppBar;

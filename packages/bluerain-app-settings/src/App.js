import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';

import type { BlueRainType } from '@blueeast/bluerain-os';

import getSettingItems from './items';

import SettingsLayout from './SettingsLayout';

type Props = {
  bluerain: BlueRainType,
  muiTheme: {
    palette: {
      accent2Color: string
    }
  }
};

const App = (props: Props) => {

	const { bluerain: BR } = props;

	const Page = BR.Components.get('Page');
	const FormattedMessage = BR.Components.get('FormattedMessage');

	const items = getSettingItems(BR);

	return (
  <Page style={{ backgroundColor: props.muiTheme.palette.accent2Color }}>
    <AppBar
      title={<FormattedMessage id="app.settings.title" defaultMessage="Title" />}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <SettingsLayout items={items} {...props} />
  </Page>
	);
};

export default muiThemeable()(App);

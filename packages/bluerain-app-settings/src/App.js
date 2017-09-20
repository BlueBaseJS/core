import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from './components/AppBar';

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

	const { bluerain: BR, match } = props;

	const Page = BR.Components.get('Page');
	const Route = BR.Components.get('Route');
	const FormattedMessage = BR.Components.get('FormattedMessage');

	const path = BR.Apps.get('settings').path;

	const items = getSettingItems(BR);

	return (
  <Page style={{ backgroundColor: props.muiTheme.palette.accent2Color }}>
    <Route items={items} path={match.url} component={AppBar} />
    <SettingsLayout items={items} {...props} />
  </Page>
	);
};

export default muiThemeable()(App);

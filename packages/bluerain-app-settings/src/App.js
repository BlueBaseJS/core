import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

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
	const items = getSettingItems(BR);

	return (
  <Page style={{ backgroundColor: props.muiTheme.palette.accent2Color }}>
    <SettingsLayout items={items} {...props} />
  </Page>
	);
};

export default muiThemeable()(App);

import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';

import SettingItems from './SettingItems';

import SettingsLayout from '../SettingsLayout';

const App = (props) => {

	const { match, appName, bluerain: BR } = props;

	const Page = BR.Components.get('Page');
	const FormattedMessage = BR.Components.get('FormattedMessage');
  
	const items = BR.Filters.run('app.settings.items', SettingItems);

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

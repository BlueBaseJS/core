import React from 'react';
import AppBar from 'material-ui/AppBar';

const App = (props) => {

	const { match, appName, bluerain: BR } = props;

	const Page = BR.Components.get('Page');
	const Route = BR.Components.get('Route');
	const Redirect = BR.Components.get('Redirect');
	const Switch = BR.Components.get('Switch');

	return (
  <Page>
    <AppBar
      title="Title"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  </Page>
	);
};

export default App;

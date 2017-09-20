import React from 'react';
import AppBar from 'material-ui/AppBar';

const App = (props) => {

	const { bluerain: BR } = props;// eslint-disable-line

	const Page = BR.Components.get('Page');
	// const Route = BR.Components.get('Route');
	// const Redirect = BR.Components.get('Redirect');
	// const Switch = BR.Components.get('Switch');

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

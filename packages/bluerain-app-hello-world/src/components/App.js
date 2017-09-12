import React from 'react';

import Header from './Header';
import Home from './Home';
import About from './About';
import Responsive from './Responsive';
import Contact from './Contact';

const App = (props) => {

	const { match, appName, bluerain: BR } = props;

	const Page = BR.Components.get('Page');
	const Route = BR.Components.get('Route');
	const Redirect = BR.Components.get('Redirect');
	const Switch = BR.Components.get('Switch');

	return (
  <Page>
    <Header match={match} appName={appName} />
    <Switch>
      <Route exact path={`${match.url}`} component={Home} />
      <Route path={`${match.url}/about`} component={About} />
      <Route path={`${match.url}/responsive`} component={Responsive} />
      <Route path={`${match.url}/contact`} component={Contact} />
      <Redirect path="*" to={`${match.url}`} />
    </Switch>
  </Page>
	);
};

export default App;

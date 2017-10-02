import React from 'react';

import Header from './Header';
// import Home from './Home';
// import About from './About';
// import Responsive from './Responsive';
// import Contact from './Contact';

const App = (props) => {

	const { match, appName, bluerain: BR } = props;// eslint-disable-line

	const Page = BR.Components.get('Page');
	const Route = BR.Components.get('Route');
	const Redirect = BR.Components.get('Redirect');
  const Switch = BR.Components.get('Switch');
  const AsyncComponent = BR.Utils.AsyncComponent;
  const Header = AsyncComponent(() =>System.import('./Header').then(module => module.default))
	return (
  <Page>
    <Header match={match} appName={appName} />
    <Switch>
      <Route exact path={`${match.url}`} component={AsyncComponent(() =>
        System.import('./Home').then(module => module.default)
      )} />
      <Route path={`${match.url}/about`} component={AsyncComponent(() =>
        System.import('./About').then(module => module.default)
      )} />
      <Route path={`${match.url}/responsive`} component={AsyncComponent(() =>
        System.import('./Responsive').then(module => module.default)
      )} />
      <Route path={`${match.url}/contact`} component={AsyncComponent(() =>
        import('./Contact').then(module => module.default)
      )} />
      <Redirect path="*" to={`${match.url}`} />
    </Switch>
  </Page>
	);
};

export default App;

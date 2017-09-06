import React from 'react';
import  { Route, Redirect, Switch } from '../../../../../src/router';
import  BR from '../../../../../src/';

import Header from './components/Header';
import Home from './components/Home';
import { About } from './components/About';
import Responsive from './components/Responsive';
import Contact from './components/Contact';

BR.Filters.add('bluerain.intl.messages', function eng(messages) {
	const en = require('./lang/en.json');
	messages.en =  Object.assign(messages.en ? messages.en : {}, en);
	const ur = require('./lang/ur.json');
	messages.ur = Object.assign(messages.ur ? messages.ur : {}, ur);
	return messages;
});
class HelloWorldApp extends BR.App {
	static appName = 'Hello World';

	render() {
		const { match } = this.props;
		const Page = BR.Components.get('Page');
		return (
  <Page>
    <Header match={match} appName={this.constructor.appName} />
    <Switch>
      <Route exact path={`${match.url}`} component={Home} />
      <Route path={`${match.url}/about`} component={About} />
      <Route path={`${match.url}/responsive`} component={Responsive} />
      <Route path={`${match.url}/contact`} component={Contact} />
      <Redirect path="*" to={`${match.url}`} />
    </Switch>
  </Page>
		);
	}
}

export default HelloWorldApp;

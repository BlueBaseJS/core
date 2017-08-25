import React from 'react';
import { View } from 'reactxp';

import  { Route, Redirect, Switch } from '../../../../../src/router';
import  { App, ComponentRegistry } from '../../../../../src/';

import Header from './components/Header';
import Home from './components/Home';
import { About } from './components/About';
import Contact from './components/Contact';

class HelloWorldApp extends App {

	static appName = 'Hello World';

	render() {
    const { match } = this.props;
    const Page = ComponentRegistry.get('Page');
		return (
  <Page>
    <Header match={match} appName={this.constructor.appName} />
    <Switch>
      <Route exact path={`${match.url}`} component={Home} />
      <Route path={`${match.url}/about`} component={About} />
      <Route path={`${match.url}/contact`} component={Contact} />
      <Redirect path="*" to={`${match.url}`} />
    </Switch>
  </Page>
		);
	}
}

export default HelloWorldApp;

import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import  { App, buildApp } from '../../../../src/';

import { Home } from './components/Home';
import { User } from './components/User';

class HelloWorldApp extends App {

	render() {
		const { match } = this.props;
		return (
  <div>
    {HelloWorldApp.appName}
    <Switch>
      <Route exact path={`${match.url}`} component={Home} />
      <Route path={`${match.url}/user`} component={User} />
      <Route path={`${match.url}/home-single`} component={Home} />
      <Redirect path="*" to={`${match.url}`} />
    </Switch>
  </div>
		);
	}
}

export default buildApp(HelloWorldApp, { appName: 'Hello World' });

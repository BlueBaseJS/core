import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import  { boot } from '../../../../src/boot';
import { Home } from './components/Home';
import { User } from './components/User';
import  { App, buildApp } from '../../../../src/';

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

const apps = [
	buildApp(HelloWorldApp, { appName: 'Hello World' })
];

const SystemApp = boot({ apps, config: { title: 'Hello OS!' } });
export default SystemApp;

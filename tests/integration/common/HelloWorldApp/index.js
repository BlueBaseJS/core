import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import  { boot } from '../../../../src/boot';
import { Home } from './components/Home';
import { User } from './components/User';
import  { App } from '../../../../src/';

const HelloApp = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={`${match.url}`} component={Home} />
      <Route path={`${match.url}/user`} component={User} />
      <Route path={`${match.url}/home-single`} component={Home} />
      <Redirect path="*" to={`${match.url}`} />
    </Switch>
  </div>
  );

const apps = [
	new App({ name: 'Hello World', component: HelloApp })
];

const SystemApp = boot({ apps, config: { title: 'Hello OS!' } });
export default SystemApp;

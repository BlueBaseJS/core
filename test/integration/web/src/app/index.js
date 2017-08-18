import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import  { boot } from '../../../../../src/boot';
import {Root} from "./components/Root";
import {Home} from "./components/Home";
import {User} from "./components/User";
const HelloApp = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route exact path={`${match.url}`} component={Home} />
        <Route path={`${match.url}/user`} component={User} />
        <Route path={`${match.url}/home-single`} component={Home}/>
        <Redirect path="*" to={`${match.url}`} />
      </Switch>
    </div>
  );
};
const apps = {
  'hello-world': {
    routes: HelloApp
  }
};
const abc = boot({apps});
render(abc, window.document.getElementById('app'));
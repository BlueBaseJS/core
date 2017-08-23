import React from 'react';
import { View } from 'reactxp';
import { FormattedMessage } from 'react-intl';
import  { Route, Redirect, Switch } from '../../../../../src/router';
import  { App, CallbackRegistry, ComponentRegistry } from '../../../../../src/';

import Header from './components/Header';
import Home from './components/Home';
import { About } from './components/About';
import Contact from './components/Contact';
ComponentRegistry.register('FormattedMessage', FormattedMessage);
CallbackRegistry.add('bluerain.internationalization.lang', function eng(messages) {
  const en = require('./lang/en.json');
  messages['en']=en;
  const ur = require('./lang/ur.json');
  messages['ur']=ur;
  return messages;
});
class HelloWorldApp extends App {

	static appName = 'Hello World';

	render() {
		const { match } = this.props;
		return (
  <View>
    <Header match={match} appName={this.constructor.appName} />
    <Switch>
      <Route exact path={`${match.url}`} component={Home} />
      <Route path={`${match.url}/about`} component={About} />
      <Route path={`${match.url}/contact`} component={Contact} />
      <Redirect path="*" to={`${match.url}`} />
    </Switch>
  </View>
		);
	}
}

export default HelloWorldApp;

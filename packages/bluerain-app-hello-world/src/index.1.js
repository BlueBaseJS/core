import React from 'react';
import BR, { App, withBlueRain } from '@blueeast/bluerain-os';

import Header from './components/Header';
import Home from './components/Home';
import { About } from './components/About';
import Responsive from './components/Responsive';
import Contact from './components/Contact';

let Page,
	Route,
	Redirect,
	Switch;

class HelloWorldApp extends App {
	static appName = 'Hello World';

	render() {
		const { match } = this.props;
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

	static initialize(config, ctx) {
		Page = ctx.Components.get('Page');
		Route = ctx.Components.get('Route');
		Redirect = ctx.Components.get('Redirect');
		Switch = ctx.Components.get('Switch');

		// Add translations
		ctx.Filters.add('bluerain.intl.messages', function helloWorldAppTranslations(messages) {
			const en = require('./lang/en.json');
			const ur = require('./lang/ur.json');
			messages.en =  Object.assign(messages.en ? messages.en : {}, en);
			messages.ur = Object.assign(messages.ur ? messages.ur : {}, ur);
			return messages;
		});
	}
}

// const App = withBlueRain((props) => {

// 	console.log(props);
// 	return <p>Hey There</p>;
// });
// App.appName = 'Hello World';

// console.log('hello')
// export default App;
export default HelloWorldApp;
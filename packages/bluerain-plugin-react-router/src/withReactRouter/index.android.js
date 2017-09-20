import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { AndroidBackButton, DeepLinking } from 'react-router-native';

const withAndroidBackButton = App => props => (<AndroidBackButton><App {...props} /></AndroidBackButton>);

const deepLinking = enable => (enable ? DeepLinking : null);

export default (App, history, config) => (props) => {

	if (config.androidBackButton === true) {
		App = withAndroidBackButton(App);
	}

	return (<ConnectedRouter history={history}>{deepLinking(config.deepLinking)}<App {...props} /></ConnectedRouter>);
};

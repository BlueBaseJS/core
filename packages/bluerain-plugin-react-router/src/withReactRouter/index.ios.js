import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { DeepLinking } from 'react-router-native';

const deepLinking = enable => (enable ? DeepLinking : null);

export default (App, history, config) => props => (<ConnectedRouter history={history}>{deepLinking(config.deepLinking)}<App {...props} /></ConnectedRouter>);

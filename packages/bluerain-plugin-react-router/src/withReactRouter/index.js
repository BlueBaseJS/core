import React from 'react';
import { ConnectedRouter } from 'react-router-redux';

export default (App, history) => props => (<ConnectedRouter history={history}><App {...props} /></ConnectedRouter>);

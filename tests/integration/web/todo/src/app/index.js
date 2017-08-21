import React from 'react';
import  { App, buildApp, CallbackRegistry } from '../../../../../../src/';

import ToDoContainer from './containers/App';
import todoReducers, { initialState } from './reducers/todos';

CallbackRegistry.add('bluerain.redux.reducers', function addTodoReducers(reducers) {
	return Object.assign({}, reducers, { todos: todoReducers });
});

CallbackRegistry.add('bluerain.redux.initialState', function addTodoInitialState(state) {
	return Object.assign({}, state, { todos: initialState });
});

class ToDoApp extends App {
	render() {
		return (
  <ToDoContainer />
		);
	}
}

export default buildApp(ToDoApp, { appName: 'To Do', slug: 'todo' });

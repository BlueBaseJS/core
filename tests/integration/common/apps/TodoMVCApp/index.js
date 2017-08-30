import React from 'react';
import  { App, BlueRain } from '../../../../../src/';

import ToDoContainer from './containers/App';
import todoReducers, { initialState } from './reducers/todos';

BlueRain.filters.add('bluerain.redux.reducers', function addTodoReducers(reducers) {
	return Object.assign({}, reducers, { todos: todoReducers });
});

BlueRain.filters.add('bluerain.redux.initialState', function addTodoInitialState(state) {
	return Object.assign({}, state, { todos: initialState });
});

class ToDoApp extends App {

	static appName = 'To Do';
	static slug = 'todo';

	render() {
		return (
  <ToDoContainer />
		);
	}
}

export default ToDoApp;

import React from 'react';
import  BR from '../../../../../src/';

import ToDoContainer from './containers/App';
import todoReducers, { initialState } from './reducers/todos';

BR.Filters.add('bluerain.redux.reducers', function addTodoReducers(reducers) {
	return Object.assign({}, reducers, { todos: todoReducers });
});

BR.Filters.add('bluerain.redux.initialState', function addTodoInitialState(state) {
	return Object.assign({}, state, { todos: initialState });
});

class ToDoApp extends BR.App {

	static appName = 'To Do';
	static slug = 'todo';

	render() {
		return (
  <ToDoContainer />
		);
	}
}

export default ToDoApp;

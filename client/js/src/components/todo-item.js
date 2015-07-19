'use strict';

import React from 'react';
import TodoActions from '../actions/todo-actions';

export default class TodoItem extends React.Component {

    render() {
        let todo = this.props.todo;

        return (
          <li key={todo.id}>
            <label>{todo.text}</label>
            <button className="destroy" onClick={this.onDestroyClick.bind(this)}> x</button>
          </li>
        );
    }

    onDestroyClick() {
        TodoActions.destroy(this.props.todo.id);
    }

}

'use strict';

import React from 'react';
import TodoItem from './todo-item';

export default class MainSection extends React.Component {

    render() {
        let todoItems = getTodoItems(this.props.allTodos);

        return (
            <section id="main">
                <ul id="todo-list">{todoItems}</ul>
            </section>
        );
    }

}

function getTodoItems(allTodos) {
    return Object.keys(allTodos).map(
        (key) => (<TodoItem key={key} todo={allTodos[key]} />)
    );
}

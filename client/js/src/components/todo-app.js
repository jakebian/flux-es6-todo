'use strict';

import React from 'react';
import TodoStore from '../stores/todo-store';

import Header from './header';
import MainSection from './main-section';


export default class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = getTodoState();
    }

    componentDidMount() {
        TodoStore.addChangeListener(this.onChange.bind(this));
    }

    componentWillUnmount() {
        TodoStore.removeChangeListener(this.onChange.bind(this));
    }

    onChange() {
        this.setState(getTodoState());
    }

    render() {
        return (
            <div>
                <Header />
                <MainSection
                  allTodos={this.state.allTodos}
                  areAllComplete={this.state.areAllComplete}
                />
            </div>
        );
    }

}

function getTodoState() {
    return {
        allTodos: TodoStore.getAll()
    };
}

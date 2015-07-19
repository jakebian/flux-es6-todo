'use strict';
import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoConstants from '../constants/todo-constants';
import Events from 'events';

const CHANGE_EVENT = 'change';

export class TodoStore extends Events.EventEmitter {

    constructor() {
        super();
        this.todos = {};
        this.dispatcherIndex = AppDispatcher.register(this.handleAction);
    }

    handleAction(payload) {

        let action = payload.action;
        let text = '';

        switch(action.actionType) {

            case TodoConstants.TODO_CREATE:

                text = action.text.trim();
                if (text === '') { break; }

                this.create(text);
                this.emitChange();

            break;

            case TodoConstants.TODO_DESTROY:
                this.destroy(action.id);
                this.emitChange();
            break;

        }

        return true; // No errors. Needed by promise in Dispatcher.
    }

    /**
     * Creates a todo item
     * @param  {string} text TODO content
     */
    create(text) {

        let ID = Date.now();

        this.todos[ID] = {
            id: ID,
            complete: false,
            text: text
        };

    }

    /**
     * Destroys a todo item
     * @param  {string} id ID of the todo item
     */
    destroy(id) {
        delete this.todos[id];
    }

    /**
    * Get the entire collection of TODOs.
    * @return {object}
    */
    getAll() {
        return this.todos;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    /**
    * @param {function} callback
    */
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    /**
    * @param {function} callback
    */
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

}

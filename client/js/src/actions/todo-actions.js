'use strict';

import AppDispatcher from '../dispatcher/app-dispatcher';
import TodoConstants from '../constants/todo-constants';

class TodoActions {

    /**
    * @param  {string} text
    */
    create(text) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_CREATE,
            text: text
        });
    }

    /**
    * @param  {string} id
    */

    destroy(id) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_DESTROY,
            id: id
        });
    }
}

export default new TodoActions();

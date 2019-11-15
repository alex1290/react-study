import Immutable from 'immutable';

export const dataState = Immutable.fromJS({
    'todoState': {
        todoList: [
            {
                complete: false,
                id: 0,
                text: 'learn'
            },
            {
                complete: true,
                id: 1,
                text: 'play'
            },
            {
                complete: false,
                id: 2,
                text: 'sleep'
            },
        ],
        nextId: 3
    }

})

export default dataState;
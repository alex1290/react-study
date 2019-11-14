import Immutable from 'immutable';

export const dataState = Immutable.fromJS({
    'todoState': {
        nextId: 3,
        todoList: [
            {
                complete: false,
                id: 0,
                text: 'learn'
            },
            {
                complete: false,
                id: 1,
                text: 'play'
            },
            {
                complete: false,
                id: 2,
                text: 'sleep'
            },
        ]
    }

})

export default dataState;
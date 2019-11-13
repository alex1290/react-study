import Immutable from 'immutable';

export const dataState = Immutable.fromJS({
    'todoState':[
        {
            complete:false,
            text:'learn'
        },
        {
            complete:false,
            text:'play'
        },
        {
            complete:false,
            text:'sleep'
        },
    ]

})

export default dataState;
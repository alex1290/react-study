import Immutable from 'immutable';

export const dataState = Immutable.fromJS({
    todoState: {
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
    },
    chessState:{
        history:[[
            'WR','WK','WB','WQ',"WKing","WB",'WK',"WR",
            'WP','WP','WP','WP','WP','WP','WP','WP',
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            'BP','BP','BP','BP','BP','BP','BP','BP',
            'BR','BK','BB','BQ',"BKing","BB",'BK',"BR",
        ]],
        stepNumber:0,
        blackIsNext:true,
    }

})

export default dataState;
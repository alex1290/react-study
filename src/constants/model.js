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
        col:8,
        row:8,
        history:[
            'WR','Wk','WB','WQ',"WKing","WB",'WK',"WR",
            'WP','WP','WP','WP','WP','WP','WP','WP',
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,
            'BP','BP','BP','BP','BP','BP','BP','BP',
            'BR','Bk','BB','BQ',"BKing","BB",'BK',"BR",
        ],
        stepNumber:0,
        blackIsNext:true
    }

})

export default dataState;
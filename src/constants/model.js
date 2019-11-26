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
    chessState: {
        history: [[
            'WR', 'WK', 'WB', 'WQ', "WKing", "WB", 'WK', "WR",
            'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP',
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP',
            'BR', 'BK', 'BB', 'BQ', "BKing", "BB", 'BK', "BR",
        ]],
        stepNumber: 0,
        blackIsNext: true,
    },
    DNDState: {
        list: [
            {
                id: 1,
                name: 'item1',
                status: 'box1'
            },
            {
                id: 2,
                name: 'item2',
                status: 'box1'
            },
            {
                id: 3,
                name: 'item3',
                status: 'box1'
            },
            {
                id: 4,
                name: 'item4',
                status: 'box1'
            },
            {
                id: 5,
                name: 'item5',
                status: 'box2'
            },
            {
                id: 6,
                name: 'item6',
                status: 'box2'
            },
            {
                id: 7,
                name: 'item7',
                status: 'box2'
            },
        ],
        box: ['box1', 'box2','box3']
    }


})

export default dataState;
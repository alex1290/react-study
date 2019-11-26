import { combineReducers } from "redux";
import * as actionTypes from "../action/type";
import dataState from '../constants/model';

function LtoA(list) {
    let init = [...list]
    let arr = []
    for (let value of init) {
        let obj = {}
        for (let v of value) {
            obj[v[0]] = v[1]
        }
        arr.push(obj)
    }
    return arr
}
let initialTodoState = {
    todoList: LtoA(dataState.getIn(['todoState', 'todoList'])),
    nextId: dataState.getIn(['todoState', 'nextId'])
};
const todo_reducer = (state = initialTodoState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return {
                todoList: [
                    ...state.todoList,
                    {
                        complete: false,
                        id: state.nextId,
                        text: action.text
                    }
                ],
                nextId: state.nextId + 1
            }
        case actionTypes.TOGGLE_TODO:
            return {
                todoList: state.todoList.map(item => {
                    if (item.id === action.id)
                        item.complete = !item.complete
                    return item
                }),
                nextId: state.nextId
            }
        case actionTypes.REMOVE_TODO:
            return {
                todoList: state.todoList.filter(item => item.id !== action.id),
                nextId: state.nextId
            }
        default:
            return state
    }
}

let initialChessState = {
    history: [[...dataState.getIn(['chessState', 'history', 0])]],
    stepNumber: dataState.getIn(['chessState', 'stepNumber']),
    blackIsNext: dataState.getIn(['chessState', 'blackIsNext'])
}

const chess_reducer = (state = initialChessState, action) => {
    switch (action.type) {
        case actionTypes.MOVE_CHESS:
            let move = action.history;
            state.history = state.history.splice(0, action.step)
            state.history.push(move);
            return {
                history: state.history,
                stepNumber: action.step,
                blackIsNext: action.step % 2 === 0
            }

        case actionTypes.UPGRADE_CHESS:
            let { history } = action;
            return {
                history: history,
                stepNumber: state.stepNumber,
                blackIsNext: state.blackIsNext
            }
        case actionTypes.RESET_CHESS:
            return {
                history: state.history.splice(0, 1),
                stepNumber: 0,
                blackIsNext: true
            }
        default:
            return state
    }
}

let initialDNDState = {
    list: LtoA(dataState.getIn(['DNDState', 'list'])),
    box: [...dataState.getIn(['DNDState', 'box'])]
}
const DND_reducer = (state = initialDNDState, action) => {
    switch (action.type) {
        case actionTypes.START_DND:
            let tmp = {
                id: 'tmp',
                name: action.name,
                status: 'tmp'
            }
            state.list.forEach((i,n)=>{
                if(i.status==='tmp'){
                    state.list.splice(n,1)
                }
            })
            state.list.splice(action.index, 0, tmp)
            console.log(state.list)
            return {
                list: state.list,
                box: state.box
            }
        case actionTypes.DRAGGING_DND:
            const { index } = action
            let draggingItem, draggingItemIndex;
            state.list.forEach((i, n) => {
                if (i.status === 'tmp') {
                    draggingItem = i
                    draggingItemIndex = n
                }
            })
            state.list.splice(draggingItemIndex, 1)
            state.list.splice(index, 0, draggingItem)

            return {
                list: state.list,
                box: state.box
            }
        case actionTypes.MOVE_DND:
            const { name, target } = action
            let item, itemIndex;
            state.list.forEach((i, n) => {
                if (i.name === name && i.status !== 'tmp') {
                    item = i
                    itemIndex = n
                }
            })
            state.list.splice(itemIndex, 1)
            return {
                list: state.list.map(i => {
                    if (i.status === 'tmp') {
                        i = item
                        i.status = target
                    }
                    return i
                }),
                box: state.box
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    todoAction: todo_reducer,
    chessAction: chess_reducer,
    DNDAction: DND_reducer
});

export default rootReducer;
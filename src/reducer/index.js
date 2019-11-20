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
                    if (item.id == action.id)
                        item.complete = !item.complete
                    return item
                }),
                nextId: state.nextId
            }
        case actionTypes.REMOVE_TODO:
            return {
                todoList: state.todoList.filter(item => item.id != action.id),
                nextId: state.nextId
            }
        default:
            return state
    }
}

let initialChessState = {
    history: [[...dataState.getIn(['chessState', 'history',0])]],
    stepNumber: dataState.getIn(['chessState', 'stepNumber']),
    blackIsNext: dataState.getIn(['chessState', 'blackIsNext'])
}

const chess_reducer = (state = initialChessState, action) => {
    switch (action.type) {
        case actionTypes.MOVE_CHESS:
            let move = action.history;
            state.history = state.history.splice(0,action.step)
            state.history.push(move);
            console.log(!state.blackIsNext)
            return {
                history: state.history,
                stepNumber: action.step,
                blackIsNext: action.step % 2 === 0
            }
            
        case actionTypes.RETURN_CHESS:
            let { stepNumber } = action;
            let newHistory = state.history.splice(stepNumber + 1)
            return {
                history: newHistory,
                stepNumber: stepNumber,
                blackIsNext: stepNumber % 2 === 0
            }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    todoAction: todo_reducer,
    chessAction: chess_reducer,
});

export default rootReducer;
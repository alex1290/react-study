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

const rootReducer = combineReducers({
    todoAction: todo_reducer,
});

export default rootReducer;
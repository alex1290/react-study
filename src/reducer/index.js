import { combineReducers } from "redux";
import * as actionTypes from "../action/type";
import dataState from '../constants/model';
let list = dataState.getIn(['todoState','todoList'])

function aa(strMap) {
    let obj= Object.create(null);
    for (let[k,v] of strMap) {
        if(typeof v == 'object'){
            aa(v)
        }else{
            obj[k] = v;
        }
      
      console.log(typeof v)
    }
    
    return obj;
}
console.log(aa(dataState.get('todoState')))
let initialTodoState = {
    nextId: dataState.getIn(['todoState','nextId']),
    todoList: dataState.getIn(['todoState','todoList'])
};
const todo_reducer = (state = initialTodoState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return {
                nextId: action.nextId++,
                todoList: [
                    ...state,
                    {
                        complete: false,
                        id: action.nextId,
                        text: action.text
                    }
                ]
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    todoAction: todo_reducer,
});

export default rootReducer;
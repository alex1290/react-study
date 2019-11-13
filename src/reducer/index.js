import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";
import dataState from '../constants/model';

const initialTodoState = {
    todoList: dataState.get("todoState"),
  };

const todo_reducer = (state = initialTodoState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TODO:
            return {
                todoList: [
                    {
                        text
                    }
                ]
            }
    }
}
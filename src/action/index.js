import * as actionTypes from "./types";

export const addTodo = text => {
  return {
    type: actionTypes.ADD_TODO,
    text
  };
};

export const removeTodo = index => {
  return {
    type: actionTypes.REMOVE_TODO,
    index
  };
};

export const toggleTodo = index => {
 return {
     type: actionTypes.TOGGLE_TODO,
     index
 }
}
import * as actionTypes from "./type";

export const addTodo = text => {
  return {
    type: actionTypes.ADD_TODO,
    text
  };
};

export const removeTodo = id => {
  return {
    type: actionTypes.REMOVE_TODO,
    id
  };
};

export const toggleTodo = id => {
 return {
     type: actionTypes.TOGGLE_TODO,
     id
 }
}

export const moveChess = (history) => {
  return {
    type: actionTypes.MOVE_CHESS,
    history
  }
}
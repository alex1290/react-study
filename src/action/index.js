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

export const moveChess = (history, step) => {
  return {
    type: actionTypes.MOVE_CHESS,
    history,
    step
  }
}

export const upgradeChess = history => {
  return {
    type: actionTypes.UPGRADE_CHESS,
    history
  }
}

export const resetChess = () => {
  return {
    type: actionTypes.RESET_CHESS
  }
}

export const moveSnake = (position) => {
  return {
    type: actionTypes.MOVE_SNAKE,
    position
  }
}

export const addSnake = (position) => {
  return {
    type: actionTypes.ADD_SNAKE,
    position
  }
}
export const resetSnake = () => {
  return {
    type: actionTypes.RESET_SNAKE
  }
}

export const startDND = (name, index) => {
  return {
    type: actionTypes.START_DND,
    name,
    index
  }
}

export const draggingDND = (index) => {
  return {
    type: actionTypes.DRAGGING_DND,
    index
  }
}

export const moveDND = (name,target) => {
  return {
    type: actionTypes.MOVE_DND,
    name,
    target
  }
}


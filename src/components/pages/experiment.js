import React from 'react';
import './experiment.css';
import { connect } from "react-redux";
import * as action from '../../action/index'
class TodoList extends React.Component {
    render() {
        return (
            <ul className="todoList">
                <li className="todoListItem"></li>
            </ul>
        )
    }
}

const AddTodo = ({ dispatch }) => {
    const add = () => {
        let value = document.getElementById('addTodoText').value;
        dispatch(action.addTodo(value));
        value = ''
    }
    return (
        <div className="addTodo">
            <input id="addTodoText" type="text" />
            <div className="addTodoBtn" onClick={() => add()}>Submit</div>
        </div>
    )
}

class Todo extends React.Component {
    render() {
        const { todo, dispatch } = this.props;
        return (
            <div className="todo">
                <AddTodo dispatch={dispatch} />
                <ul className="todoList">
                    {console.log('test', todo)}
                    {/* {todo.get('todoState').get('todoList').map(item => (
                        <li className="todoListItem" key={item.get('id')}>
                            <input type="checkbox" name="" id="" />
                            <span
                                style={{ textDecoration: item.get('completed') ? 'line-through' : 'none' }}
                            >{item.get('text')}
                            </span>
                        </li>
                    ))} */}
                    <li className="todoListItem"></li>
                </ul>
            </div>
        )
    }
}



class Block extends React.Component {
    render() {
        const { isOn, toggle } = this.props;
        let color;
        isOn ? color = "#fa0" : color = "#0f0"
        return <div className="block" style={{ backgroundColor: color }} onClick={toggle}></div>
    }
}

class Experiment extends React.Component {

    state = {
        isOn: false
    }

    toggle() { this.setState({ isOn: !this.state.isOn }); }
    render() {
        console.log(this.props)
        const { todoState, dispatch } = this.props;
        return (
            <div>
                <h1>Experiment</h1>
                <Block isOn={this.state.isOn} toggle={() => this.toggle()} />
                <h2>Todo List</h2>
                <Todo todo={todoState} dispatch={dispatch} />
            </div>
        )
    }
}

const mapStateToProps = state =>
    ({
        todoState: state.todoAction
    })


export default connect(
    mapStateToProps
)(Experiment);

// export default Experiment;
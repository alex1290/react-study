import React from 'react';
import './experiment.css';
import { connect } from "react-redux";
import * as action from '../../action/index'


const AddTodo = ({ dispatch }) => {
    const add = () => {
        let val = document.getElementById('addTodoText').value;
        if (val.trim())
            dispatch(action.addTodo(val));
        document.getElementById('addTodoText').value = ''
    }
    return (
        <div className="addTodo">
            <input id="addTodoText" type="text" />
            <div className="addTodoBtn" onClick={() => add()}>Submit</div>
        </div>
    )
}

class Todo extends React.Component {
    state = {
        todoListPage: ['All', 'Incomplete', 'completed'],
        page: 'All',
        filter: {
            All: '',
            Incomplete: false,
            completed: true
        }
    }
    changePage = (page) => this.setState({ page })

    isCheck = (id) => this.props.dispatch(action.toggleTodo(id))

    del = (id) => this.props.dispatch(action.removeTodo(id))

    render() {
        const { todo, dispatch } = this.props;
        const { todoListPage, page, filter } = this.state;
        return (
            <div className="todo">
                <AddTodo dispatch={dispatch} />
                <ul className="todoPage">
                    {todoListPage.map((item, index) => (
                        <li
                            className="todoPageItem"
                            style={{
                                backgroundColor: page === item ? '#0ca' : 'transparent',
                                color: page === item ? 'white' : 'black'
                            }}
                            onClick={() => this.changePage(item)}
                            key={index}
                        >{item}</li>
                    ))}
                </ul>
                <ul className="todoList">
                    {todo.todoList.map((item, index) => {
                        let { id, complete, text } = item;
                        if (page === 'All' || complete === filter[page])
                            return (
                                <li className="todoListItem" key={index}>
                                    <div className="todoListText">
                                        <input type="checkbox" name="" id={'c' + id} defaultChecked={complete} onChange={() => this.isCheck(id)} />
                                        <span
                                            style={{ textDecoration: complete ? 'line-through' : 'none' }}
                                        >{text}
                                        </span>
                                    </div>
                                    <div className="todoListDel" onClick={() => this.del(id)}>delete</div>
                                </li>
                            )
                    })}
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
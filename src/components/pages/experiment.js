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
                        return null
                    })}
                </ul>
            </div>
        )
    }
}

class TestBtn extends React.Component {

    state = {
        x: 0,
        y: 0
    }

    onTouchStart(e) {
        const event = e.touches[0]
        console.log(event);

        const { add } = this.props
        const x = event.clientX
        const y = event.clientY
        this.setState({ x, y })
        add({ x, y })
    }

    onTouchMove(e) {
        const event = e.touches[0]
        console.log(event);

        const { move } = this.props
        const x = event.clientX
        const y = event.clientY
        this.setState({ x, y })
        move({ x, y })
    }

    render() {
        return <div className="testBtn"
            onTouchStart={e => this.onTouchStart(e)}
            onTouchMove={e => this.onTouchMove(e)}
        >dragTest</div>
    }
}

class Block extends React.Component {
    state = {
        offsetLeft: 0,
        offsetTop: 0
    }

    componentDidMount() {
        const testBox = document.getElementsByClassName("testBox")[0]
        this.setState({
            offsetLeft: testBox.offsetLeft,
            offsetTop: testBox.offsetTop,
            width: testBox.offsetWidth,
            height: testBox.offsetHeight,
        })
    }

    render() {
        const { index, block } = this.props;
        const { offsetLeft, offsetTop, width, height } = this.state
        // const left = block.x - testBox.offsetLeft
        let style = {
            top: (block.y - offsetTop) / height * 100 + "%",
            left: (block.x - offsetLeft) / width * 100 + "%"
        }

        return <div className="block" style={style}>{index}</div>
    }
}

class Experiment extends React.Component {

    state = {
        isOn: false,
        block: [{
            index: 0,
            x: 25,
            y: 190
        }],
        isdragging: null
    }

    add({ x, y }) {
        const { block } = this.state
        const index = block.length
        block.push({
            index,
            x,
            y
        })
        console.log(block);

        this.setState({
            block,
            isdragging: index
        })
    }

    move({ x, y }) {
        const { block, isdragging } = this.state
        let newBlock = JSON.parse(JSON.stringify(block))
        newBlock[isdragging].x = x
        newBlock[isdragging].y = y
        this.setState({
            block: newBlock
        })
    }


    toggle() { this.setState({ isOn: !this.state.isOn }); }
    render() {
        const { block, isdragging } = this.state
        const { todoState, dispatch } = this.props;
        return (
            <div>
                <h1>Experiment</h1>
                <div className="testBox">
                    {block.map((i, n) => <Block block={i} key={n} index={n} isdragging={isdragging} />)}
                    <TestBtn add={(e) => this.add(e)} move={(e) => this.move(e)} />
                </div>
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
import React from 'react';
import './dragList.css';
import { connect } from "react-redux";
import * as action from '../../action/index'


class Item extends React.Component {
    state = {
        drag: false,
        position: []
    }
    onDrag(e) {
        e.preventDefault();
        let x = e.clientX
        let y = e.clientY
        this.setState({ position: [x, y] })
    }
    onDragStart(e) {
        let { item, dispatch, index } = this.props
        this.setState({ drag: true })
        dispatch(action.startDND(item.name, index))
        e.dataTransfer.setData('text/plain', item.name)
    }
    onDragEnd(e) {
        e.preventDefault();
        this.setState({ drag: false })
    }
    onDragOver() {
        const { dispatch, index } = this.props
        dispatch(action.draggingDND(index))
    }
    render() {
        const { item, enter, dragging } = this.props
        const { drag } = this.state
        const dragStyle = {
            opacity: '0.6',
            border:'1px solid #000'
        }
        return (
            <li
                className={item.status === 'tmp' ? 'tmp' : 'item'}
                key={item.name}
                style={drag ? dragStyle : item.status === 'tmp' && !enter ? { display: 'none' } : {}}
                onDragStart={(e) => this.onDragStart(e)}
                onDrag={(e) => this.onDrag(e)}
                onDragEnd={(e) => this.onDragEnd(e)}
                onDragOver={() => this.onDragOver()}
                draggable="true"
            > {item.name}
            </li>
        )
    }
}

class Box extends React.Component {
    state = {
        name: this.props.box,
        hover: false,
        enter: false,
        dragging: false
    }
    draggingItem(item) {
        this.setState({ dragging: item })
    }
    onDragEnter(e) {
        this.setState({ enter: !this.state.enter })
    }
    onDragLeave(e) {
        this.setState({ enter: false })
    }
    onDrop(e) {
        let draggingItem = e.dataTransfer.getData('text/plain')
        let { dispatch, box } = this.props
        dispatch(action.moveDND(draggingItem, box))
        this.setState({
            enter: false,
            dragging:false
        })
    }
    onDragOver(e) {
        e.preventDefault()
        let x = e.clientX
        let y = e.clientY
        let el = document.elementFromPoint(x, y)
    }
    render() {
        const { list, box, dispatch } = this.props
        const { enter, name, dragging } = this.state
        let style = {
            backgroundColor: this.state.enter ? '#f00' : ''
        }
        let className = box + ' box'
        return (
            <ul
                droppable='true'
                className={className}
                style={{}}
                onDragEnter={(e) => this.onDragEnter(e)}
                onDragLeave={(e) => this.onDragEnter(e)}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e)}
            >
                <h3 className='title'>{box}</h3>
                {list.map((item, index) => {
                    if (box === item.status || item.status === 'tmp')
                        return (
                            <Item
                                item={item}
                                key={item.id}
                                enter={enter}
                                dragging={dragging}
                                box={name}
                                index={index}
                                dispatch={dispatch}
                                draggingItem={() => this.draggingItem()}
                                toggleColor={() => this.toggleColor()}
                            />
                        )
                })}
            </ul>
        )
    }
}

class SingleItem extends React.Component {
    state = {
        draggingItem: ''
    }
    render() {
        const { list, box } = this.props.DNDState;
        const { dispatch } = this.props
        return (
            <div className="singleItem">
                {box.map(box =>
                    <Box list={list} key={box} box={box} dispatch={dispatch} />
                )}
            </div>
        )
    }
}

// class Dragging extends React.Component {
//     render() {
//         // return this.props.el
//     }
// }

class DragList extends React.Component {
    render() {
        const { DNDState, dispatch } = this.props
        return (
            <div>
                <h1>Drag and Drop</h1>
                <SingleItem DNDState={DNDState} dispatch={dispatch} />
            </div>
        )
    }
}

const detectPosition = () => { }

const mapStateToProps = state =>
    ({
        DNDState: state.DNDAction
    })


export default connect(
    mapStateToProps
)(DragList);
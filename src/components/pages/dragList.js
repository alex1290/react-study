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
        this.setState({ drag: true })
        e.dataTransfer.setData('text/plain', this.props.item)
    }
    onDragEnd(e) {
        e.preventDefault();
        this.setState({ drag: false })
    }
    render() {
        const { item } = this.props
        const { drag } = this.state
        const dragStyle = {
            opacity: '0.6'
        }
        return (
            <li
                className='item'
                key={item}
                style={drag ? dragStyle : {}}
                onDragStart={(e) => this.onDragStart(e)}
                onDrag={(e) => this.onDrag(e)}
                onDragEnd={(e) => this.onDragEnd(e)}
                draggable="true"
            > {item}
            </li>
        )
    }
}

class Box extends React.Component {
    state = {
        name: this.props.box,
        hover: false,
        enter: false,
    }
    toggleColor() {
        this.setState({ enter: !this.state.enter })
    }
    onDrop(e) {
        let draggingItem = e.dataTransfer.getData('text/plain')
        let { dispatch, box } = this.props
        dispatch(action.moveDND(draggingItem, box))
        this.setState({
            enter: false,
            draggingItem: ''
        })
    }
    onDragOver(e) {
        e.preventDefault()
        let x = e.clientX
        let y = e.clientY
        let el = document.elementFromPoint(x,y)
        console.log(el.className,el.offsetTop)
    }
    render() {
        const { list, box } = this.props
        let style = {
            backgroundColor: this.state.enter ? '#f00' : ''
        }
        return (
            <ul draggable='true'
                droppable='true'
                className={box}
                style={style}
                onDragEnter={() => this.toggleColor()}
                onDragLeave={() => this.toggleColor()}
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e)}
            >
                {list.map(item => {
                    if (box === item.status)
                        return (
                            <Item
                                item={item.name}
                                key={item.name}
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
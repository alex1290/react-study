import React from 'react';
import './dragList.css';
// import { connect } from "react-redux";
// import * as action from '../../action/index'


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
        console.log()
    }
    onDragStart(e) {
        this.setState({ drag: true })
    }
    onDragEnd(e){
        e.preventDefault();
        this.setState({ drag: false })
    }
    onDragEnter(e){
        this.props.toggleColor()
    }
    onDragLeave(e){
        this.props.toggleColor()
    }
    onDrop (e){
        console.log(e)
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
                onDragEnter={() => this.onDragEnter()}
                onDragLeave={(e) => this.onDragLeave(e)}
                onDragEnd={(e) => this.onDragEnd(e)}
                onDrop={(e) => this.onDrop(e)}
                draggable="true"
            > {item}
            </li>
        )
    }
}

class Box extends React.Component {
    state = {
        hover: false,
        enter: false
    }
    onMouseEnter() {
        this.setState({ hover: true })
        console.log('in')
    }
    onMouseLeave() {
        this.setState({ hover: false })
    }
    toggleColor(){
        this.setState({enter:!this.state.enter})
    }
    render() {
        const { list } = this.props
        let style = {
            backgroundColor: this.state.enter ? '#f00' : ''
        }
        return (
            <ul draggable='true' 
                className={list.name}
                style={style}
                onMouseEnter={() => this.onMouseEnter()}
                onMouseLeave={() => this.onMouseLeave()}
                onDragEnter={()=>this.toggleColor()}
                onDragLeave={()=>this.toggleColor()}
            >
                {list.contain.map(item =>
                    <Item item={item} key={item} toggleColor={()=>this.toggleColor()}/>
                )}
            </ul>
        )
    }
}

class SingleItem extends React.Component {
    state = {
        list: [
            {
                name: 'box1',
                contain: ['item1', 'item2', 'item3', 'item4']
            },
            {
                name: 'box2',
                contain: ['item5', 'item6', 'item7']
            }
        ]
    }
    dragChange() {
        
    }
    render() {
        const { list } = this.state;
        return (
            <div className="singleItem">
                {list.map(list =>
                    <Box list={list} key={list.name} />
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
        return (
            <div>
                <h1>Drag and Drop</h1>
                <SingleItem />
            </div>
        )
    }
}

const detectPosition = () => { }

export default DragList;
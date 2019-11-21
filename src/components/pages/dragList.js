import React from 'react';
import './dragList.css';
// import { connect } from "react-redux";
// import * as action from '../../action/index'


class Item extends React.Component {
    state = {
        drag: false
    }
    onDrag() {
        this.setState({ drag: true })
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
                onDrag={() => this.onDrag()}
            > {item}
            </li>
        )
    }
}

class Box extends React.Component {
    state = {
        hover: false
    }
    onMouseEnter() {
        this.setState({ hover: true })
        console.log('in')
    }
    onMouseLeave() {
        this.setState({ hover: false })
    }
    render() {
        const { list } = this.props
        return (
            <ul
                className={list.name}
                onMouseEnter={() => this.onMouseEnter()}
                onMouseLeave={() => this.onMouseLeave()}
            >
                {list.contain.map(item =>
                    <Item item={item} key={item}/>
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
    dragStart() {

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
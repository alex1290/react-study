import React from 'react';
import './chess.css';
import { connect } from "react-redux";
import * as action from '../../action/index'

class Game extends React.Component {
    state = {
        selected: null,
        rule: {
            P: [[0, 1], [0, 2]],
            R: [[1, 0], [0, 1]],
            K: [[1, 2], [2, 1]],
            B: [[1, 1]],
            Q: [[1, 0], [0, 1], [1, 1]],
            K: [[1, 0], [0, 1], [1, 1]],
        }
    }

    selectPiece = (position) => {
        let square = (x, y) => {
            if (x < 8 && y < 8 && x >= 0 && y >= 0) {
                let sq = document.getElementsByClassName('square')[y * 8 + x].innerHTML
                console.log(sq)
                return sq ? sq : 'Null'
            }
            return 'Out'
        }
        let piece = document.getElementsByClassName('square')[position]
        let color = piece.innerHTML[0]
        let name = piece.innerHTML.substring(1)
        if (color === (this.props.chessState.blackIsNext ? 'B' : 'W')) {
            document.querySelectorAll('.square').forEach((i) => i.style.borderColor = '#000')

            let x = position % 8
            let y = Math.floor(position / 8)
            let col = [0, 1, 2, 3, 4, 5, 6, 7]
            let row = [0, 1, 2, 3, 4, 5, 6, 7]
            let movement = []
            switch (name) {
                case 'P':
                    if (color === 'B') {
                        if (square(x, y - 1) === 'Null') {
                            movement.push([x, y - 1])
                            if (y === 6 && square(x, y - 2) === 'Null') {
                                movement.push([x, y - 2])
                            }
                        }

                        if (square(x + 1, y - 1) && square(x + 1, y - 1)[0] !== color && square(x + 1, y - 1) !== 'Null' && square(x + 1, y - 1) !== 'Out') {
                            movement.push([x + 1, y - 1])
                        }
                        if (square(x - 1, y - 1) && square(x - 1, y - 1)[0] !== color && square(x - 1, y - 1) !== 'Null' && square(x - 1, y - 1) !== 'Out') {
                            movement.push([x - 1, y - 1])
                        }
                    } else {
                        if (square(x, y + 1) === 'Null') {
                            movement.push([x, y + 1])
                            if (y === 1 && square(x, y + 2) === 'Null') {
                                movement.push([x, y + 2])
                            }
                        }

                        if (square(x + 1, y + 1) && square(x + 1, y + 1)[0] !== color && square(x + 1, y + 1) !== 'Null' && square(x + 1, y + 1) !== 'Out') {
                            movement.push([x + 1, y + 1])
                        }
                        if (square(x - 1, y + 1) && square(x - 1, y + 1)[0] !== color && square(x - 1, y + 1) !== 'Null' && square(x - 1, y + 1) !== 'Out') {
                            movement.push([x - 1, y + 1])
                        }
                    }
                    break;
                case 'R':
                    for (let i = x + 1; i < 8; i++) {
                        if (square(i, y)[0] !== color)
                            movement.push([i, y])
                        if (square(i, y) !== 'Null') {
                            break
                        }
                    }
                    for (let i = x - 1; i >= 0; i--) {
                        console.log(square(i, y)[0])
                        if (square(i, y)[0] !== color)
                            movement.push([i, y])
                        if (square(i, y) !== 'Null') {
                            break
                        }
                    }
                    for (let i = y + 1; i < 8; i++) {
                        if (square(x, i)[0] !== color)
                            movement.push([x, i])
                        if (square(x, i) !== 'Null') {
                            break
                        }
                    }
                    for (let i = y - 1; i >= 0; i--) {
                        if (square(x, i)[0] !== color)
                            movement.push([x, i])
                        if (square(x, i) !== 'Null') {
                            break
                        }
                    }
                    break;
                case 'K':
                    let knight = [[x + 1, y + 2], [x - 1, y - 2], [x + 1, y - 2], [x - 1, y + 2], [x - 2, y - 1], [x + 2, y - 1], [x - 2, y + 1], [x + 2, y + 1]]
                    knight.forEach(([x, y]) => {
                        console.log(x, y, square(x, y))
                        if (square(x, y) !== 'Out' && square(x, y)[0] !== color) {
                            movement.push([x, y])
                        }
                    })
                    break;
                case 'B':
                    for (let i = x + 1; i < 8; i++) {
                        if (square(i, y)[0] !== color)
                            movement.push([i, y])
                        if (square(i, y) !== 'Null') {
                            break
                        }
                    }
                // col.map((i) => {
                //     if(i!==x && square(i,y)[0] !== color)
                //     movement.push([i, y])
                // })
                // row.map((i) => {
                //     if(i!==y && square(x,i)[0] !== color)
                //     movement.push([x, i])
                // })

            }
            if (movement) {
                movement.map(([x, y]) => {
                    document.getElementsByClassName('square')[y * 8 + x].style.borderColor = '#f00'
                })
            }
            piece.style.borderColor = '#0c0'
            this.setState({
                selected: {
                    name: piece.innerHTML,
                    position: [x, y]
                }
            })
        }
    }

    movePiece = (newPosition) => {
        let { history, stepNumber } = this.props.chessState
        let newHistory = [...history[stepNumber]]
        let { name, position } = this.state.selected
        let [x, y] = position
        let newRow = Math.floor(newPosition / 8)
        let newCol = newPosition % 8
        let target = document.getElementsByClassName('square')[newPosition].innerHTML
        let color = name[0]
        let piece = name.substring(1)
        let choose = document.getElementsByClassName('square')[newPosition]
        const move = () => {
            newHistory[newPosition] = name;
            newHistory[y * 8 + x] = null;
            document.querySelectorAll('.square').forEach((i) => i.style.borderColor = '#000')
            this.setState({ selected: null });
            this.props.dispatch(action.moveChess(newHistory));
        }

        const cancel = () => {
            document.querySelectorAll('.square').forEach((i) => i.style.borderColor = '#000')
            this.setState({ selected: null });
        }


        if (choose.style.borderColor == 'rgb(255, 0, 0)') {
            move()
        } else {
            cancel()
        }
        // const isExist = (row, col, newRow, newCol, color) => {
        //      if(row === newRow ){
        //         let between = []
        //         for(let i = col;i < newCol - col )
        //      }
        // }
        // rule
        // switch (piece) {
        //     case 'P':
        //         if (color === 'B') {
        //             if (!target && (newRow === row - 1 || (row === 6 && newRow === 4)) && newCol === col) {
        //                 move()
        //             } else if (target && target[0] !== color && newRow === row - 1 && (newCol === col + 1 || newCol === col - 1)) {
        //                 move()
        //             }
        //         } else if (color === 'W') {
        //             if (!target && (newRow === row + 1 || (row === 1 && newRow === 3)) && newCol === col) {
        //                 move()
        //             } else if (target && target[0] !== color && newRow === row + 1 && (newCol === col + 1 || newCol === col - 1)) {
        //                 move()
        //             }
        //         }
        //         break;
        //     case 'R':
        //         console.log(piece, 'R')
        //         if (target[0] !== color && (newCol === col || newRow === row)) {
        //             move()
        //         }
        //         break;
        // }


    }
    render() {
        const { chessState } = this.props;
        let { history, stepNumber, blackIsNext } = chessState;
        let color = blackIsNext ? 'B' : 'W'
        let col = true;
        return (
            <div className="chessContainer">
                <div className="board">
                    {history[stepNumber].map((item, index) => {
                        if (index % 8 == 0) {
                            col = !col
                        }
                        return (
                            <div className="square"
                                key={index}
                                style={{
                                    backgroundColor: index % 2 === (col ? 0 : 1) ? '#FFCE9E' : '#D18B47',
                                    cursor: item && item[0] === color ? 'pointer' : 'auto'
                                }}
                                onClick={() => this.state.selected ? this.movePiece(index) : this.selectPiece(index)}
                            >{item}</div>
                        )
                    })}
                </div>
                <div className="note">
                    <h2>{blackIsNext ? 'Black' : 'White'} turn</h2>
                    <ul className="stepBoard">
                        {history.map((item, index) =>
                            <li className="step"
                                key={index}
                            >step: {index + 1}</li>
                        )}
                    </ul>
                </div>
            </div>


        )
    }
}

class Chess extends React.Component {

    render() {
        const { chessState, dispatch } = this.props;
        console.log(this.props)
        return (
            <div>
                <h1>Chess</h1>
                <Game chessState={chessState} dispatch={dispatch} />
            </div>
        )
    }
}

const mapStateToProps = state =>
    ({
        chessState: state.chessAction
    })


export default connect(
    mapStateToProps
)(Chess);


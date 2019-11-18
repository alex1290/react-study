import React from 'react';
import './chess.css';
import { connect } from "react-redux";
import * as action from '../../action/index'

class Game extends React.Component {
    state = {
        selected: null,
        rule:{
            P:[[0,1],[0,2]],
            R:[[1,0],[0,1]],
            K:[[1,2],[2,1]],
            B:[[1,1]],
            Q:[[1,0],[0,1],[1,1]],
            K:[[1,0],[0,1],[1,1]],
        }
    }
    selectPiece = (position) => {
        let piece = document.getElementsByClassName('square')[position]
        if (piece.innerHTML && piece.innerHTML[0] === (this.props.chessState.blackIsNext ? 'B' : 'W')) {
            document.querySelectorAll('.square').forEach((i) => i.style.borderColor = '#000')
            piece.style.borderColor = '#f00'
            let row = Math.floor(position / 8)
            let col = position % 8
            this.setState({
                selected: {
                    name: piece.innerHTML,
                    position: [row, col]
                }
            })
        }
    }
    movePiece = (newPosition) => {
        let { history, stepNumber } = this.props.chessState
        let newHistory = [...history[stepNumber]]
        let { name, position } = this.state.selected
        let [row, col] = position
        let newRow = Math.floor(newPosition / 8)
        let newCol = newPosition % 8
        let color = name[0]
        let piece = name.substring(1)
        const move = () => {
            newHistory[newPosition] = name;
            newHistory[row * 8 + col] = null;
            document.querySelectorAll('.square').forEach((i) => i.style.borderColor = '#000')
            this.setState({ selected: null });
            this.props.dispatch(action.moveChess(newHistory));
        }
        console.log(newRow)
        switch (piece) {
            case 'P':
                if (color === 'B' && newRow === (row - 1 || row - 2) && newCol === col) {
                   move()
                }else if(color === 'W' && newRow === (row + 1 || row + 2) && newCol === col){
                    move()
                }
        }


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
                            <li className="step">step: {index + 1}</li>
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


import React from 'react';
import './chess.css';
import { connect } from "react-redux";
import * as action from '../../action/index'
class Game extends React.Component {
    state = {
        selected: null,
        nowStep: 0,
        upgrade: null,
        moved: []
    }

    selectPiece = (position) => {

        let square = (x, y) => {
            if (x < 8 && y < 8 && x >= 0 && y >= 0) {
                let sq = document.getElementsByClassName('square')[y * 8 + x].innerHTML
                return sq ? sq : 'Null'
            }
            return 'Out'
        }

        let piece = document.getElementsByClassName('square')[position]
        let color = piece.innerHTML[0]
        let name = piece.innerHTML.substring(1)
        let { nowStep, moved } = this.state
        if (color === (nowStep % 2 === 0 ? 'B' : 'W')) {
            document.querySelectorAll('.square').forEach((i) => i.style.borderColor = '#000')

            let x = position % 8
            let y = Math.floor(position / 8)
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
                    let rookName = x > 4 ? 'R' + name : 'L' + name
                    let rookMoved = moved.indexOf(rookName) !== -1
                    let kingMoved = moved.indexOf(color + 'King') !== -1
                    let RKbetween = () => {
                        if (x - 4 > 0) {
                            for (let i = x - 1; i > 4; i--) {
                                if (square(i, y) !== 'Null') {
                                    break
                                }
                                if (i === 5)
                                    movement.push([4, y])
                            }
                        } else {
                            for (let i = x + 1; i < 4; i++) {
                                if (square(i, y) !== 'Null') {
                                    break
                                }
                                if (i === 3)
                                    movement.push([4, y])
                            }
                        }
                    }
                    if (!rookMoved && !kingMoved) {
                        RKbetween()
                    }
                    break;
                case 'K':
                    let knight = [[x + 1, y + 2], [x - 1, y - 2], [x + 1, y - 2], [x - 1, y + 2], [x - 2, y - 1], [x + 2, y - 1], [x - 2, y + 1], [x + 2, y + 1]]
                    knight.forEach(([x, y]) => {
                        if (square(x, y) !== 'Out' && square(x, y)[0] !== color) {
                            movement.push([x, y])
                        }
                    })
                    break;
                case 'B':
                    for (let i = 1; x + i < 8 && y + i < 8; i++) {
                        if (square(x + i, y + i)[0] !== color)
                            movement.push([x + i, y + i])
                        if (square(x + i, y + i) !== 'Null') {
                            break
                        }
                    }
                    for (let i = 1; x - i >= 0 && y + i < 8; i++) {
                        if (square(x - i, y + i)[0] !== color)
                            movement.push([x - i, y + i])
                        if (square(x - i, y + i) !== 'Null') {
                            break
                        }
                    }
                    for (let i = 1; x + i < 8 && y - i >= 0; i++) {
                        if (square(x + i, y - i)[0] !== color)
                            movement.push([x + i, y - i])
                        if (square(x + i, y - i) !== 'Null') {
                            break
                        }
                    }
                    for (let i = 1; x - i < 8 && y - i >= 0; i++) {
                        if (square(x - i, y - i)[0] !== color)
                            movement.push([x - i, y - i])
                        if (square(x - i, y - i) !== 'Null') {
                            break
                        }
                    }
                    break;
                case 'Q':
                    for (let i = x + 1; i < 8; i++) {
                        if (square(i, y)[0] !== color)
                            movement.push([i, y])
                        if (square(i, y) !== 'Null') {
                            break
                        }
                    }
                    for (let i = x - 1; i >= 0; i--) {
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
                    for (let i = 1; x + i < 8 && y + i < 8; i++) {
                        if (square(x + i, y + i)[0] !== color)
                            movement.push([x + i, y + i])
                        if (square(x + i, y + i) !== 'Null') {
                            break
                        }
                    }
                    for (let i = 1; x - i >= 0 && y + i < 8; i++) {
                        if (square(x - i, y + i)[0] !== color)
                            movement.push([x - i, y + i])
                        if (square(x - i, y + i) !== 'Null') {
                            break
                        }
                    }
                    for (let i = 1; x + i < 8 && y - i >= 0; i++) {
                        if (square(x + i, y - i)[0] !== color)
                            movement.push([x + i, y - i])
                        if (square(x + i, y - i) !== 'Null') {
                            break
                        }
                    }
                    for (let i = 1; x - i < 8 && y - i >= 0; i++) {
                        if (square(x - i, y - i)[0] !== color)
                            movement.push([x - i, y - i])
                        if (square(x - i, y - i) !== 'Null') {
                            break
                        }
                    }
                    break;
                case 'King':
                    let king = [[x + 1, y], [x - 1, y], [x + 1, y + 1], [x + 1, y - 1], [x, y + 1], [x, y - 1], [x - 1, y + 1], [x - 1, y - 1]]
                    king.forEach(([x, y]) => {
                        if (square(x, y) !== 'Out' && square(x, y)[0] !== color) {
                            movement.push([x, y])
                        }
                    })
                    let KingMoved = moved.indexOf(name) !== -1
                    let RrookMoved = moved.indexOf('R' + color + 'R') !== -1
                    let LrookMoved = moved.indexOf('L' + color + 'R') !== -1
                    let KRbetween = () => {
                        if (!RrookMoved) {
                            for (let i = x + 1; i < 7; i++) {
                                if (square(i, y) !== 'Null') {
                                    break
                                }
                                if (i === 6)
                                    movement.push([7, y])
                            }
                        }
                        if (!LrookMoved) {
                            for (let i = x - 1; i > 0; i--) {
                                if (square(i, y) !== 'Null') {
                                    break
                                }
                                if (i === 1)
                                    movement.push([0, y])
                            }
                        }
                    }
                    if (!KingMoved) {
                        KRbetween()
                    }
                    break;
                default:
                    return null
            }
            if (movement) {
                movement.forEach(([x, y]) => {
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
        let { history } = this.props.chessState
        let { name, position } = this.state.selected
        let { nowStep, moved } = this.state
        let newHistory = [...history[nowStep]]
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
            this.props.dispatch(action.moveChess(newHistory, nowStep + 1));
        }

        const cancel = () => {
            document.querySelectorAll('.square').forEach((i) => i.style.borderColor = '#000')
            this.setState({ selected: null });
        }

        const castling = () => {
            newHistory[newPosition] = null;
            newHistory[y * 8 + x] = null;
            if (x === 0 || newCol === 0) {
                newHistory[y * 8 + 2] = color + 'King'
                newHistory[y * 8 + 3] = color + 'R'
            } else {
                newHistory[y * 8 + 6] = color + 'King'
                newHistory[y * 8 + 5] = color + 'R'
            }
            document.querySelectorAll('.square').forEach((i) => i.style.borderColor = '#000')
            this.setState({ selected: null });
            this.props.dispatch(action.moveChess(newHistory, nowStep + 1));
        }

        if (choose.style.borderColor === 'rgb(255, 0, 0)') {
            moved = moved.splice(0, nowStep)
            if ((piece === 'King' || piece === 'R') && target[0] === color) {
                let rookName = (x === 7 || newCol === 7 ? 'R' : 'L') + color + 'R'
                moved[nowStep] = [...moved[nowStep - 1], color + 'King', rookName]
                castling()
            } else {
                if (piece === 'King' && moved[nowStep - 1].indexOf(name) === -1) {
                    moved[nowStep] = [...moved[nowStep - 1], name]
                } else if (piece === 'R') {
                    let rookName = x > 4 ? 'R' + name : 'L' + name
                    if (moved[nowStep - 1].indexOf(rookName) === -1) {
                        moved[nowStep] = [...moved[nowStep - 1], name]
                    } else {
                        moved[nowStep] = [...moved[nowStep - 1]]
                    }
                } else {
                    moved[nowStep] = nowStep - 1 < 0 ? [] : moved[nowStep - 1]
                }
                move()
            }
            this.setState({ moved: moved })
            this.setState({ nowStep: this.state.nowStep + 1 })
            if (piece === 'P' && (newRow === 0 || newRow === 7)) {
                this.setState({ upgrade: newPosition })
            }
        } else {
            cancel()
        }
    }



    backTracking = (step) => {
        this.setState({ nowStep: step })
        if (step === 0)
            this.props.dispatch(action.resetChess());
    }

    win = board => {
        if (board.indexOf('WKing') === -1) {
            return ('Black win !')
        }
        if (board.indexOf('BKing') === -1) {
            return ('White win !')
        }
        return null
    }


    componentDidUpdate() {
        //滾卷軸
        let stepBoard = document.getElementsByClassName('stepBoard')[0]
        stepBoard.scrollTop = stepBoard.scrollHeight
        let color = this.state.nowStep % 2 === 0 ? 'B' : 'W'
        let el = [...document.getElementsByClassName('square')]
        el.forEach(i => {
            
            i.style.cursor = 
            (i.innerHTML && i.innerHTML[0] === color) || i.style.borderColor === 'rgb(255, 0, 0)'
            ? 'pointer'
            : 'default'
            
        })
    }

    componentWillUnmount() {
        this.props.dispatch(action.resetChess());
    }

    render() {
        const { chessState, dispatch } = this.props;
        let { history } = chessState;
        let { nowStep, upgrade } = this.state
        let color = nowStep % 2 === 0 ? 'B' : 'W'
        let col = true;
        let win = this.win(history[nowStep]) ? this.win(history[nowStep]) : nowStep % 2 === 0 ? 'Black turn' : 'White turn'
        let cpos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let rpos = ['1', '2', '3', '4', '5', '6', '7', '8']

        const replace = () => {
            let upgradeValue = document.getElementById('upgrade').value
            history[nowStep][upgrade] = history[nowStep][upgrade][0] + upgradeValue
            dispatch(action.upgradeChess(history))
            this.setState({ upgrade: null })
        }


        return (
            <div className="chessContainer">
                <div className="board">
                    {history[nowStep].map((item, index) => {
                        if (index % 8 === 0) {
                            col = !col
                        }
                        let url = item ? require(`../../img/chess/${item}.jpg`) : null;
                        let style = {
                            backgroundColor: index % 2 === (col ? 0 : 1) ? '#FFCE9E' : '#D18B47',
                            cursor: (item && item[0] === color && !this.win(history[nowStep])) ? 'pointer' : 'default',
                            backgroundImage: `url(${url})`
                        }
                        return (
                            <div className='square'
                                key={index}
                                style={style}
                                onClick={() => {
                                    if (!this.win(history[nowStep]))
                                        this.state.selected
                                            ? this.movePiece(index)
                                            : this.selectPiece(index)
                                }}
                            >{item}</div>
                        )
                    })}
                    <ul className="colPosition">
                        {cpos.map((item, index) =>
                            <li
                                className="cpos"
                                key={index}
                            >{item}</li>
                        )}
                    </ul>
                    <ul className="rowPosition">
                        {rpos.reverse().map((item, index) =>
                            <li
                                className="rpos"
                                key={index}
                            >{item}</li>
                        )}
                    </ul>
                </div>
                <div className="note">
                    <h2>{win}</h2>
                    <ul className="stepBoard">
                        {history.map((item, index) => {
                            return (<li className="step"
                                key={item}
                                onClick={() => this.backTracking(index)}
                                style={{
                                    border: nowStep === index && index !== 0 ? '1px solid #fa0' : 'none'
                                }}
                            >{index === 0 ? "Restart" : `step: ${index}`}
                            </li>)
                        })}
                    </ul>
                </div>
                <div
                    className="modal"
                    style={{
                        display: upgrade ? 'block' : 'none'
                    }}
                >
                    <div className="modalBox">
                        <p>Upgrade</p>
                        <select name="upgrade" id="upgrade" >
                            <option value="Q">Queen</option>
                            <option value="B">Bishop</option>
                            <option value="K">Knight</option>
                            <option value="R">Rook</option>
                        </select>
                        <div
                            className="ConfirmBtn"
                            onClick={() => replace()}
                        >Confirm</div>
                    </div>

                </div>
            </div>


        )
    }
}

class Chess extends React.Component {

    render() {
        const { chessState, dispatch } = this.props;
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


import React from 'react';
import './snake.css'
import { connect } from 'react-redux';
import * as action from '../../action/index'

const SnakeDot = props => {
    const [x, y] = props.dot
    let style = {
        top: y + '%',
        left: x + '%'
    }
    return (
        <div
            className="snakeDot"
            style={style}
        >
        </div>)
}

class Snake extends React.Component {
    state = {
        direction: 'Right',
        status: 'Start',
        food: '',
        time: 200
    }

    nextPosition([x, y], direction) {
        switch (direction) {
            case 'Right':
                x += 2
                break;
            case 'Left':
                x -= 2
                break;
            case 'Up':
                y -= 2
                break;
            case 'Down':
                y += 2
                break;
            default:
        }
        return [x, y]
    }

    hit([x, y]) {
        const { snake } = this.props.snakeState
        return snake.filter(i => i[0] === x && i[1] === y)
    }

    keyDown(e) {
        const { snake } = this.props.snakeState
        let code = e.keyCode
        let { direction, status } = this.state
        let reverse = code < 39 ? code + 2 : code - 2
        let Direction = (code) => {
            switch (code) {
                case 37:
                    return 'Left'
                case 38:
                    return 'Up'
                case 39:
                    return 'Right'
                case 40:
                    return 'Down'
                default:
                    return direction
            }
        }
        let [x, y] = this.nextPosition(snake[snake.length - 1], Direction(code))
        if (code === 32) {
            this.changeStatus()
        } else if (status === 'Playing' && direction !== Direction(reverse) && this.hit([x, y]).length === 0) {
            this.setState({ direction: Direction(code) })
        }
    }

    setFood() {
        let x = Math.floor(Math.random() * 49) * 2
        let y = Math.floor(Math.random() * 49) * 2
        let food = [x, y]
        let { time } = this.state
        this.setState({
            food,
            time: time * 0.9
        })
    }

    changeStatus() {
        const { status } = this.state
        const { dispatch } = this.props
        if (status === 'Start') {
            this.setState({ status: 'Playing' })
        } else if (status === 'Playing') {
            this.setState({ status: 'Pause' })
        } else if (status === 'Pause') {
            this.setState({ status: 'Playing' })
        } else if (status === 'Game Over') {
            this.setFood()
            this.setState({
                status: 'Playing',
                direction: 'Right',
                time: 200
            })
            dispatch(action.resetSnake())
        }
    }

    move() {
        const { status, food, time, direction } = this.state
        const { snake } = this.props.snakeState
        this.moving = window.setTimeout(() => this.move(), time);
        if (status === 'Playing') {
            const { dispatch } = this.props
            let [x, y] = this.nextPosition(snake[snake.length - 1], direction)
            if (x < 0 || x > 98 || y < 0 || y > 98 || this.hit([x, y])[0]) {
                this.setState({ status: 'Game Over' })
            } else {
                if (food[0] === x && food[1] === y) {
                    this.setFood()
                    dispatch(action.addSnake([x, y]))
                    this.setState({
                        time: time * 0.9
                    })
                    return
                }
                dispatch(action.moveSnake([x, y]))
            }
        }
    }

    clear() {
        clearTimeout(this.moving)
    }

    componentDidMount() {
        window.onkeydown = (e) => {
            e.preventDefault()
            this.keyDown(e)
        }
        this.setFood()
        this.clear()
        this.move()
    }

    componentWillUnmount() {
        window.onkeydown = ''
        this.clear()
    }
    render() {
        const { snake } = this.props.snakeState
        const { status, food } = this.state
        return (
            <div className="snakeContain">
                <h1>Snake</h1>
                <div className="snakeBoard">
                    <div
                        className="snakeGame"
                    >
                        {snake.map((dot, i) =>
                            <SnakeDot dot={dot} key={i} />
                        )}
                        <div className='foodDot' style={{ top: food[1] + '%', left: food[0] + '%' }}></div>
                    </div>
                    <div className="snakeControl">
                        <h2>{
                            status === 'Start'
                                ? 'Press Start'
                                : status === 'Game Over'
                                    ? status + ' Score : ' + (snake.length - 2)
                                    : 'Score : ' + (snake.length - 2)}</h2>
                        <div
                            className="startBtn"
                            onClick={() => this.changeStatus()}
                        > {status === 'Start' ? status : status !== 'Pause' ? status === 'Game Over' ? 'Restart ' : 'Pause' : 'Continue'}
                        </div>
                        <p>Press the space bar to start or stop.</p>
                    </div>
                </div>
            </div>)
    }
}

const mapStateToProps = state =>
    ({
        snakeState: state.snakeAction
    })

export default connect(
    mapStateToProps
)(Snake);
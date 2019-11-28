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
    }
    keyDown(e) {
        let code = e.keyCode
        let { direction } = this.state
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
        if (code === 32) {
            this.changeStatus()
            return
        }
        if (this.state.status === 'Playing')
            this.setState({ direction: Direction(code) })
    }

    setFood() {
        let x = Math.floor(Math.random() * 49) * 2
        let y = Math.floor(Math.random() * 49) * 2
        let food = [x, y]
        console.log(food)
        this.setState({ food: food })
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
            this.setState({
                status: 'Playing',
                direction: 'Right'
            })
            dispatch(action.resetSnake())
        }
    }

    move() {
        const { status, food, direction } = this.state
        const { snake } = this.props.snakeState
        let moving = window.setTimeout(() => {
            this.move()
        }, 200 - snake.length * 10);
        
        if (status === 'Playing') {
            const { dispatch } = this.props
            let [x, y] = this.props.snakeState.snake[this.props.snakeState.snake.length - 1]
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
            }
            if (x < 0 || x > 98 || y < 0 || y > 98) {
                this.setState({ status: 'Game Over' })
            } else {
                if (food[0] == x && food[1] == y) {
                    this.setFood()
                    dispatch(action.addSnake([x, y]))
                }
                dispatch(action.moveSnake([x, y]))
            }
        }
    }
    
    clear() {
        let moving;
        clearTimeout(moving)
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

    componentDidUpdate() {
        const { status, food } = this.state

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
                        <h2>{status === 'start' ? 'Press Start' : status === 'Game Over' ? status : 'Score : ' + (snake.length - 2)}</h2>
                        <div
                            className="startBtn"
                            onClick={() => this.changeStatus()}
                        > {status === 'Start' ? status : status !== 'Pause' ? status === 'Game Over' ? 'Restart ' : 'Pause' : 'Continue'}
                        </div>
                        <p>Press "Space" to start or stop.</p>
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
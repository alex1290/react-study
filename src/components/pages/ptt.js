import React from 'react';
import './ptt.css'
import { type } from 'os';
class Ptt extends React.Component {
    state = {
        style: null,
        board: null,
        page: null,
        error: null,
        item: null,
        isLoaded: false,
        filter: null
    }

    DEBUG = true;

    crawler() {
        const { style, board, page, filter } = this.state
        const url = this.DEBUG
            ? 'http://localhost:3001'
            : 'http://ec2-18-176-44-139.ap-northeast-1.compute.amazonaws.com:3001/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                style,
                board,
                page,
                filter
            })
        })
            .then(res => {
                return res.json()
            })
            .then(
                (success) => {
                    if (success.error) {
                        this.setState({
                            isLoaded: false,
                            board: null,
                            page: null,
                            item: success
                        });
                        return
                    }
                    this.setState({
                        isLoaded: true,
                        item: success
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        board: null,
                        page: null,
                        error: error.toString()
                    });
                }
            )
    }

    toIndex() {
        this.setState({
            board: null,
            page: null,
            index: null
        })
        window.location.href = window.location.origin + '/ptt'
    }

    changePage(e) {
        // e.preventDefault()
        // window.location.href = e.target.href
    }

    pttPromise(setState, next = () => { }) {
        let promise = new Promise((res, rej) => {
            setState();
            res();
        })
            .then(
                res => {
                    this.crawler()
                    next();
                }
            )
        return promise
    }

    chooseBoard() {
        let board = document.getElementsByClassName('chooseBoardInput')[0].value
        let setState = () => {
            this.setState({
                board,
                page: 'index',
                isLoaded: false,
                error: null,
                item: null
            })
        }
        let next = () => board = '';
        this.pttPromise(
            setState,
            next
        )
    }

    componentDidMount() {
        document.getElementsByClassName('container')[0].style.backgroundColor = '#000';
        const url = window.location
        const str = url.toString().split('/')
        if (str[str.length - 1] !== 'ptt') {
            const board = str[str.length - 2]
            const page = str[str.length - 1].replace('.html', '')
            let setState = () => {
                this.setState({
                    board,
                    page,
                    isLoaded: false,
                    item: null
                })
            }
            this.pttPromise(setState)
        }
    }

    componentWillUnmount() {
        document.getElementsByClassName('container')[0].style.backgroundColor = '#FFF';
    }

    render() {
        const { board, error, item, isLoaded } = this.state;
        let msg = (item && item.error) ? item.error : ''
        console.log(msg);

        if (!board || error || msg !== '') {
            return (
                <div className="pttBoard">
                    <h1>FAKE PTT</h1>
                    <div className="chooseBoard">
                        <h2 className="chooseBoardTitle">輸入看板</h2>
                        <div>
                            <input className="chooseBoardInput" type="text" />
                            <div
                                className="chooseBoardBtn pttBtn"
                                onClick={() => this.chooseBoard()}
                            >送出</div>
                        </div>
                        <div className="chooseBoardMsg">{error}{msg}</div>
                    </div>
                </div>
            )
        } else if (!isLoaded) {
            return <div style={{ color: 'white' }} className="pttBoard">Loading...</div>
        } else {
            return <div className="pttBoard">
                <h1>FAKE PTT > 看板 {board}</h1>
                <div className="pttBtnBox">
                    <div>
                        <a
                            className="toIndexBtn pttBtn"
                            onClick={() => this.toIndex()}
                        >回到看板列表</a>
                    </div>
                    <div className="pageBtnBox">
                        {item.page.map((i, n) => {
                            let link = `${window.location.origin}/${i.link}`
                            if (i.link === '') {
                                return (
                                    <a
                                        className='pttBtn disabled'
                                        key={n}
                                    >
                                        {i.text}
                                    </a>
                                )
                            } else {
                                return (
                                    <a
                                        href={link}
                                        className='pttBtn'
                                        key={n}
                                        onClick={(e) => this.changePage(e)}
                                    >
                                        {i.text}
                                    </a>
                                )
                            }
                        })}
                    </div>
                </div>
                <ul>
                    {item.list.map((i, n) => {
                        let color = (num) => {
                            if (num[0] === 'X') {
                                return '#666'
                            }
                            if (num === '爆') {
                                return '#f66'
                            } else if (num > 20) {
                                return 'yellow'
                            } else {
                                return '#6f6'
                            }
                        }
                        if (i.title === 'greyBlock') {
                            return <div className={i.title} key={n}></div>
                        } else if (i.title.indexOf('(本文已被刪除)') !== -1) {
                            return (
                                <li className="pttItem" key={n}>
                                    <h3 className="pttTitle">
                                        <div className="pttPush" style={{ color: color(i.push) }}>{i.push}</div>
                                        {i.title}
                                    </h3>
                                    <div className="pttMeta">
                                        <p className="pttAuthor">{i.author}</p>
                                        <p className="pttDate">{i.date}</p>
                                    </div>
                                </li>
                            )
                        } else {
                            return (
                                <li className="pttItem" key={n}>
                                    <h3 className="pttTitle">
                                        <div className="pttPush" style={{ color: color(i.push) }}>{i.push}</div>
                                        <a className="pttLink" href={i.link}>{i.title}</a>
                                    </h3>
                                    <div className="pttMeta">
                                        <p className="pttAuthor">{i.author}</p>
                                        <p className="pttDate">{i.date}</p>
                                    </div>
                                </li>
                            )
                        }
                    }
                    )}
                </ul>

            </div >
        }
    }
}

export default Ptt;
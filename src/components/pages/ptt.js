import React from 'react';
import './ptt.css'

class Ptt extends React.Component {
    state = {
        style: null,
        board: null,
        page: null,
        error: null,
        item: null,
        url: null,
        isLoaded: false,
        filter: null
    }

    DEBUG = true;

    crawler() {
        const { style, board, page, filter, url } = this.state
        const server = this.DEBUG
            ? 'http://localhost:3001'
            : 'http://ec2-18-176-44-139.ap-northeast-1.compute.amazonaws.com:3001/'
        fetch(server, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                style,
                board,
                page,
                filter,
                url
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

    toIndex() {
        this.setState({
            board: null,
            page: null,
            index: null,
            item: null,
            url: null,
            style: null
        })
    }

    changePage(link) {
        const str = link.toString().split('/')
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

    enterArticle(link) {
        const str = link.toString().split('/')
        const url = str[str.length - 1].replace('.html', '')
        let setState = () => {
            this.setState({
                style: 'article',
                url,
                isLoaded: false,
                item: null
            })
        }
        this.pttPromise(setState)
    }

    chooseBoard() {
        let board = document.getElementsByClassName('chooseBoardInput')[0].value
        let setState = () => {
            this.setState({
                board,
                page: 'index',
                isLoaded: false,
                error: null,
                item: null,
                url: null,
                style: 'board'
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
    }

    componentWillUnmount() {
        document.getElementsByClassName('container')[0].style.backgroundColor = '#FFF';
    }

    render() {
        // if (this.DEBUG) {
        //     if (t.toString().indexOf('/ptt/bbs/Test/M.1203456601.A.38F.html') === -1)
        //         window.location.href = window.location.origin + '/ptt/bbs/Test/M.1203456601.A.38F.html'
        // }
        const { board, error, item, isLoaded, style } = this.state;
        let msg = (item && item.error) ? item.error : ''
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
        } else if (style === 'board') {
            return (
                <div className="pttBoard">
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
                                let event = i.link
                                    ? () => this.changePage(i.link)
                                    : () => { }
                                let btnClass = i.link ? 'pttBtn' : 'pttBtn disabled'
                                return (
                                    <a
                                        className={btnClass}
                                        key={n}
                                        onClick={event}
                                    >
                                        {i.text}
                                    </a>
                                )
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
                                            <a className="pttLink" onClick={() => this.enterArticle(i.link)}>{i.title}</a>
                                        </h3>
                                        <div className="pttMeta">
                                            <p className="pttAuthor">{i.author}</p>
                                            <p className="pttDate">{i.date}</p>
                                        </div>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>)
        } else if (style === 'article') {
            return <h1>hi</h1>
        }
    }
}

export default Ptt;
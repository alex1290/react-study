import React from 'react';
import './ptt.css'

// window.onpopstate = function (e) {
//     e.preventDefault()
//     console.log(e);

// }

class Ptt extends React.Component {
    state = {
        style: null,
        board: null,
        page: null,
        url: null,
        filter: null,
        item: null,
        isLoaded: false,
        error: null,
        history: []
    }

    DEBUG = false;

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

    saveHistory() {
        const { style, board, page, filter, url, history } = this.state;
        const newHistory = [...history, { style, board, page, filter, url }]
        return newHistory
    }

    toIndex() {
        this.setState({
            board: null,
            page: null,
            index: null,
            item: null,
            url: null,
            style: null,
            history: this.saveHistory()
        })
    }

    toList() {
        let setState = () => {
            this.setState({
                style: "board",
                isLoaded: false,
                url: null,
                history: this.saveHistory()
            })
        }
        this.pttPromise(setState)
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
                item: null,
                history: this.saveHistory()
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
                item: null,
                history: this.saveHistory()
            })
        }
        this.pttPromise(setState)
    }

    chooseBoard() {
        let board = document.getElementsByClassName('chooseBoardInput')[0].value
        let setState = () => {
            this.setState({
                style: 'board',
                board,
                page: 'index',
                isLoaded: false,
                error: null,
                item: null,
                url: null,
                history: this.saveHistory()
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

    componentDidUpdate() {
        const { board, url, page, isLoaded, style } = this.state;
        let obj = {}
        obj[board] = page
        let dir = board
            ? url
                ? "/" + board + "/" + url
                : "/" + board + "/" + page
            : ''
        window.history.replaceState(obj, "yaa", "/ptt" + dir)
    }

    componentWillUnmount() {
        document.getElementsByClassName('container')[0].style.backgroundColor = '#FFF';
    }

    render() {
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
            const { authorInfo, push, content, polling } = this.state.item
            const contentEnd = content.mainContent.indexOf('--')
            return (
                <div className="pttBoard">
                    <h1>FAKE PTT > 看板 {board}</h1>
                    <div>
                        <a
                            className="toIndexBtn pttBtn"
                            onClick={() => this.toIndex()}
                        >回到看板列表</a>
                        <a
                            className="toListBtn pttBtn"
                            onClick={() => this.toList()}
                        >回到文章列表</a>
                    </div>
                    <div className="pttArticle">
                        <div className="articleAuth">
                            {authorInfo.map((i, n) => {
                                let infoClass = i.tag === '看板' ? "articleAuthBoard" : "articleAuthInfo"
                                return (
                                    <div key={n} className={infoClass}>
                                        <div className="articleAuthTag">
                                            {i.tag}
                                        </div>
                                        <div className="articleAuthValue">
                                            {i.value}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="articleContent">
                            <p>
                                {content.mainContent
                                    .filter((i, n) => n < contentEnd)
                                    .map((i, n) => {
                                        return <span key={n}>{i}<br></br></span>
                                    })}
                                <br />
                                <p>--</p>
                            </p>
                            <div className="authIp">
                                {content.authIp}
                            </div>
                            <div className="articleUrlText">
                                {content.articleUrlText.replace(content.articleUrl + "\n", "")}
                                <a
                                    className="articleUrl"
                                    href={content.articleUrl}>{content.articleUrl}</a>
                            </div>
                        </div>
                        <div className="articlePushBox">
                            {push.map((i, n) => {
                                let tagColor = i.pushTag.indexOf('推') !== -1 ? '#fff' : '#f66'
                                return (
                                    <div className="push" key={n}>
                                        <span className="pushTag"
                                            style={{
                                                color: tagColor
                                            }}
                                        >{i.pushTag}</span>
                                        <span className="pushUserId">{i.pushUserId}</span>
                                        <span className="pushContent">{i.pushContent}</span>
                                        <span className="pushTime">{i.pushTime}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="articlePolling">推文自動更新已關閉</div>
                    </div>
                </div>
            )
        }
    }
}

export default Ptt;
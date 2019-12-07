import React from 'react';
import './ptt.css'
class Ptt extends React.Component {
    state = {
        board:null,
        page:null,
        error: null,
        item: null,
        isLoaded: false,
        filter: null
    }

    DEBUG = true;

    crawler() {
        const url = this.DEBUG
            ? 'http://localhost:3001'
            : 'ec2-18-176-44-139.ap-northeast-1.compute.amazonaws.com:3001/'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'lovef1232e@hexschool.com',
                password: '12345678'
            })
        })
            .then(res => res.json())
            .then(
                (success) => {
                    this.setState({
                        isLoaded: true,
                        item: success
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        document.getElementsByClassName('container')[0].style.backgroundColor = '#000';
        this.crawler()
    }

    componentWillUnmount() {
        document.getElementsByClassName('container')[0].style.backgroundColor = '#FFF';
    }
    render() {
        const { error, item, isLoaded } = this.state;
        if (error) {
            return <div>{error}</div>
        } else if (!isLoaded) {
            return <div style={{ color: 'white' }}>Loading...</div>
        } else {
            return <div className="pttBoard">
                <h1>FAKE PTT</h1>
                <ul>
                    {item.map((i, n) => {
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

            </div>
        }
    }
}

export default Ptt
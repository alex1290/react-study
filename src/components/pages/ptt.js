import React from 'react';
import './ptt.css'
class Ptt extends React.Component {
    state = {
        error: null,
        item: null,
        isLoaded: false,
        filter: null
    }

    DEBUG = true;

    crawler() {
        const url = this.DEBUG
            ? 'http://localhost:3001'
            : 'http://ec2-54-92-97-64.ap-northeast-1.compute.amazonaws.com:3001/'
        fetch(url)
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
                    {this.state.item.map((i,n,arr) => {
                        let color = (num) => {
                            if (num > 20) {
                                return 'yellow'
                            } else {
                                return '#6f6'
                            }
                        }
                        let pushColor = {
                            color: color(i.push)
                        }
                        console.log(pushColor);
                        let grey = arr.length - 3 === n ? 'greyBlock' : ''
                        return (
                            <li className="pttItem">
                            <div className={grey}></div>
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
                    )}
                </ul>

            </div>
        }
    }
}

export default Ptt
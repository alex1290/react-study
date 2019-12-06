import React from 'react';

class Ptt extends React.Component {

    crawler() {
        fetch('http://localhost:3001/pttinfo')
            .then(res => res.json())
            .then(
                success => {
                    console.log(success);
                },
                fail => {
                    console.log(fail);
                }
            )
    }

    componentDidMount() {
        this.crawler()
    }

    render() {
        return <div>
            <h1>PTT</h1>
        </div>
    }
}

export default Ptt
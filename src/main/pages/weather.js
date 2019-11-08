import React from 'react';

class Data extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="dataSpace">
                {this.props.location.map(
                    (item, i) => (
                        <li className="dataItem" key={i}>{item.locationName}</li>
                    )
                )}
            </ul>
        )
    }
}


class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            item: null,
            isLoaded: false
        }
    }
    componentDidMount() {
        fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-7C61A12A-80BC-4FB7-BBF6-66AF45D1093D')
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
    render() {
        const { error, item, isLoaded } = this.state;
        if (error) {
            return <div>{error}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            let { location } = item.records;
            return (
                <div>
                    <h1>weather API</h1>
                    <Data location={location} />

                </div>

            )
        }
    }
}

export default Weather;
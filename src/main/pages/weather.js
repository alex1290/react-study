import React from 'react';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            item: [],
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
        return <h1>weather API {this.isLoaded}</h1>
    }
}

export default Weather;
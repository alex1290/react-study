import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.item.weatherElement
        }
    }
    render() {
        let { item } = this.props;
        console.log(this.props)
        return (
            <li className="dataItem">
                <h3>{item.locationName}</h3>
                <p></p>
            </li>
        )
    }
}

class Data extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let {filter,location} = this.props;
        if(filter){
            return (
                // location.filter((item)=>(item.locationName===filter));
                <ul className="dataSpace">
                    {location.map(
                        (item, i) => (
                            <Card key={i} item={item} />
                        )
                    )}
                </ul>
            )
        }else{
            return (
                <ul className="dataSpace">
                    {this.props.location.map(
                        (item, i) => (
                            <Card key={i} item={item} />
                        )
                    )}
                </ul>
            )
        }
        
    }
}


class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            item: null,
            isLoaded: false,
            filter: null
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
    filter(e) {
        this.setState({
            filter: e.target.value
        })
    }
    render() {
        const { error, item, isLoaded } = this.state;
        if (error) {
            return <div>{error}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            let { location } = item.records;
            console.log(location)
            return (
                <div>
                    <h1>weather API</h1>
                    <select name="filterBar" id="filterBar" defaultValue='' onChange={(e) => this.filter(e)}>
                        <option value='' disabled>--請選擇--</option>
                        {location.map((item, i) => (
                            <option key={i} value={item.locationName}>{item.locationName}</option>
                        ))}
                    </select>
                    <Data location={location} filter={this.state.filter} />
                </div>

            )
        }
    }
}

export default Weather;
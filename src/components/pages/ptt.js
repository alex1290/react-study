import React from 'react';

class Ptt extends React.Component {

    crawler() {
        const request = require("request");
        const cheerio = require("cheerio");
        const fs = require("fs");
        const ptt = () => {
            request({
                url: 'https://www.ptt.cc/bbs/movie/index.html',
                method: 'GET'
            }, function (error, response, body) {
                // console.log(error);
                
                if (error || !body) {
                    return;
                }
                const $ = cheerio.load(body);
                const result = [];
                console.log($);
                
            })
        }
        ptt()
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
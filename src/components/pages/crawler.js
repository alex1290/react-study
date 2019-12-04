const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const ptt = () => {
    request({
        url: 'https://www.ptt.cc/bbs/movie/index.html',
        method: 'GET'
    }, function (error, response, body) {
        if (error || !body) {
            return;
        }
        const $ = cheerio.load(body);
        const result = [];
        const table_tr = $(".r-ent");
        
        for (let i = 0; i < table_tr.length; i++) { 
            const table_td = table_tr.eq(i);
            const title = table_td.find('.title').text();
            console.log(time);
        }
    })
}
ptt()
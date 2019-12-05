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
            const push = table_td.find('.nrec').text();
            const author = table_td.find('.author').text();
            const date = table_td.find('.date').text();

            const link = title.indexOf('(本文已被刪除)') === -1
                ? table_td.find('a').attr('href')
                : '';
            const item = { title, link, push, author, date }
            result.push(item)
        }
        console.log(result);
        fs.writeFileSync("result.json", JSON.stringify(result));
    })
}
ptt()
setInterval(ptt,1000);
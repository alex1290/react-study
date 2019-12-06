const express = require('express');
const bodyParser = require('body-parser')
const request = require("request");
const cheerio = require("cheerio");
const cors = require("cors");
const corsOptions = {
  origin:'*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
};
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors(corsOptions))

app.get('/', function (req, res) {
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
        const title = table_td.find('.title').text().replace('\n\t\t\t\n\t\t\t\t','').replace('\n\t\t\t\n\t\t\t','');
        const push = table_td.find('.nrec').text();
        const author = table_td.find('.author').text();
        const date = table_td.find('.date').text();

        const link = title.indexOf('(本文已被刪除)') === -1
          ? table_td.find('a').attr('href')
          : '';
        const item = { title, link, push, author, date }
        result.push(item)
      }
      res.send(result);
    })
  }
  ptt()
  // res.send('hello world');
  // setInterval(ptt, 1000);
})

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log(host, port)

})
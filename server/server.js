const express = require('express');
const bodyParser = require('body-parser')
const request = require("request");
const cheerio = require("cheerio");
const cors = require("cors");
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
};
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors(corsOptions))

// app.post('/test', function (req, res) {
//   

// })

const ptt = (res, url, board = 'sex') => {
  // request.cookie({name: 'over18',value: '1'})
  request({
    url,
    method: 'GET',
    headers: { name: 'over18', value: '1' }
  }, function (error, response, body) {
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body);
    const result = [];
    const table_tr = $(".r-ent");
    const greyBlock = $(".r-list-sep")[0]
    const greyBlockNode = Math.floor([...greyBlock.parentNode.children].indexOf(greyBlock) / 2 - 1)
    for (let i = 0; i < table_tr.length; i++) {
      if (greyBlockNode === i) {
        result.push({
          title: 'greyBlock'
        })
      }
      const table_td = table_tr.eq(i);
      const title = table_td.find('.title').text().replace('\n\t\t\t\n\t\t\t\t', '').replace('\n\t\t\t\n\t\t\t', '');
      const push = table_td.find('.nrec').text();
      const author = table_td.find('.author').text();
      const date = table_td.find('.date').text();
      const link = title.indexOf('(本文已被刪除)') === -1
        ? table_td.find('a').attr('href').replace('bbs', 'ptt')
        : '';
      const item = { title, link, push, author, date }
      result.push(item)
    }
    res.send(result);
  })
}

app.post('/', function (req, res) {
  const { style, board, page, filter } = JSON.parse(JSON.stringify(req.body))
  console.log(style, board, page, filter);

  const url = 'https://www.ptt.cc/bbs/' + board + '/' + page + '.html'
  ptt(res, url)
})

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log(host, port)

})
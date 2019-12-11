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
app.use(bodyParser.json());
//cors問題
app.use(cors(corsOptions))


const port = 3001;


const ptt = (res, url, board) => {
  //瀏覽18禁加入cookie
  const cookie = request.cookie('over18=1; expires=' + new Date(new Date().getTime() + 86409000))
  request({
    url,
    method: 'GET',
    headers: {
      'Cookie': cookie
    }
  }, function (error, response, body) {
    //檢測有無錯誤或無內容
    if (error || !body) {
      return;
    }
    const $ = cheerio.load(body);

    //抓取是否有錯誤訊息
    const errormsg = $(".bbs-screen.bbs-content").text()
    if (errormsg) {
      res.send({ error: errormsg })
      return
    }

    //抓取頁碼
    const page = [];
    const pageBtn = $(".btn.wide")
    for (let i = 0; i < pageBtn.length; i++) {
      const btn = pageBtn.eq(i);
      const link = !btn.hasClass('disabled') ? 'ptt' + btn.attr('href') : ''
      const text = btn.text()
      page.push({ link, text })
    }

    //抓取標題&作者...等等
    const list = [];
    const table_tr = $(".r-ent");
    //抓取公告上方灰色方塊
    const greyBlock = $(".r-list-sep")[0]
    const greyBlockNode = greyBlock ? Math.floor([...greyBlock.parentNode.children].indexOf(greyBlock) / 2 - 1) : ''

    for (let i = 0; i < table_tr.length; i++) {
      if (greyBlockNode === i) {
        list.push({
          title: 'greyBlock'
        })
      }
      const table_td = table_tr.eq(i);
      const title = table_td.find('.title').text().replace('\n\t\t\t\n\t\t\t\t', '').replace('\n\t\t\t\n\t\t\t', '');
      const push = table_td.find('.nrec').text();
      const author = table_td.find('.author').text();
      const date = table_td.find('.date').text();
      const link = title.indexOf('(本文已被刪除)') === -1
        ? 'ptt' + table_td.find('a').attr('href')
        : '';
      const item = { title, link, push, author, date }
      list.push(item)
    }
    res.send({ list, page });
  })
}

app.post('/', function (req, res) {
  const { style, board, page, filter } = JSON.parse(JSON.stringify(req.body))
  console.log(style, board, page, filter);
  if (board === '') {
    res.send({ error: 'Please type board name' })
    return
  }
  const url = 'https://www.ptt.cc/bbs/' + board + '/' + page + '.html';
  ptt(res, url);
})

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log(host, port)

})
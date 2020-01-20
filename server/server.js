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


const ptt = (res, url, style) => {
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
    const tp = $('#topbar-container')
    const sreenText = $(".bbs-screen.bbs-content").text()
    //抓取是否有錯誤訊息
    if (tp.text() === '') {
      res.send({ text: sreenText })
      return
    }

    //瀏覽看板內容
    if (style === 'board') {
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
      const tableTr = $(".r-ent");
      //抓取公告上方灰色方塊
      const greyBlockNode = $(".r-list-sep").index() - 1

      for (let i = 0; i < tableTr.length; i++) {
        if (greyBlockNode === i) {
          list.push({
            title: 'greyBlock'
          })
        }
        const tableTd = tableTr.eq(i);
        const title = tableTd.find('.title').text().replace('\n\t\t\t\n\t\t\t\t', '').replace('\n\t\t\t\n\t\t\t', '');
        const push = tableTd.find('.nrec').text();
        const author = tableTd.find('.author').text();
        const date = tableTd.find('.date').text();
        const link = title.indexOf('(本文已被刪除)') === -1
          ? 'ptt' + tableTd.find('a').attr('href')
          : '';
        const item = { title, link, push, author, date }
        list.push(item)
      }
      res.send({ list, page });
    } else if (style === 'article') {
      //看板資訊&作者資訊
      const authorInfo = []
      const tag = $(".article-meta-tag")
      const value = $(".article-meta-value")
      for (let i = 0; i < tag.length; i++) {
        authorInfo.push({
          tag: tag.eq(i).text(),
          value: value.eq(i).text()
        })
      }

      //推文
      const push = []
      const pushTr = $(".push")
      for (let i = 0; i < pushTr.length; i++) {
        const pushTd = pushTr.eq(i)
        const pushRe = pushTd.text()
        const pushTag = pushTd.find(".push-tag").text()
        const pushUserId = pushTd.find(".push-userid").text()
        const pushContent = pushTd.find(".push-content").text()
        const pushTime = pushTd.find(".push-ipdatetime").text()
        push.push({ pushTag, pushUserId, pushContent, pushTime, pushRe })
      }

      //內文

      const f2 = $(".f2")
      const authIp = f2.eq(0).text()
      const articleUrlText = f2.eq(1).text()
      const articleUrl = f2.eq(1).find("a").text()
      const main = $("#main-content")
      const mainContent = main.eq(0).text().toString().split("\n")
        .filter((i, n, arr) => n !== 0)

      const content = { mainContent, authIp, articleUrlText, articleUrl }

      //推文更新
      const polling = $("#article-polling")

      const item = { authorInfo, push, content, polling: "123" }

      res.send(item)


    }

  })
}

app.get('/get:num', (req, res) => {
  const num = req.param.num
  switch (num) {
    case ("1"):
      res.send("1 OK")
      break
    case ("2"):
      res.send("2 OK")
      break
    default:
      res.send("No Requset")
  }
})

app.post('/', function (req, res) {
  const { style, board, page, filter, url } = JSON.parse(JSON.stringify(req.body))
  console.log(style, board, page, filter, url);
  if (board === '') {
    res.send({ error: 'Please type board name' })
    return
  }

  const pttUrl = !url
    ? 'https://www.ptt.cc/bbs/' + board + '/' + page + '.html'
    : 'https://www.ptt.cc/bbs/' + board + '/' + url + '.html'
  ptt(res, pttUrl, style);
})

const server = app.listen(port, function () {

  let host = server.address().address
  let port = server.address().port

  console.log(host, port)

})
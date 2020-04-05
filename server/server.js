
const express = require('express');
const bodyParser = require('body-parser');

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

const ptt = require('./crawler');
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

const io = require('socket.io')(server)

io.on('connection', socket => {
  //經過連線後在 console 中印出訊息
  console.log('success connect!')
  //監聽透過 connection 傳進來的事件
  socket.on('getMessage', message => {
    //回傳 message 給發送訊息的 Client
    socket.emit('getMessage', message)
  })
})
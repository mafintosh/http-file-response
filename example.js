const http = require('http')
const onfile = require('./')

http.createServer(function (req, res) {
  onfile('index.js', req, res)
}).listen(8080)

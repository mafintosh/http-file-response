const fs = require('fs')
const mime = require('mime')
const pump = require('pump')
const range = require('range-parser')

module.exports = function (name, req, res, opts) {
  const xfs = (opts && opts.fs) || fs

  xfs.stat(name, function (err, st) {
    if (err) {
      res.statusCode = 404
      res.end()
      return
    }

    const r = req.headers.range && range(st.size, req.headers.range)[0]

    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Type', (opts && opts.mime) || mime.getType(name))

    if (r) {
      res.statusCode = 206
      res.setHeader('Content-Range', 'bytes ' + r.start + '-' + r.end + '/' + st.size)
      res.setHeader('Content-Length', r.end - r.start + 1)
    } else {
      res.setHeader('Content-Length', st.size)
    }

    if (req.method === 'HEAD') return res.end()
    pump(xfs.createReadStream(name, r), res)
  })
}

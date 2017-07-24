var jwt = require('jsonwebtoken')
var config = require('../config')
var secret = config.secretClient

module.exports = (req, res, next) => {
  let { token, username } = req.cookies
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (!err && decoded.username === username) {
        req.decoded = decoded
        next()
      } else {
        res.cookie('username', '', { maxAge: 0 })
        return res.json({
          code: -400,
          message: '登录验证失败',
          data: ''
        })
      }
    })
  } else {
    return res.json({
      code: -400,
      message: '请先登录',
      data: ''
    })
  }
}

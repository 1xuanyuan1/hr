const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.secretClient
const un = config.username
const pw = config.password

exports.login = (req, res) => {
  let { username, password } = req.body
  if (username === un && password === pw) {
    let rememberMe = 24 * 3600 * 1000
    username = encodeURI(username)
    var token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 * 24 })
    res.cookie('username', username, { maxAge: rememberMe })
    res.cookie('token', token, { maxAge: rememberMe })
    res.json({
      code: 200,
      message: '登录成功',
      data: token
    })
  } else {
    res.json({
      code: -200,
      message: '账号或密码错误'
    })
  }
}

exports.logout = (req, res) => {
  res.cookie('username', '', { maxAge: -1 })
  res.json({
    code: 200,
    message: '退出成功',
    data: ''
  })
}

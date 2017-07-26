var mongoose = require('../mongoose')

var Candidate = mongoose.model('Candidate')

const general = require('./general')
const list = general.list
const item = general.item

exports.list = (req, res) => {
  list(req, res, Candidate, {where: req.body})
}

exports.item = (req, res) => {
  item(req, res, Candidate)
}

exports.setDetail = (req, res) => {
  let { id } = req.query
  let detail = req.body
  Candidate.update({'_id': id}, {$set: {detail}}).exec().then(result => {
    res.json({
      code: 200,
      message: '添加候选人奖励详情成功'
    })
  })
}

exports.insert = (req, res) => {
  var {name, phone, post, source} = req.body
  if (!name || !phone || !post || !source) {
    res.json({
      code: -200,
      message: '请填写完成信息'
    })
  } else {
    return Candidate.createAsync({
      name,
      phone,
      post,
      source
    }).then(result => {
      res.json({
        code: 200,
        message: '添加成功',
        data: result._id
      })
    })
  }
}

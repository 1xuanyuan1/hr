var mongoose = require('../mongoose')

var Interview = mongoose.model('Interview')
var Candidate = mongoose.model('Candidate')

const general = require('./general')
const list = general.list

exports.list = (req, res) => {
  list(req, res, Interview, {where: req.body, populate: {path: 'candidate', select: 'name post -_id'}})
}

exports.eachCount = (req, res) => {
  Interview.aggregate([{$group: {_id: '$status', num: {$sum: 1}}}]).exec().then((result) => {
    res.json({
      code: 200,
      data: result
    })
  })
}

exports.updateStatus = (req, res) => {
  let {id, status} = req.body
  Interview.update({'_id': id}, {$set: {status}}).exec().then(result => {
    res.json({
      code: 200,
      message: '修改成功'
    })
  })
}

exports.insert = (req, res) => {
  let { candidate } = req.body
  if (!candidate) {
    res.json({
      code: -200,
      message: '参数出错'
    })
  }
  Promise.all([
    Interview.createAsync(req.body),
    Candidate.updateAsync({'_id': candidate}, {$set: {invitation: true}})
  ]).then(result => {
    res.json({
      code: 200,
      message: '添加成功',
      data: result[0]._id
    })
  }).catch(e => {
    res.json({
      code: -200,
      message: e
    })
  })
}

var mongoose = require('../mongoose')
var Interview = mongoose.model('Interview')
var Candidate = mongoose.model('Candidate')
var moment = require('moment')

const general = require('./general')
const list = general.list

exports.list = (req, res) => {
  let where = req.body
  list(req, res, Interview, {where, populate: {path: 'candidate', select: 'name post -_id'}})
}

exports.eachCount = (req, res) => {
  let date = {}
  let {startTime, endTime} = req.body
  if (startTime) {
    date.$gte = new Date(startTime)
  }
  if (endTime) {
    date.$lt = new Date(endTime)
  }
  let match = {}
  if (startTime || endTime) {
    match['create_date'] = date
  }
  Interview.aggregate().match(match).group({_id: '$status', num: {$sum: 1}}).exec().then((result) => {
    res.json({
      code: 200,
      data: result
    })
  })
}

exports.updateStatus = (req, res) => {
  let {id, status, evaluation} = req.body
  Interview.update({'_id': id}, {$set: {status, evaluation}}).exec().then(result => {
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

exports.home = (req, res) => {
  let startTime = new Date(moment().format('YYYY-MM-DD'))
  let endTime = new Date(moment().add(1, 'days').format('YYYY-MM-DD'))
  let time = {
    $gte: startTime,
    $lt: endTime
  }
  Promise.all([
    Candidate.find({create_date: time}).countAsync(),
    Candidate.find({create_date: time, invitation: false}).exec(),
    Interview.find({status: 'pending', interview_date: time}).populate({path: 'candidate', select: 'name post -_id'}).exec()
  ]).then(result => {
    res.json({
      code: 200,
      data: {
        allNum: result[0],
        communication: result[1],
        pending: result[2]
      }
    })
  }).catch(e => {
    res.json({
      code: -200,
      message: e
    })
  })
}

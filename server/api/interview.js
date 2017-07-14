var mongoose = require('../mongoose')

var Interview = mongoose.model('Interview')

const general = require('./general')
const insert = general.insert
const list = general.list

exports.list = (req, res) => {
  list(req, res, Interview, req.query)
}

exports.eachCount = (req, res) => {
  Interview.aggregate([{$group: {_id: '$status', num: {$sum: 1}}}]).exec().then((result) => {
    res.json({
      code: 200,
      data: result
    })
  })
}

exports.insert = (req, res) => {
  insert(req, res, Interview)
}

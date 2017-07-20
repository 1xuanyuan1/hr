var mongoose = require('../mongoose')

var CandidateDetail = mongoose.model('CandidateDetail')

const general = require('./general')
const insert = general.insert

const list = general.list

exports.list = (req, res) => {
  list(req, res, CandidateDetail, {where: req.body})
}

exports.insert = (req, res) => {
  insert(req, res, CandidateDetail)
}

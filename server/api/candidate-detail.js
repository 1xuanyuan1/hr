var mongoose = require('../mongoose')

var CandidateDetail = mongoose.model('CandidateDetail')

const general = require('./general')
const insert = general.insert

exports.insert = (req, res) => {
  insert(req, res, CandidateDetail)
}

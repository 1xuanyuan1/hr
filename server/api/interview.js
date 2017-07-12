var mongoose = require('../mongoose')

var Interview = mongoose.model('Interview')

const general = require('./general')
const insert = general.insert

exports.insert = (req, res) => {
  insert(req, res, Interview)
}

var mongoose = require('../mongoose')

var Interview = mongoose.model('Interview')
var Candidate = mongoose.model('Candidate')

exports.info = (req, res) => {
  let {startTime, endTime} = req.query
  let time = {
    $gte: startTime,
    $lt: endTime
  }
  Promise.all([
    Candidate.find({create_date: time}).countAsync(),
    Interview.find({status: 'success', create_date: time}).populate({path: 'candidate', select: 'name post -_id'}).exec(),
    Interview.find({status: 'talent', create_date: time}).populate({path: 'candidate', select: 'name post -_id'}).exec()
  ]).then(result => {
    res.json({
      code: 200,
      data: {
        allNum: result[0],
        success: result[1],
        talent: result[2]
      }
    })
  }).catch(e => {
    res.json({
      code: -200,
      message: e
    })
  })
}

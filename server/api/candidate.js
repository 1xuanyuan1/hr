var mongoose = require('../mongoose')

var Candidate = mongoose.model('Candidate')

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

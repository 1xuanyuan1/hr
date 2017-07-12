var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
/**
 * name: 张三
 * phone: 18906777573
 * post: 前端
 * source: 拉勾
 * invitation: false // 是否已经邀约了
 * create_date: 2017-07-12T02:02:07.514Z // 创建时间
 */
var CandidateSchema = new Schema({
  name: String,
  phone: String,
  post: String,
  source: String,
  invitation: {
    type: Boolean,
    default: false
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

var Candidate = mongoose.model('Candidate', CandidateSchema)
Promise.promisifyAll(Candidate)
Promise.promisifyAll(Candidate.prototype)

module.exports = Candidate

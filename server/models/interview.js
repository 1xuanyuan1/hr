var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

/**
 * candidate:
 * status: pending // 面试状态  1:待面试 2:面试通过 3:面试不通过 4:进入人才库
 * interview_date: 2017-07-15 15:00:00 // 面试时间
 * interviewer: 戴文俊 // 面试官
 * evaluation: 水平太差不要 // 评价
 * create_date: 2017-07-12T02:02:07.514Z // 创建时间
 * update_date: 2017-07-12T02:02:07.514Z //更新时间
 */
const statuses = ['pending', 'success', 'fail', 'talent']
var InterviewSchema = new Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  },
  status: {
    type: String,
    enum: statuses,
    default: 'pending'
  },
  interview_date: Date,
  interviewer: String,
  evaluation: {
    type: String,
    default: ''
  },
  create_date: {
    type: Date,
    default: Date.now
  }, // 创建时间
  update_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
})

var Interview = mongoose.model('Interview', InterviewSchema)

Promise.promisifyAll(Interview)
Promise.promisifyAll(Interview.prototype)

module.exports = Interview

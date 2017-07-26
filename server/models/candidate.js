var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
/**
 * name: 张三
 * phone: 18906777573
 * post: 前端
 * source: 拉勾
 * invitation: false // 是否已经邀约了
 * detail: Object // 详情
 * create_date: 2017-07-12T02:02:07.514Z // 创建时间
 * update_date: 2017-07-12T02:02:07.514Z //更新时间
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
  detail: {
    name: String,
    department: String, // 应聘部门
    post: String, // 应聘岗位
    gender: String,
    phone: String, // 电话
    native_place: String, // 籍贯
    nation: String, // 民族
    birthday: String, // 生日
    id_card: String, // 身份证
    education: String, // 学历
    political: String, // 政治面貌
    marital: String, // 婚姻状况  未婚/已婚未育/已婚已育
    address: String, // 现在住址
    language: String, // 外语语种及程度
    Interests: String, // 兴趣爱好
    certificate: String // 荣誉证书
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

var Candidate = mongoose.model('Candidate', CandidateSchema)
Promise.promisifyAll(Candidate)
Promise.promisifyAll(Candidate.prototype)

module.exports = Candidate

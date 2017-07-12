var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
/**
 * candidate_id:
 * name: 张三
 * department: 技术部 // 应聘部门
 * post: 前端 // 应聘岗位
 * gender: 男
 * phone: 1890****573 // 电话
 * native_place: 浙江温州 // 籍贯
 * nation: 汉族 // 民族
 * birthday: 1992-04-03 // 生日
 * id_card: 330381199*****1418 // 身份证
 * education: 本科 // 学历
 * political: 群众 // 政治面貌
 * marital: 未婚 // 婚姻状况  未婚/已婚未育/已婚已育
 * address: 上海杨浦 // 现在住址
 * language: 英语四级 // 外语语种及程度
 * Interests: LOL // 兴趣爱好
 * certificate: 计算级二级证书 // 荣誉证书
 * create_date: 2017-07-12T02:02:07.514Z // 创建时间
 */
var CandidateDetailSchema = new Schema({
  candidate_id: String,
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
  certificate: String, // 荣誉证书
  create_date: {
    type: Date,
    default: Date.now
  } // 创建时间
})

var CandidateDetail = mongoose.model('CandidateDetail', CandidateDetailSchema)
Promise.promisifyAll(CandidateDetail)
Promise.promisifyAll(CandidateDetail.prototype)

module.exports = CandidateDetail

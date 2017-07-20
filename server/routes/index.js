var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

var candidate = require('../api/candidate')
var candidateDetail = require('../api/candidate-detail')
var interview = require('../api/interview')

router.get('/test', (req, res) => {
  console.log('test - get')
  console.log(req.query)
  res.json({
    code: 200,
    message: '这是一个测试接口'
  })
})

router.post('/test', multipartMiddleware, (req, res) => {
  console.log('test - post')
  console.log(req.body)
  res.json({
    code: 200,
    message: '这是一个测试接口'
  })
})

// 获取候选人列表
router.post('/candidate/list', multipartMiddleware, candidate.list)
// 添加候选人
router.post('/candidate/insert', multipartMiddleware, candidate.insert)

// 候选人自填简历
router.post('/candidateDetail/insert', multipartMiddleware, candidateDetail.insert)

// 获取各个类型的邀约数量
router.post('/interview/eachCount', multipartMiddleware, interview.eachCount)
// 获取邀约列表
router.post('/interview/list', multipartMiddleware, interview.list)
// 增加邀约
router.post('/interview/insert', multipartMiddleware, interview.insert)
// 更新要求状态
router.post('/interview/updateStatus', multipartMiddleware, interview.updateStatus)

// 获取首页信息
router.get('/home', interview.home)

router.get('*', (req, res) => {
  res.json({
    code: -200,
    message: '没有找到该页面'
  })
})

module.exports = router

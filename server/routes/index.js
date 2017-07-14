var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

var candidate = require('../api/candidate')
var candidateDetail = require('../api/candidate-detail')
var interview = require('../api/interview')

router.get('/test', (req, res) => {
  res.json({
    code: 200,
    message: '这是一个测试接口'
  })
})

// 获取候选人列表
router.get('/candidate/list', candidate.list)
// 添加候选人
router.post('/candidate/insert', multipartMiddleware, candidate.insert)

// 候选人自填简历
router.post('/candidateDetail/insert', multipartMiddleware, candidateDetail.insert)

// 获取各个类型的邀约数量
router.get('/interview/eachCount', interview.eachCount)
// 获取邀约列表
router.get('/interview/list', interview.list)
// 增加邀约
router.post('/interview/insert', multipartMiddleware, interview.insert)

router.get('*', (req, res) => {
  res.json({
    code: -200,
    message: '没有找到该页面'
  })
})

module.exports = router

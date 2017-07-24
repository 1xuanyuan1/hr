const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const candidate = require('../api/candidate')
const candidateDetail = require('../api/candidate-detail')
const interview = require('../api/interview')
const user = require('../api/user')

const isUser = require('./is-user')

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
router.post('/candidate/list', isUser, multipartMiddleware, candidate.list)
// 添加候选人
router.post('/candidate/insert', isUser, multipartMiddleware, candidate.insert)

// 候选人自填简历
router.post('/candidateDetail/insert', multipartMiddleware, candidateDetail.insert)

// 获取各个类型的邀约数量
router.post('/interview/eachCount', isUser, multipartMiddleware, interview.eachCount)
// 获取邀约列表
router.post('/interview/list', isUser, multipartMiddleware, interview.list)
// 增加邀约
router.post('/interview/insert', isUser, multipartMiddleware, interview.insert)
// 更新要求状态
router.post('/interview/updateStatus', isUser, multipartMiddleware, interview.updateStatus)

// 获取首页信息
router.get('/home', isUser, interview.home)

// 用户登录
router.post('/user/login', multipartMiddleware, user.login)
// 用户登出
router.get('/user/logout', isUser, user.logout)

router.get('*', (req, res) => {
  res.json({
    code: -200,
    message: '没有找到该页面'
  })
})

module.exports = router

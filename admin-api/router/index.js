//TODO: 前数据存储未接入数据库，本周预计预计接入mysql
//TODO: 目前登录校验采用 session校验 预计本周替换成jwt校验
const express = require('express');
const UserController = require('../controller/user')
const RouterController = require('../controller/router')

const router = express.Router()

router.post('/api/login', UserController.login)

router.post('/api/logout', UserController.logOut)

router.get('/api/user/getUinfo', UserController.getUinfo)

router.get('/api/user/get_sync_routes', RouterController.getAsyncRouter)

router.post('/api/user/upload', RouterController.updateAsyncRouter)

module.exports = router
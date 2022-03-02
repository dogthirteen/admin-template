//TODO: 前数据存储未接入数据库，本周预计预计接入mysql
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
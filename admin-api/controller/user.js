const fs = require('fs');
const path = require('path');
const JWT = require('jsonwebtoken')
const config = require('../config')


function login(req, res) {
  const { username, password } = req.body
  if (username !== 'admin' || password !== '123456') {
    res.send({
      code: 0,
      data: {},
      msg: '账号或密码错误',
    })
  } else {
    const token = `Bearer ${JWT.sign({ username }, config.secretKey, { expiresIn: '30s' })}`
    res.send({
      code: 1,
      token,
      msg: '登陆成功',
    })
  }
}

function logOut(req, res) {
  res.send({
    code: 1,
    data: {},
    msg: '请求成功',
  })
}

function getUinfo(req, res) {
  res.send({
    code: 1,
    data: {
      name: "奥拉夫",
      avatar: "https://www.csgo.com.cn/jpg/171124/10691511494856195.jpg",
      roleList: ['admin']
    },
    msg: '请求成功',
  })
}

module.exports = {
  login,
  getUinfo,
  logOut
}
// 创建服务器，监听用户请求
//引入核心模块
const express = require('express')
const fs = require('fs')
const app = express()

//添加监听
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})

app.post('/login', function (req, res) {
  fs.readFile('./user.json', 'utf-8', (error, responseData) => {
    if (error) return console.log(error.message)
    res.json({
      code: 1,
      data: {
        ...JSON.parse(responseData),
      },
      msg: '登陆成功',
    })
  })
})

app.get('/get_sync_routes', function (req, res) {
  fs.readFile('./syncRoutes.json', 'utf-8', (error, responseData) => {
    if (error) return console.log(error.message)
    setTimeout(() => {
      res.json({
        code: 1,
        data: {
          ...JSON.parse(responseData),
        },
        msg: '请求成功',
      })
    }, 3000)
  })
})
app.post('/upload', function (req, res) {
  fs.readFile('./syncRoutes.json', 'utf-8', (error, responseData) => {
    if (error) return console.log(error.message)
    res.json({
      code: 1,
      data: {
        ...JSON.parse(responseData),
      },
      msg: '请求成功',
    })
  })
})

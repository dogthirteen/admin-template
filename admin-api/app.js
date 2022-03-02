// 创建服务器，监听用户请求
//引入核心模块
const express = require('express')
const cors = require('cors');
const router = require('./router');
const expressJwt = require('express-jwt')
const config = require('./config')
const app = express()

app.use(expressJwt({
  secret: config.secretKey,
  algorithms: ['HS256']
}).unless({
  path: ['/api/login', '/api/logout']
}))

// app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    return res.send({
      code: 401,
      msg: '无效token'
    })
  }
  res.send({
    code: 500,
    msg: '未知错误'
  })
})

//添加监听
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})

// 创建服务器，监听用户请求
//引入核心模块
const express = require('express')
const cors = require('cors');
const router = require('./router');
const expressSession = require('express-session');
const app = express()

app.use(expressSession({
  secret: 'admin123',
  resave: false,
  saveUninitialized: true,
}))

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)


//添加监听
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000')
})

const fs = require('fs');
const path = require('path');


function login(req, res) {
  const { username, password } = req.body
  if (username !== 'admin' || password !== '123456') {
    res.send({
      code: 0,
      data: {},
      msg: '账号或密码错误',
    })
  } else {
    req.session.user = { username, password }
    req.session.islogin = true
    fs.readFile(path.join(__dirname, '../user.json'), 'utf-8', (error, responseData) => {
      if (error) return console.log(error.message)
      res.send({
        code: 1,
        data: {
          ...JSON.parse(responseData),
        },
        msg: '登陆成功',
      })
    })
  }
}

function logOut(req, res) {
  req.session.destroy()
  console.log(req.session);
  res.send({
    code: 1,
    data: {},
    msg: '请求成功',
  })
}

function getUinfo(req, res) {
  console.log(req.session);
  if (req.session.islogin) {
    res.send({
      code: 1,
      data: {
        name: "奥拉夫",
        avatar: "https://www.csgo.com.cn/jpg/171124/10691511494856195.jpg",
        roleList: ['admin']
      },
      msg: '请求成功',
    })
  } else {
    res.send({
      code: 0,
      data: {},
      msg: '请先登录',
    })
  }
}

module.exports = {
  login,
  getUinfo,
  logOut
}
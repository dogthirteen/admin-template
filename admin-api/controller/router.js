const fs = require('fs');
const path = require('path');

function getAsyncRouter(req, res) {
  fs.readFile(path.join(__dirname, '../syncRoutes.json'), 'utf-8', (error, responseData) => {
    if (error) return console.log(error.message)
    setTimeout(() => {
      res.send({
        code: 1,
        data: {
          ...JSON.parse(responseData),
        },
        msg: '请求成功',
      })
    }, 3000)
  })
}
function updateAsyncRouter(req, res) {
  fs.readFile(path.join(__dirname, '../syncRoutes.json'), 'utf-8', (error, responseData) => {
    if (error) return console.log(error.message)
    res.send({
      code: 1,
      data: {
        ...JSON.parse(responseData),
      },
      msg: '请求成功',
    })
  })
}

module.exports = {
  getAsyncRouter,
  updateAsyncRouter
}
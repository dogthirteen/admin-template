const mysql = require('mysql')

const db = mysql.createConnection({
  port: 3306,
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'
})

db.connect((err) => {
  if (err) return console.log('数据库链接失败:' + err.message);
  console.log('数据库连接成功');
})

/* // 查询user表
// const sqlStr = 'SELECT * FROM users'
// 模糊查询名称包含李的数据条数 并设置nameCounts别名

const sqlStr = `SELECT COUNT(*) AS nameCounts FROM users WHERE userName LIKE '%李%' `
db.query(sqlStr, (err, res) => {
  if (err) return console.log(err.message);
  console.log(res);
}) */


/* // 向users表中插入数据
const sqlStr = 'INSERT INTO users (userName,password) VALUES (?,?)'
db.query(sqlStr, ['张三', '123456'], (err, res) => {
  if (err) return console.log(err.message);
  console.log(res);
}) */


/* // 更新users表中 id=1 的数据
const sqlStr = 'UPDATE users SET userName=?,password=? where id=?'
db.query(sqlStr, ['zero', '111111', 1], (err, res) => {
  if (err) return console.log(err.message)
  console.log(res);
}) */

// 删除users表中id=7的数据，业务上采用软删除
/* const sqlStr = 'DELETE FROM users where id=7' //物理删除
db.query(sqlStr, [7], (err, res) => {
  if (err) return console.log(err.message)
  console.log(res);
}) */


/* const sqlStr = 'update users SET status=? WHERE id=?' //软删除
db.query(sqlStr, ['1', 7], (err, res) => {
  if (err) return console.log(err.message);
  console.log(res);
}) */
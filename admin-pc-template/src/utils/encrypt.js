import md5 from "@/assets/js/md5.js";

/**
 * 签名格式，使用MD5 （密钥 + 时间戳 + JSON字符串格式的请求参数）得到签名
 * @param {Object} req 请求参数
 */

const encrypt = (req = {}) => {
  let req_data = req;

  // const PRIVATEKEY = process.env.VUE_APP_MD5_SECRET_KEY //密钥

  // let req_str = JSON.stringify(req_data) //转JSON字符串

  // let sign = md5(PRIVATEKEY + req_data.t + req_str) //签名

  // req_data.sign = sign //插值

  // req_data.signCheckData = req_str //复制
  req_data.t = Date.parse(new Date()) / 1000;

  return req_data; //返回整个请求参数
};

export default encrypt;

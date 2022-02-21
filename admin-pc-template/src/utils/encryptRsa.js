//  rsa 签名
import jsrsasign from "jsrsasign";

/**
 * 签名格式，使用RSA以 SHA1withRSA 的格式对请求参数签名 签名后转base64格式得到签名结果
 * @param {Object} data 请求参数
*/

const isEncryptRsa = data => {

  let key = process.env.VUE_APP_RSA_SECRET_KEY
  
  let keys = jsrsasign.KEYUTIL.getKey(key);

  // 创建 Signature 对象
  let signature = new jsrsasign.KJUR.crypto.Signature({
    alg: "SHA1withRSA"
  });
  // 传入key实例, 初始化signature实例
  signature.init(keys);
  // 传入待签明文
  signature.updateString(data.reqdata);
  // 签名, 得到16进制字符结果
  let a = signature.sign();
  let sign = jsrsasign.hextob64(a);

  let req = {
    ...data,
    sign,
    clientInfo: JSON.stringify({
      deviceName: navigator.userAgent.toLocaleLowerCase()
    })
  }

  return req
}


export default isEncryptRsa
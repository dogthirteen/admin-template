import md5 from './md5.js';

function encrypt(req) {
  req.timestamp = Date.parse(new Date()) / 1000;

  console.log(process.env.VUE_APP_JAVA_SECRET,process.env.VUE_APP_JAVA_APP_ID);

  let sign = md5(process.env.VUE_APP_JAVA_APP_ID + req.timestamp + process.env.VUE_APP_JAVA_SECRET);

  req.sign = sign;
  


  return req;
}

export default encrypt;

// 获取浏览器版本型号

export const system = () => {
  let Sys = {};  
  let ua = navigator.userAgent.toLowerCase();  
  let s;  
  
  // eslint-disable-next-line no-cond-assign
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
  // eslint-disable-next-line no-cond-assign
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :  
  // eslint-disable-next-line no-cond-assign
  (s = ua.match(/edge\/([\d.]+)/)) ? Sys.edge = s[1] :
  // eslint-disable-next-line no-cond-assign
  (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :  
  // eslint-disable-next-line no-cond-assign
  (s = ua.match(/(?:opera|opr).([\d.]+)/)) ? Sys.opera = s[1] :  
  // eslint-disable-next-line no-cond-assign
  (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :  
  // eslint-disable-next-line no-cond-assign
  (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;  
  // 根据关系进行判断
  if (Sys.ie) return JSON.stringify({name:"IE",ver:Sys.ie})
  if (Sys.edge) return JSON.stringify({name:"EDGE",ver:Sys.edge})
  if (Sys.firefox) return JSON.stringify({name:"Firefox",ver:Sys.firefox})  
  if (Sys.chrome) return JSON.stringify({name:"Chrome",ver:Sys.chrome})  
  if (Sys.opera) return JSON.stringify({name:"Opera",ver:Sys.opera})  
  if (Sys.safari) return JSON.stringify({name:"Safari",ver:Sys.safari})
  return 'Unkonwn';
}
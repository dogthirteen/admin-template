
// 格式化金额  9999=>9,999
export function toThousands(num) {
	var result = [],
		counter = 0,
		dight = num.toString().split('.')
	num = (num || 0).toString().split('.')[0].split('')
	for (var i = num.length - 1; i >= 0; i--) {
		counter++
		result.unshift(num[i])
		if (!(counter % 3) && i != 0) {
			result.unshift(',')
		}
	}
	return result.join('') + (dight.length > 1 ? `.${dight[1]}` : '')
}

// 截取字符串后4位
export function interceptString(str) {
	return str.substring(str.length - 4)
}




// 获取当前时间
export function getNowDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  let nowDate = year + '-' + month + '-' + day;
  return nowDate;
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

// 获取url参数
export function GetRequest(urlStr) {
  // console.log('url', urlStr);
  let url = '';
  if (typeof urlStr == 'undefined') {
    url = location.search; //获取url中"?"符后的字符串
  } else {
    url = '?' + urlStr.split('?')[1];
  }
  // console.log('location.search', url);

  let theRequest = new Object();
  if (url.indexOf('?') != -1) {
    let str = url.substr(1);
    // console.log(str, 'str');
    let strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}

// 姓名脱敏
export function noPassByName(str) {
  if (null != str && str != undefined) {
    if (str.length < 3) {
      return str.substring(0, 1) + '*';
    } else if (str.length == 3) {
      return str.substring(0, 1) + '*' + str.substring(2);
    } else if (str.length > 3 && str.length <= 6) {
      return '**' + str.substring(1, str.length);
    } else if (str.length > 6) {
      return str.substring(0, 2) + '****' + str.substring(6, str.length);
    }
  } else {
    return '';
  }
}
// file文件流转base64
export function fileByBase64(file, callback) {
  var reader = new FileReader();
  // 传入一个参数对象即可得到基于该参数对象的文本内容
  reader.readAsDataURL(file);

  // reader.readAsArrayBuffer(file)

  reader.onload = function(e) {
    // target.result 该属性表示目标对象的DataURL
    callback(e.target.result);
  };
}

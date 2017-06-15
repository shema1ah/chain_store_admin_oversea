let formatObj = (obj) => {
  let arr = [];
  for(let attr in obj) {
    if(obj.hasOwnProperty(attr)) {
      let one = attr + '=' + obj[attr];
      arr.push(one);
    }
  }
  return arr.join('&');
};

// 获取params的key对应的value
const getParams = (key) => {
  // 获取参数
  let url = window.location.search;
  // 正则筛选地址栏
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  // 匹配目标参数
  let result = url.substr(1).match(reg);
  // 返回参数值
  return result ? decodeURIComponent(result[2]) : '';
};

// 日期格式化
const formatDate = (parDate, formatStr) => {
  let date = new Date(parDate);
  /*
   函数：填充0字符
   参数：value-需要填充的字符串, length-总长度
   返回：填充后的字符串
   */
  let zeroize = function (value, length) {
    let i, zeros;
    if (!length) {
      length = 2;
    }
    value = value + '';
    for (i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0';
    }
    return zeros + value;
  };

  if (!formatStr) {
    formatStr = 'yyyy-MM-dd';
  }

  return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
    switch ($0) {
      case 'd':
        return date.getDate();
      case 'dd':
        return zeroize(date.getDate());
      case 'ddd':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
      case 'dddd':
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
      case 'M':
        return date.getMonth() + 1;
      case 'MM':
        return zeroize(date.getMonth() + 1);
      case 'MMM':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
      case 'MMMM':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
      case 'yy':
        return (date.getFullYear() + '').substr(2);
      case 'yyyy':
        return date.getFullYear();
      case 'h':
        return date.getHours() % 12 || 12;
      case 'hh':
        return zeroize(date.getHours() % 12 || 12);
      case 'H':
        return date.getHours();
      case 'HH':
        return zeroize(date.getHours());
      case 'm':
        return date.getMinutes();
      case 'mm':
        return zeroize(date.getMinutes());
      case 's':
        return date.getSeconds();
      case 'ss':
        return zeroize(date.getSeconds());
      case 'l':
        return date.getMilliseconds();
      case 'll':
        return zeroize(date.getMilliseconds());
      case 'tt':
        return date.getHours() < 12 ? 'am' : 'pm';
      case 'TT':
        return date.getHours() < 12 ? 'AM' : 'PM';
    }
  });
};

let isEmptyObject = (obj) => {
  var name;
  for ( name in obj ) {
    return false;
  }
  return true;
};

let deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

module.exports = {
  formatObj,
  formatDate,
  isEmptyObject,
  deepClone,
  getParams
};

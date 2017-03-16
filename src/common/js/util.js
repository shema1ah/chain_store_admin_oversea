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

let formatTime = (date, fmt, isStandard) => {
  var t = date;
  var o = {
    'M+': t.getMonth() + 1, // 月份
    'd+': t.getDate(),      // 日
    'h+': t.getHours(),     // 小时吧
    'm+': t.getMinutes(),   // 分
    's+': t.getSeconds(),   // 秒
    'q+': Math.floor((t.getMonth() + 3) / 3), // 季度
    'S': t.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
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
  formatObj, formatTime, isEmptyObject, deepClone
};

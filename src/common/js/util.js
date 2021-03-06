let formatObj = (obj) => {
  let arr = []
  for (let attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      let one = attr + '=' + obj[attr]
      arr.push(one)
    }
  }
  return arr.join('&')
}

// 获取params的key对应的value
const getParams = (key) => {
  // 获取参数
  let url = window.location.hash.split('?')[1] || '';
  // 正则筛选地址栏
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  // 匹配目标参数
  let result = url.match(reg)
  // 返回参数值
  return result ? decodeURIComponent(result[2]) : ''
}

// QQ safari时间乱码
const setformateDate = (date) => {
  return date.replace(/-/g, "/")
}

// 日期格式化
const formatDate = (parDate, formatStr) => {

  if(parDate && parDate.constructor === String) {
    parDate = parDate.replace(/-/g, "/");
  }

  let date = new Date(parDate)
  /*
   函数：填充0字符
   参数：value-需要填充的字符串, length-总长度
   返回：填充后的字符串
   */
  let zeroize = function (value, length) {
    let i, zeros
    if (!length) {
      length = 2
    }
    value = value + ''
    for (i = 0, zeros = ''; i < (length - value.length); i++) {
      zeros += '0'
    }
    return zeros + value
  }

  if (!formatStr) {
    formatStr = 'yyyy-MM-dd'
  }

  return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
    switch ($0) {
      case 'd':
        return date.getDate()
      case 'dd':
        return zeroize(date.getDate())
      case 'ddd':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()]
      case 'dddd':
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]
      case 'M':
        return date.getMonth() + 1
      case 'MM':
        return zeroize(date.getMonth() + 1)
      case 'MMM':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]
      case 'MMMM':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()]
      case 'yy':
        return (date.getFullYear() + '').substr(2)
      case 'yyyy':
        return date.getFullYear()
      case 'h':
        return date.getHours() % 12 || 12
      case 'hh':
        return zeroize(date.getHours() % 12 || 12)
      case 'H':
        return date.getHours()
      case 'HH':
        return zeroize(date.getHours())
      case 'm':
        return date.getMinutes()
      case 'mm':
        return zeroize(date.getMinutes())
      case 's':
        return date.getSeconds()
      case 'ss':
        return zeroize(date.getSeconds())
      case 'l':
        return date.getMilliseconds()
      case 'll':
        return zeroize(date.getMilliseconds())
      case 'tt':
        return date.getHours() < 12 ? 'am' : 'pm'
      case 'TT':
        return date.getHours() < 12 ? 'AM' : 'PM'
    }
  })
}

let isEmptyObject = (obj) => {
  var name
  for (name in obj) {
    return false
  }
  return true
}

let deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// 用户角色
const getRole = (data = {}) => {
  let role = {
    isMerchant: data.cate !== 'submerchant', // 是否大商户或者单店
    haiwai: data.country !== 'CN', // 是否海外
    currency: data.currency || '元', // 货币单位
    country: data.country, // 国家
    rate: data.rate || 100, // 汇率
    single: data.cate !== 'bigmerchant', // 是否是单店或子商户
    trade_type: data.trade_type || [], // 支付方式列表
    point: Number.parseInt(data.allow_point) || 0, // 精确小数点1代表2位
    show_qrcode: data.show_qrcode || false, // 单店下载二维码
    show_batch_qrcode: data.show_batch_qrcode || false, // 连锁店下载二维码
    isCashier: Boolean(data.opinfo && data.opinfo.opuid), // 是否收银员角色
    diancan: data.diancan_display === 1, // 是否展示智慧餐厅
    passState: data.has_set, // 是否设置管理密码
    preAuth: data.show_preauth, // 预授权管理  0不展示   1展示
    taxNo: data.tax_no // 商户是否设置税号
  }

  // 包商baoshang 日本JP 香港HK 印尼ID 迪拜AR 泰国TH 柬埔寨KH
  // bigmerchant:大商户 merchant:商户 submerchant:子商户

  return role
}

const formatData = (arg1, arg2) => {
  let m = 0;
  let s1 = arg1.toString();
  let s2 = arg2.toString();

  try{ m += s1.split(".")[1].length }catch(e) {}
  try{ m += s2.split(".")[1].length }catch(e) {}

  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

const formatLength = (val) => {
  let [len, fit] = ['', ''];
  let num = (val || 0).toString();
  if(num && num.indexOf('.') > -1) {
    len = num.split('.')[1];
    num = num.split('.')[0];
  }
  if(num && num.indexOf('-') > -1) {
    fit = '-';
    num = num.split('-')[1];
  }

  let result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return len ? `${fit}${result}.${len}` : `${fit}${result}`;
};

const getCookie = (sName) => {
  var aCookie = document.cookie.split(';')

  for (let sCookie of aCookie) {
    var aCrumb = sCookie.split('=')
    if (sName == aCrumb[0].replace(/(^\s*)|(\s*$)/g, '')) {
      return (aCrumb[1])
    }
  }
  return null
}

const clearCookie = (name, dom) => {
  let domain = dom.split('.').slice(-2).join('.');
  let exp = new Date();
  exp.setTime(exp.getTime() - 10000);
  document.cookie = name + "=''" + ";path=/;expires=" + exp.toGMTString();
  document.cookie = name + "=''" + ";Domain=." + domain + ";path=/;expires=" + exp.toGMTString();
}

module.exports = {
  formatObj,
  formatDate,
  isEmptyObject,
  deepClone,
  getParams,
  getRole,
  setformateDate,
  formatData,
  formatLength,
  getCookie,
  clearCookie
}

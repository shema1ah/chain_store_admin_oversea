
let singleValueValidator = (rule, val, cb) => {
  if (val === '') {
    cb('请输入单个红包金额')
  } else if (regSingle(val)) {
    cb('请输入正数')
  } else if (val <= 0 || val > 100) {
    cb('请输入0-100的值')
  } else if (!(/^\d+(\.\d{1,2})?$/.test(val))) {
    cb('小数点后只能有两位')
  } else {
    cb()
  }
}
let couponNumValidator = (rule, val, cb) => {
  if (val === '') {
    cb('请输入红包个数')
  } else if (regInit(val)) {
    cb('红包个数必须为正整数')
  } else {
    cb()
  }
}

let dateValidator = (rule, val, cb) => {
  if (val === '') {
    cb('请输入有效期')
  } else if (regInit(val)) {
    cb('请输入正整数')
  } else {
    cb()
  }
}

const regSingle = (val) => {
  if ((val + '').indexOf('-') > -1) {
    return true
  }
  return false
}

const regInit = (val) => {
  if (!/^\d+$/.test(val)) {
    return true
  }
  return false
}

let amtMinValid = (rule, val, cb) => {
  if (val === '') {
    cb('请输入随机金额最小值')
  } else if (regSingle(val)) {
    cb('请输入正数')
  } else if (!(/^\d+(\.\d{1,2})?$/.test(val))) {
    cb('小数点后只能有两位')
  } else {
    cb()
  }
}

let obtainAmtValidator = (rule, val, cb) => {
  if (val === '') {
    cb('请输入领取条件')
  } else if (regSingle(val)) {
    cb('请输入正数')
  } else if (!(/^\d+(\.\d{1,2})?$/.test(val))) {
    cb('小数点后只能有两位')
  } else {
    cb()
  }
}
let totalAmt = (rule, val, cb) => {
  if (val === '') {
    cb('请输入红包总预算')
  } else if (regSingle(val)) {
    cb('请输入正数')
  } else if (!(/^\d+(\.\d{1,2})?$/.test(val))) {
    cb('小数点后只能有两位')
  } else {
    cb()
  }
}

let stoAmtValid = (rule, val, cb) => {
  if (val === '') {
    cb('请输入储值规则')
  } else if (regSingle(val)) {
    cb('请输入正数')
  } else if (!(/^\d+(\.\d{1,2})?$/.test(val))) {
    cb('小数点后只能有两位')
  } else {
    cb()
  }
}

let mobileValid = (rule, val, cb) => {
  let re = /^1[3578][01379]\d{8}$|^1[34578][01256]\d{8}$|^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/
  if (val === '') {
    cb('请输入预留手机号')
  } else if (!re.test(val)) {
    cb('请输入正确的手机号')
  } else {
    cb()
  }
}

let Validator = {
  totalAmt, obtainAmtValidator, singleValueValidator, couponNumValidator, amtMinValid, stoAmtValid, mobileValid, dateValidator
}

export default Validator

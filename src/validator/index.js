
let singleValueValidator = (rule, val, cb) => {
  if(val === '') {
    cb('请输入单个红包金额');
  } else if(isNaN(val)) {
    cb('请输入数字');
  } else if(val <= 0 || val > 100) {
    cb('请输入0-100的值');
  } else if(!(/^\d+(\.\d{1,2})?$/.test(val))) {
    cb('小数点后只能有两位');
  } else {
    cb();
  }
};
let couponNumValidator = (rule, val, cb) => {
  if(val === '') {
    cb('请输入红包个数');
  } else if(isNaN(val)) {
    cb('请输入数字');
  } else if(!Number.isInteger(val)) {
    cb('红包个数必须为整数');
  } else {
    cb();
  }
};
let amtMinValid = (rule, val, cb) => {
  if(val === '') {
    cb('请输入随机金额最小值');
  } else if(isNaN(val)) {
    cb('请输入数字');
  } else if(!(/^\d+(\.\d{1,2})?$/.test(val))) {
    cb('小数点后只能有两位');
  } else {
    cb();
  }
};

let obtainAmtValidator = (rule, val, cb) => {
  if(val === '') {
    cb('请输入领取条件');
  } else if(isNaN(val)) {
    cb('请输入数字');
  } else if(!(/^\d+(\.\d{1,2})?$/.test(val))) {
    cb('小数点后只能有两位');
  } else {
    cb();
  }
};
let totalAmt = (rule, val, cb) => {
  if(val === '') {
    cb('请输入红包总预算');
  } else if(isNaN(val)) {
    cb('请输入数字');
  } else if(!(/^\d+(\.\d{1,2})?$/.test(val))) {
    cb('小数点后只能有两位');
  } else {
    cb();
  }
};

let stoAmtValid = (rule, val, cb) => {
  if(!(/^\d+$/.test(val))) {
    cb('请输正整数');
  } else {
    cb();
  }
};

let mobileValid = (rule, val, cb) => {
  let re = /^1[3578][01379]\d{8}$|^1[34578][01256]\d{8}$|^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/;
  if(val === '') {
    cb('请输入预留手机号');
  } else if(!re.test(val)) {
    cb('请输入正确的手机号');
  } else {
    cb();
  }
};

let Validator = {
  totalAmt, obtainAmtValidator, singleValueValidator, couponNumValidator, amtMinValid, stoAmtValid, mobileValid
};

export default Validator;

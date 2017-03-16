
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
  } else if(/\./.test(val)) {
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

let Validator = {
  totalAmt, obtainAmtValidator, singleValueValidator, couponNumValidator, amtMinValid
};

export default Validator;

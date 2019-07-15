// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  // 扩展一个流行的风格指南，即 eslint-config-standard
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,//箭头函数用小括号括起来
    "no-console": 0,//禁止使用console
    "eqeqeq": 0,//必须使用全等
    // allow async-await
    'generator-star-spacing': 0,//生成器函数*的前后空格
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': [0,'always'],//语句强制分号结尾
    'indent': 0,//缩进风格
    'no-tabs': 0,
    'no-new': 0,//禁止在使用new构造一个实例后不赋值
    'no-trailing-spaces': 0,//一行结束后面不要有空格
    'quotes': 0,//引号类型 `` "" ''
    'space-before-function-paren': 0,//函数定义时括号前面要不要有空格
    'space-in-parens': 0,//小括号里面不要有空格
    'padded-blocks': 0,//块语句内行首行尾是否要空行
    "comma-dangle": [0],//对象字面量项尾不能有逗号
    'keyword-spacing': 0,
    "no-multiple-empty-lines": 0,
    "no-unused-vars": 0,//不能用声明后未被使用的变量
    'one-var': 0 //连续申明
  }
}

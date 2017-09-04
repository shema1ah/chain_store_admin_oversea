// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import 'src/filters'
import store from './store'
import App from './App'
import router from './router'
import { Tree, Upload, Select, Option, TableColumn, Table, Button, Pagination, Dropdown, DropdownItem, DropdownMenu, Loading, DatePicker, Input, Message, Form, FormItem, Radio, RadioGroup, RadioButton, Dialog, Col, MessageBox, Row, CheckboxGroup, Checkbox, Rate, Tooltip, Switch } from 'element-ui'
import 'reset.css'
import 'assets/scss/common.scss'
import axios from 'axios'
import config from 'src/config'
import Store from 'common/js/store'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
let langAdaptor = function(lang) {
  if(~lang.indexOf('en')) return 'en'
  if(~lang.indexOf('zh')) return 'zh-CN'
  if(~lang.indexOf('ja')) return 'ja'
  return 'en';
}
let switchlang = localStorage.getItem("lang") || JSON.stringify({value: langAdaptor(navigator.language || navigator.browserLanguage || 'en')});
let targetLang = require('element-ui/lib/locale/lang/' + JSON.parse(switchlang).value)
Vue.use(VueI18n)

Vue.use(Tree)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Table)
Vue.use(Option)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Loading)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Form)
Vue.use(TableColumn)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)
Vue.use(Col)
Vue.use(Row)
Vue.use(RadioButton)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Rate)
Vue.use(Tooltip)
Vue.use(Switch)

locale.use(targetLang.default); // elementUI组件的多语言
var localePackage = { // 静态模板文案多语言
  'zh-CN': require(`lang/${(JSON.parse(switchlang).value)}.js`)['default'],
  en: require(`lang/${(JSON.parse(switchlang).value)}.js`)['default'],
  ja: require(`lang/${(JSON.parse(switchlang).value)}.js`)['default']
};
config.lang = JSON.parse(switchlang).value;
Object.keys(localePackage).forEach(function (lang) {
  Vue.locale(lang, localePackage[lang])
})
// header增加cookie验证信息
/* axios.interceptors.request.use(function (config) {
  config.headers.Session = `sessionid=eee`;
  return config;
}, function (err) {
  return Promise.reject(err);
}); */

axios.defaults.withCredentials = true; // 允许跨域请求携带凭据
axios.defaults.headers.common['lang'] = JSON.parse(switchlang).value;

axios.interceptors.response.use((res) => {
  let data = res.data
  if (data.respcd == config.code.SESSIONERR || data.respcd == config.code.LOGINERR) {
    // 清除本地cookie
    (new Image()).src = `${config.ohost}/mchnt/set_cookie?sessionid=`;
    document.cookie = "sessionid=''; expires=" + new Date(0).toUTCString();
    let role = Store.get('role') || {};
    window.localStorage.clear();
    window.localStorage.setItem('flag', true);

    var toRemoved = document.getElementById('unique_map');
    if(toRemoved) {
      toRemoved.onload = null;
      document.body.removeChild(toRemoved);
    }
    location.replace(`/#/?from=logout&haiwai=${role.haiwai}`);
  } else {
    return res
  }
}, (err) => {
  // Do something with response error
  console.log(err)
})

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

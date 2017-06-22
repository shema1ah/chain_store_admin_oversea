// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'src/filters'
import store from './store'
import App from './App'
import router from './router'
import { Tree, Select, Option, TableColumn, Table, Button, Pagination, Dropdown, DropdownItem, DropdownMenu, Loading, DatePicker, Input, Message, Form, FormItem, Radio, RadioGroup, RadioButton, Dialog, Col, MessageBox, Row, CheckboxGroup, Checkbox, Rate, Tooltip } from 'element-ui'
import 'reset.css'
import 'assets/scss/common.scss'
import axios from 'axios'
import config from 'src/config'

Vue.use(Tree)
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

// header增加cookie验证信息
/* axios.interceptors.request.use(function (config) {
  config.headers.Session = `Token3333`;
  return config;
}, function (err) {
  return Promise.reject(err);
}); */

axios.interceptors.response.use((res) => {
  let data = res.data
  if (data.respcd === config.code.SESSIONERR) {
    // 清除本地cookie
    document.cookie = "sessionid=''; expires=" + new Date(0).toUTCString();

    location.href = `/`
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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import "src/filters";
import store from "./store";
import App from './App';
import router from './router';
import { Select, Option, TableColumn, Table, Button, Pagination, Dropdown, DropdownItem, DropdownMenu, Loading, DatePicker, Input, Message, Form, FormItem, Radio, RadioGroup, RadioButton, Dialog, Col, MessageBox, Row, CheckboxGroup, Checkbox } from 'element-ui';
import 'reset.css';
import "common/scss/font.scss";
import "assets/scss/ele-fix.scss";
import axios from 'axios';
import config from 'src/config';

Vue.use(Select);
Vue.use(Table);
Vue.use(Option);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Loading);
Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(Col);
Vue.use(Row);
Vue.use(RadioButton);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);

axios.interceptors.response.use((res) => {
  let data = res.data;
  if(data.respcd === config.code.SESSIONERR) {
    location.href = `${config.host}/`;
  } else {
    return res;
  }
}, (err) => {
  // Do something with response error
  console.log(err);
});

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});


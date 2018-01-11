<template>
  <div class="login">
    <div class="content">
      <div class="head">{{$t('login.head')}}</div>
      <el-tabs v-model="userType" @tab-click="handleClick">
        <el-tab-pane :label="$t('login.tab1')" name="merchant"></el-tab-pane>
        <el-tab-pane :label="$t('login.tab2')" name="cash"></el-tab-pane>
      </el-tabs>
      <el-form :model="merchant" :rules="merchantRules" ref="merchant" v-if="userType === 'merchant'">
        <el-form-item prop="username" class="username">
          <el-input v-model.trim="merchant.username" size="small" type="text" :placeholder="$t('login.reg')" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password">
          <el-input v-model.trim="merchant.password" size="small" type="password" :placeholder="$t('login.ltsix')" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
        <div class="panel-header-btn panel-header-btn__fill" @click="login">
          <span class="el-icon-loading" v-if="loading"></span>
          <span v-else>{{$t('login.login')}}</span>
        </div>
      </el-form>
      <el-form :model="cash" :rules="cashRules" ref="cash" v-else>
        <el-form-item prop="name" class="username">
          <el-input v-model.trim="cash.name" size="small" type="text" :placeholder="$t('login.user')" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
        <el-form-item prop="opuid" class="cashier">
          <el-input v-model.trim="cash.opuid" size="small" type="text" :placeholder="$t('login.cash')" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="password">
          <el-input v-model.trim="cash.pass" size="small" type="password" :placeholder="$t('login.ltsix')" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
        <div class="panel-header-btn panel-header-btn__fill" @click="login">
          <span class="el-icon-loading" v-if="loading"></span>
          <span v-else>{{$t('login.login')}}</span>
        </div>
      </el-form>
      <!-- 忘记密码 -->
      <div class="bottom" v-if="role.haiwai">
        <router-link :to="{ name: 'overseaForget'}" class="forget">{{$t('login.forgetPwd')}}</router-link>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import { getRole, getCookie, clearCookie } from '../../common/js/util';
  import Store from '../../common/js/store';
  export default {
    data() {
      return {
        lang: config.lang,
        role: Store.get('role') || {},
        loading: false,
        userType: 'merchant',
        merchant: {
          username: '',
          password: '',
          format: 'cors'
        },
        merchantRules: {
          username: [
            { required: true, message: this.$t('login.msg.m1') }
          ],
          password: [
            { required: true, message: this.$t('login.msg.m2') }
          ]
        },
        cash: {
          name: '',
          opuid: '',
          pass: ''
        },
        cashRules: {
          name: [
            { required: true, message: this.$t('login.msg.m4') }
          ],
          opuid: [
            { required: true, message: this.$t('login.msg.m5') }
          ],
          pass: [
            { required: true, message: this.$t('login.msg.m2') }
          ]
        }
      };
    },

    created() {
      // 浏览器兼容模式下，提示
      if(this.isIe() && !this.checkBrowser()) {
          this.$message({
            message: '为保证系统的正常使用，建议您将浏览器升级到最新版本并且切换至急速模式。',
            duration: 0,
            type: 'error'
          });
      }
      // cookie存在跳转首页
      if(getCookie('sessionid') && Store.get('flag') === false) {
        this.$router.push('/main/index');
      }
      // 退出之后清除session
      if(getCookie('sessionid') && Store.get('flag') === true) {
        clearCookie('sessionid', config.ohost);
      }
    },
    mounted() {
      var getQuery = function (href) {
        var Request = {};
        if (href.indexOf('?') != -1) {
          var str = location.hash.substring(location.hash.indexOf('?') + 1);
          var strs = str.split('&');
          for (var i = 0; i < strs.length; i++) {
            var _key = strs[i].split('=')[0];
            Request[_key] = strs[i].split('=')[1];
          }
        }
        return Request;
      };
      var param = getQuery(location.href);
      if(param && param.from && Boolean(this.role.haiwai)) {
          location.replace(location.protocol + '//' + location.host);
      }
    },
    methods: {
      // 登录
      login() {
        var _this = this;
        _this.$refs[this.userType].validate((valid) => {
          if(!_this.loading && valid) {
            let params;
            if(this.userType === 'merchant') {
              params = this.merchant;
            }else {
              let cash = this.cash;
              params = {
                username: cash.name,
                opuid: cash.opuid,
                password: cash.pass,
                format: 'cors'
              };
            }
            _this.loading = true;
            axios.post(`${config.host}/merchant/login`, params).then((res) => {
              _this.loading = false;
              let data = res.data;
              if(data.respcd === config.code.OK) {
                let val = getRole(data.data) || '';
                this.$store.state.role = val;
                Store.set('role', val);
                Store.set('flag', false);

                // 当前域名下设置cookie
                let bicon = new Image();
                let sid = getCookie('sessionid') || '';
                if(sid) {
                  bicon.style.display = 'none';
                  bicon.src = `${config.ohost}/mchnt/set_cookie?sessionid=${sid}`;
                }

                // 进行是否是首次登录的判断，返回need_change_pwd字段，1为需要重置，0为不需要重置
                let needChangePwd = 0;
                if(needChangePwd) {
                  setTimeout(function() {
                    _this.$router.push('/firstlogin');
                  }, 0)
                } else {
                  setTimeout(function() {
                    _this.$router.push('/main/index');
                  }, 0)
                }

              } else {
                this.$message.error(data.resperr);
              }
            }).catch(() => {
              this.loading = false;
              this.$message.error(this.$t('login.msg.m3'));
            });
          }
        });
      },

      // 点击enter键调用登录
      onEnter() {
          this.login();
      },

      // 切换标签清除表单
      handleClick(event) {
        if(event.name === 'cash') {
          this.$refs['merchant'] && this.$refs['merchant'].resetFields();
        }else {
          this.$refs['cash'] && this.$refs['cash'].resetFields();
        }
      },

      // 是否为IE内核
      isIe() {
        return ("ActiveXObject" in window);
      },

      // IE还是兼容模式
      checkBrowser() {
          let lastInfo = navigator.userAgent.split(";").pop();
          if(lastInfo.indexOf("NET") > -1) {
            return true;
          }else {
            return false;
          }
      }
    }
  };
</script>

<style lang="scss">
  .login {
    height: 100%;
    background: #2A2A2A url("./img/bg.png") no-repeat 20px bottom;

    .content {
      width: 500px;
      height: auto;
      border: 1px solid #979797;
      border-radius: 4px;
      background: #fff;
      position: relative;
      top: 20%;
      margin: auto;

      .head {
        color: #2F323A;
        font-size: 24px;
        text-align: center;
        padding: 30px 0;
        background: #F7F7F7;
      }

      .el-form {
        padding: 0 80px;
      }

      .el-form-item {
        border-bottom: 1px solid #2F323A;
        margin-bottom: 25px;

        .el-form-item__error {
          padding-top: 10px;
        }
      }

      .el-input {
        padding-left: 30px;
        box-sizing: border-box;
      }
      .username {
        background: url("./img/phone.png") no-repeat left center;
        background-size: 24px;
      }

      .el-input__inner {
        box-sizing: border-box;
        height: 21px;
        color: #2F323A;
        font-weight: 200;
        padding: 0 10px 0 0;
        font-size: 15px;
        line-height: 1;
        border: none;
        margin-bottom: 5px;
        background-color: transparent;
        outline: none;
      }

      .cashier {
        background: url("./img/cashier.png") no-repeat left center;
        background-size: 24px;
      }
      .password {
        background: url("./img/password.png") no-repeat left center;
        background-size: 24px;
      }
      .panel-header-btn {
        width: 100%;
        height: 44px;
        line-height: 44px;
        margin: 25px 0;
        float: none;
      }

      .bottom {
        text-align: center;
        font-size: 17px;
        margin: 20px 0;

        span {
          padding: 0 15px;
        }

        .forget {
          color: #606470;
          &:hover {
             color: darken(#606470,10%);
           }
        }
        .register {
          color: #FE9B20;
          &:hover {
            color: darken(#FE9B20,10%);
           }
        }

      }
    }

    .el-tabs {
      .el-tabs__header {
        border: none;
      }
      .el-tabs__nav-wrap {
        margin: 0
      }
      .el-tabs__nav-scroll {
        padding: 0 80px;
      }
      .el-tabs__nav {
        display: flex;
        float: none;
        width: 100%;
      }
      .el-tabs__item {
        font-size: 20px;
        flex: 1;
        height: 55px;
        line-height: 55px;
        text-align: center;

      }
    }
  }
</style>

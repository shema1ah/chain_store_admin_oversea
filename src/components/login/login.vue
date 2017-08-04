<template>
  <div class="login">
    <div class="content">
      <div class="head">{{$t('login.head')}}</div>
      <el-form :model="form" :rules="formrules" ref="form">
        <el-form-item prop="username" class="username">
          <el-input v-model.trim="form.username" size="small" type="text" :placeholder="$t('login.reg')" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password">
          <el-input v-model.trim="form.password" size="small" type="password" :placeholder="$t('login.ltsix')" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
        <div class="panel-header-btn panel-header-btn__fill" @click="login">
          <span class="el-icon-loading" v-if="loading"></span>
          <span v-else>{{$t('login.login')}}</span>
        </div>
        <div class="bottom" v-if="lang.indexOf('zh-CN')>-1">
          <router-link :to="{ name: 'forget'}" class="forget">{{$t('login.forgetPwd')}}</router-link>
          <!--<span>|</span>
          <router-link :to="{ name: 'register'}" class="register">我要注册连锁店管理账号</router-link>-->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import { getRole, getCookie } from '../../common/js/util';
  import Store from '../../common/js/store';
  export default {
    data() {
      return {
        lang: JSON.parse(localStorage.getItem("lang") || '{}').value || navigator.language,
        role: Store.get('role') || {},
        loading: false,
        form: {
          username: '',
          password: ''
        },
        formrules: {
          username: [
            { required: true, message: this.$t('login.msg.m1') }
          ],
          password: [
            { required: true, message: this.$t('login.msg.m2') }
          ]
        }
      };
    },

    created() {
      // cookie存在跳转首页
      console.log(666)
      if(getCookie('sessionid') && !Store.get("flag")) {
       this.$router.push('/main/index');
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
        this.$refs['form'].validate((valid) => {
          if(!this.loading && valid) {
            this.loading = true;

            axios.post(`${config.host}/merchant/login`, this.form).then((res) => {
              this.loading = false;
              let data = res.data;
              if(data.respcd === config.code.OK) {
                let val = getRole(data.data) || '';
                this.$store.state.role = val;
                Store.set('role', val);
                Store.set('flag', false);
                this.$router.push('/main/index')
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
      height: 350px;
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

      .password {
        background: url("./img/password.png") no-repeat left center;
      }
      .panel-header-btn {
        width: 100%;
        height: 44px;
        line-height: 44px;
        margin: 25px 0;
      }

      .bottom {
        text-align: center;
        font-size: 17px;

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
  }
</style>

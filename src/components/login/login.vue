<template>
  <div class="login">
    <div class="content">
      <div class="head">商户管理后台</div>
      <el-form :model="form" :rules="formrules" ref="form">
        <el-form-item prop="username" class="username">
          <el-input v-model="form.username" size="small" type="text" placeholder="注册账号"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password">
          <el-input v-model="form.password" size="small" type="password" placeholder="6位以上"></el-input>
        </el-form-item>

        <div class="panel-header-btn panel-header-btn__fill" @click="login">
          <span class="el-icon-loading" v-if="loading"></span>
          <span v-else>登录</span>
        </div>
        <div class="bottom">
          <router-link :to="{ name: 'forget'}" class="forget">忘记密码?</router-link>
          <span>|</span>
          <router-link :to="{ name: 'register'}" class="register">新用户注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  export default {
    data() {
      return {
        loading: false,
        form: {
          username: '',
          password: ''
        },
        formrules: {
          username: [
            { required: true, message: '请输入注册账号' }
          ],
          password: [
            { required: true, message: '请输入密码' }
          ]
        }
      };
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
                // console.log(data, 1111);
                this.$router.push('/main/index');
              } else {
                this.$message.error(data.resperr);
              }
            }).catch(() => {
              this.loading = false;
              this.$message.error('登录失败');
            });
          }
        });
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

      .username {
        background: url("./img/phone.png") no-repeat left center;
      }

      .el-input__inner {
        box-sizing: border-box;
        height: 21px;
        color: #2F323A;
        font-weight: 200;
        padding: 0 10px 0 30px;
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

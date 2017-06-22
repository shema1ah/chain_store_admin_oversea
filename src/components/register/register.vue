<template>
  <div class="registerb">
    <div class="head">商户管理后台</div>
    <el-form :model="form" :rules="formrules" ref="form">
      <el-form-item label="手机号" prop="username" v-if="isRegister">
        <el-input v-model="form.username" size="small" type="number" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="mobile" v-if="!isRegister">
        <el-input v-model="form.mobile" size="small" type="number" placeholder="请输入注册账号"></el-input>
      </el-form-item>
      <div class="yanz">
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" size="small" type="number" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-button v-if="isSendCode" type="primary" class="panel-header-btn panel-header-btn__fill" @click="getCode">获取验证码</el-button>
        <div v-else class="panel-header-btn panel-header-btn__fill send">{{ buttonCotent }}</div>
      </div>
      <el-form-item label="输入新密码" prop="password">
        <el-input v-model="form.password" size="small" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="repass">
        <el-input v-model="form.repass" size="small" type="password" placeholder="请输入确认新密码"></el-input>
      </el-form-item>
      <el-form-item label="商户名称" prop="shopname" v-if="isRegister">
        <el-input v-model.trim="form.shopname" size="small" type="text" placeholder="请输入商户名称"></el-input>
      </el-form-item>
      <el-form-item label="推荐人手机号" prop="saleman_mobile" v-if="isRegister">
        <el-input v-model="form.saleman_mobile" size="small" type="number" placeholder="请输入推荐人手机号"></el-input>
      </el-form-item>
      <div class="panel-header-btn panel-header-btn__fill" @click="submit">
        <span class="el-icon-loading" v-if="iconShow"></span>
        <span v-else>确定</span>
      </div>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';

  export default {
    data() {
      let passValid = (rule, val, cb) => {
        if(val === '') {
          cb('请输入新密码');
        } else {
          if(this.form.repass !== '') {
            this.$refs['form'].validateField('repass');
          }
          cb();
        }
      };

      let repassValid = (rule, val, cb) => {
        if(val === '') {
          cb('请输入确认新密码');
        } else if(this.form.password && this.form.password !== val) {
          cb('新密码与确认密码不一致');
        } else {
          console.log(val);
          cb();
        }
      };

      let phoneValid = (rule, val, cb) => {
        if(!/^1[3|4|5||7|8]\d{9}$/.test(val)) {
          cb('请输入正确的手机号');
        } else {
          console.log(val);
          cb();
        }
      };

      return {
        isRegister: false,
        isSendCode: true,
        iconShow: false,
        buttonCotent: '',
        form: {
          mobile: '',
          username: '',
          code: '',
          password: '',
          repass: '',
          shopname: '',
          saleman_mobile: ''
        },
        formrules: {
          mobile: [
            { required: true, message: '请输入手机号' },
            { validator: phoneValid, trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入注册账号' }
          ],
          code: [
            { required: true, message: '请输入验证码' }
          ],
          password: [
            { validator: passValid },
            {max: 20, min: 6, message: '请输入6~20位数字或字母', trigger: 'blur'}
          ],
          repass: [
            { validator: repassValid },
            {max: 20, min: 6, message: '请输入6~20位数字或字母', trigger: 'blur'}
          ],
          shopname: [
            { required: true, message: '请输入商户名称' }
          ],
          saleman_mobile: [
            { required: true, message: '请输入推荐人手机号' },
            { validator: phoneValid, trigger: 'blur' }
          ]
        }
      };
    },
    created() {
      // 判断是注册还是忘记密码
      if(this.$route.path.indexOf('register') > -1) {
        this.isRegister = true;
      }
    },
    methods: {
      // 获取验证码
      getCode() {
        let type = this.isRegister ? 'username' : 'mobile';
        this.$refs['form'].validateField(type, (valid) => {
          if(valid === '' && this.isSendCode) {
            this.isSendCode = false;

            axios.get(`${config.ohost}/mchnt/smscode/send`, {
              params: {
                mobile: this.isRegister ? this.form.username : this.form.mobile,
                mode: this.isRegister ? 'signup' : 'reset_pwd',
                format: 'cors'
              }
            }).then((res) => {
              let data = res.data;
              if (data.respcd === config.code.OK) {
                this.startTimer();
              } else {
                this.$message.error(data.respmsg);
                this.isSendCode = true;
              }
            }).catch(() => {
              this.$message.error('请求失败!');
              this.isSendCode = true;
            });
          }
        });

      },

      // 计时
      startTimer() {
        let num = 60;
        this.buttonCotent = num + 's';
        this.st = setInterval(() => {
          num--;
          if (num) {
            this.buttonCotent = num + 's';
          } else {
            this.stopTimer();
          }
        }, 1000);
      },

      // 停止计时
      stopTimer() {
        this.isSendCode = true;
        clearTimeout(this.st);
      },

      // 提交
      submit() {
        this.$refs['form'].validate((valid) => {
          if(!this.iconShow && valid) {
            this.iconShow = true;
            // 修改密码mchnt/user/reset_pwd
            // 注册/mchnt/user/bigmchnt_signup
            let params, val;
            if(this.isRegister) {
              params = {
                username: this.form.username,
                password: this.form.password,
                shopname: this.form.shopname,
                code: this.form.code,
                saleman_mobile: this.form.saleman_mobile,
                format: 'cors'
              };
              val = "bigmchnt_signup";
            }else {
              params = {
                mobile: this.form.mobile,
                password: this.form.password,
                code: this.form.code,
                format: 'cors',
                src: 'mchnt',
                mode: 'reset'
              };
              val = "reset_pwd";
            }
            axios.post(`${config.ohost}/mchnt/user/${val}`, params).then((res) => {
              let data = res.data;
              if (data.respcd === config.code.OK) {
                this.$message({
                  type: 'success',
                  message: this.isRegister ? '注册成功!' : '修改成功!'
                });
                this.$router.push('/login');
              } else {
                this.$message.error(data.respmsg);
              }
              this.stopTimer();
              this.iconShow = false;
            }).catch(() => {
              this.$message.error('请求失败!');
              this.stopTimer();
              this.iconShow = false;
            });
          }
        });
      }
    }
  };
</script>

<style lang="scss">
.registerb {
  height: 100%;
  background: url('./img/bg.png') no-repeat 20px bottom;

  .head {
    color: #FE9B20;
    font-size: 24px;
    text-align: center;
    padding: 30px 0;
    border-bottom: 2px solid #FE9B20;
  }
  .el-form {
    width: 350px;
    margin: auto;
    padding-top: 80px;

    .el-form-item {
      display: flex;
      margin-bottom: 20px;
    }
    .el-input__inner {
      height: 40px;
    }
    .el-form-item__label {
      font-size: 16px;
      width: 100px;
      padding: 0px;
      text-align: left;
      line-height: 36px;
      color: #262323;
      flex-shrink: 0;
    }
    .el-form-item__content {
      width: 100%;
      line-height: 1;
    }
  }
  .panel-header-btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 0;
  }
}
</style>

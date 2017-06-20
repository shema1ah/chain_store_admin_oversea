<template class="main">
  <div class="index">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>门店管理</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">基本信息</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="info_wrapper">
          <div class="info">
            <div class="info__title">登录账号</div>
            <div class="info__desc">{{ shop.mobile }}</div>
          </div>
          <div class="info">
            <div class="info__title">店铺名称</div>
            <div class="info__desc">{{ shop.shopname }}</div>
          </div>
          <div class="info">
            <div class="info__title">地址</div>
            <div class="info__desc">{{ shop.address }}</div>
          </div>
          <div class="info">
            <div class="info__title">手机号</div>
            <div class="info__desc">{{ shop.telephone }}</div>
          </div>
          <div class="info">
            <div class="info__title">持卡人</div>
            <div class="info__desc">{{ shop.bankuser }}</div>
          </div>
          <div class="info">
            <div class="info__title">银行账户</div>
            <div class="info__desc">{{ shop.bankaccount }} </div>
          </div>
          <div class="info" style="margin-bottom: 0">
            <div class="info__title">银行名称</div>
            <div class="info__desc">{{ shop.headbankname }} </div>
          </div>
          <div class="info">
            <div class="info__title" style="visibility: hidden">银行名称</div>
            <div class="info__desc">{{shop.bankname}}</div>
          </div>
          <el-button type="primary" class="edit-pwd-btn" @click.native="changePass('single', shop.mobile)">修改密码</el-button>
          <a href="http://www.baidu.com" class="el-button el-button--default download-shop-code">下载店铺收款码</a>
        </div>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="showChangePass" @close="handleClose" custom-class="mydialog pass" top="20%" :show-close="false">
      <el-form :model="form" :rules="formrules" ref="form">
        <el-form-item label="登录账号">
          <div>{{ userName }}</div>
        </el-form-item>
        <el-form-item label="输入新密码" prop="pass">
          <el-input v-model="form.pass" size="small" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="repass">
          <el-input v-model="form.repass" size="small" type="password" placeholder="请输入确认新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div @click="showChangePass = false" class="cancel">取消</div>
        <div @click="submit" class="submit">
          <span class="el-icon-loading" v-if="iconShow"></span>
          <span v-else>确定</span>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import axios from 'axios';
  import config from 'config';
  export default {
    components: {ElButton},
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
        } else if(this.form.pass && this.form.pass !== val) {
          cb('新密码与确认密码不一致');
        } else {
          console.log(val);
          cb();
        }
      };
      return {
        loading: false,
        iconShow: false,
        showChangePass: false,
        type: '',
        userName: '',
        form: {
          name: '',
          pass: '',
          repass: ''
        },
        formrules: {
          pass: [
            { validator: passValid },
            {max: 20, min: 6, message: '请输入6~20位数字或字母', trigger: 'blur'}
          ],
          repass: [
            { validator: repassValid },
            {max: 20, min: 6, message: '请输入6~20位数字或字母', trigger: 'blur'}
          ]
        }
      };
    },
    props: {
      shop: {
        type: Object
      }
    },

    methods: {
      changePass(type, name) {
        this.type = type;
        this.userName = name;
        this.showChangePass = true;
      },
      // 修改密码提交
      submit() {
        this.$refs['form'].validate((valid) => {
          if(!this.iconShow && valid) {
            this.iconShow = true;

            let src;
            if(this.type === 'chain') {
              src = 'big-submchnt';
            }else {
              src = 'mchnt';
            }
            axios.post(`${config.ohost}/mchnt/user/reset_pwd`, {
              mobile: this.shop.mobile,
              password: this.form.pass,
              mode: 'change',
              username: this.userName,
              src: src
            }).then((res) => {
              let data = res.data;
              if (data.respcd === config.code.OK) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.showChangePass = false;

                if(this.type === 'chain') {
                  this.$router.push('/login');
                }
              } else {
                this.$message.error(data.respmsg);
              }
              this.iconShow = false;
            }).catch(() => {
              this.$message.error('请求失败!');
              this.iconShow = false;
            });
          }
        });
      },
      // 关闭弹出层,清除表单
      handleClose() {
        setTimeout(() => {
          this.form.pass = '';
          this.form.repass = '';
        }, 200);
      }
    }
  };
</script>

<style lang="scss">
  .panel-header__desc {
    font-size: 18px;
    color: #FE9B20;
  }

  .panel-header__fix {
    padding-right: 15px;
  }

  .panel-select-group__justify {
    justify-content: space-between;
  }


  .info_wrapper {
    padding: 30px 0px 30px 30px;
  @at-root .info {
    display: flex;
    height: 28px;
    -webkit-align-items: center;
    align-items: center;
    margin-bottom: 18px;
    @at-root .info__title {
      font-size: 20px;
      color: #262323;
      width: 88px;
      margin-right: 25px;
      text-align: left;
    }
    @at-root .info__sign {
      margin: 0px 15px 0px 10px;
    }
    @at-root .info__desc {
      font-size: 15px;
      color: #98989E;
    }
  }
  }
  .table_placeholder {
    height: 50px;
  }

  .detail_dialog {
    .el-dialog {
      width: 580px;
    }
    .el-dialog__title {
      font-size: 20px;
    }
    .title {
      font-size: 16px;
      color: black;
    }
    .desc {
      color: black;
    }
  }
  .main {
    .download-shop-code {
      color: #FE9B20;
      border-color: #FE9B20;
      margin-left: 20px !important;
      width: 155px;
    }
    .edit-pwd-btn {
      width: 155px;
    }
    .panel-header-btn {
      width: 155px;
      float: none;
      background-color: #fe9b20;
      color: #ffffff;
    }
    .pass {
      width: 420px;
      .el-dialog__header {
        text-align: center;
      }
      .el-form-item__label {
        width: 90px;
      }
    }
  }
</style>

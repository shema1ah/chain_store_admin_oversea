<template>
  <div class="single">
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
            <div class="info__desc">{{ shop.telephone || shop.mobile }}</div>
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
            <div class="info__desc">{{ shop.bankname }}</div>
          </div>
          <div class="panel-btn-group__wrapper">
            <div class="panel-header-btn panel-header-btn__fill" @click="changePass(shop.mobile)">修改密码</div>
            <a :href="downHref" download>
              <div class="panel-header-btn">
                <span>下载店铺收款码</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="showChangePass" @close="handleClose" custom-class="mydialog" top="20%" :show-close="false">
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
        userName: '',
        form: {
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

    computed: {
      downHref() {
          return `${config.host}/merchant/qrcode?userid=${this.shop.uid}`;
      }
    },

    props: {
      shop: {
        type: Object
      }
    },

    methods: {
      changePass(name) {
        this.userName = name;
        this.showChangePass = true;
      },

      // 退出登录
      logout() {
        axios.get(`${config.host}/merchant/signout`)
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              // 清除本地cookie
              document.cookie = "sessionid=''; expires=" + new Date(0).toUTCString();

              this.$router.push("/login");
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
          this.$message.error('请求失败');
        });
      },

      // 修改密码提交
      submit() {
        this.$refs['form'].validate((valid) => {
          if(!this.iconShow && valid) {
            this.iconShow = true;

            axios.post(`${config.ohost}/mchnt/user/reset_pwd`, {
              mobile: this.shop.mobile,
              password: this.form.pass,
              mode: 'change',
              username: this.userName,
              src: 'mchnt',
              format: 'cors'
            }).then((res) => {
              let data = res.data;
              if (data.respcd === config.code.OK) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.showChangePass = false;
                this.logout();

              } else {
                this.$message.error(data.respmsg);
              }
              this.iconShow = false;
            }).catch(() => {
              this.iconShow = false;
              this.$message.error('请求失败!');
            });
          }
        });
      },

      // 关闭弹出层,清除表单
      handleClose() {
        this.$refs['form'].resetFields();
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

  .single {
    .panel-header-btn {
      width: 155px;
    }
  }
</style>

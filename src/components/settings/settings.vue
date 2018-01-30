<template>
  <div class="settings" v-loading="loading" :element-loading-text="$t('common.loading')">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$t('setting.crumbs.L1')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">{{$t('setting.panel.mailSetup')}}</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="myform_wrapper">
          <!-- 我们会在次日早上7点，把上一天的交易记录发送给您 -->
          <div class="gray-explain">{{$t('setting.panel.explain')}}</div>
          <el-form :rules="formrules" :model="form" ref="form">
            <el-form-item :label="$t('overseaForget.emailAddr')">
              <el-form-item prop="email">
                <el-input v-model="form.email" size="small" type="text" class="panel-select-input-230"></el-input>
              </el-form-item>
              <div class="panel-header-btn panel-header-btn__fill" @click="addEmail()">
                <span>{{ $t('common.ok') }}</span>
              </div>
            </el-form-item>
            <!-- email列表 -->
            <div class="emails-box" v-if="this.isShow">
              <h5>{{ $t('overseaForget.emailAddr') }}:</h5>
              <ul class="emails-list">
                <li v-for="(email, index) in this.emails">{{ email }} <span @click="delEmail(index)">{{ $t('common.del') }}</span></li>
              </ul>
            </div>
            <!-- 每日发送日报 -->
            <el-form-item :label="$t('setting.panel.dailySend')" prop="status">
              <el-switch v-model="form.status" on-text="" off-text="" on-color="#7ed321" off-color="#d8d8d8" on-value=1 off-value=0 @change="sendChange()"></el-switch>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';

  export default {
    data() {
      // 邮箱验证
      let emailValid = (rul, val, cb) => {
        if (val === '') {
          cb(this.$t('overseaForget.enterEmail'));
        } else if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val)) {
          // 不满足邮箱的格式，出现错误提示信息
          cb(this.$t('overseaForget.invalidEmail'))
        }else{
          cb();
        }
      };
      return {
        loading: false,
        isShow: false,
        form: {
          email: '',
          status: 0
        },
        formrules: {
          email: [
            { validator: emailValid, trigger: 'blur' }
          ]
        },
        emails: []
      };
    },

    mounted() {
      this.getEmails();
    },

    methods: {
      // 获取email
      getEmails() {
        axios.get(`${config.host}/merchant/get/email?format=cors`).then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            if(data.data.email.length != 0) {
              if (data.data.email.length) {
                this.emails = data.data.email.split(",");
              }
              this.form.status = "1";
              this.isShow = true;
            } else {
              this.form.status = "0";
              this.isShow = false;
            }
          } else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {
          this.$message.error(this.$t('setting.msg.m3'));
        })
      },

      // 点击删除
      delEmail(index) {
        if(this.emails.length <= 1) {
          // this.$message.error("至少存在一个邮箱");
          // return;
          this.open6((type) => {
            if(!type) {
              this.emails.splice(index, 1);
              let params = {
                email: this.emails.join(","),
                status: this.form.status,
                format: 'cors'
              };
              this.modifyEmail(params);
            }
          });
        } else {
          this.emails.splice(index, 1);
          let params = {
            email: this.emails.join(","),
            status: this.form.status,
            format: 'cors'
          };
          this.modifyEmail(params);
        }
      },

      // 点击添加
      addEmail() {
        this.$refs['form'].validate((valid) => {
          if(valid) {
            // 判断该邮箱是否已经存在
            for(let i = 0; i < this.emails.length; i++) {
              // 已有该邮箱
              if(this.emails.indexOf(this.form.email) != -1) {
                this.$message.error(this.$t('setting.msg.m5'));
                return;
              } else {
                break;
              }
            }
            // 邮箱个数上限为10
            if(this.emails.length >= 10) {
              this.$message.error(this.$t('setting.msg.m6'));
            } else {
              this.emails.push(this.form.email);
              let params = {
                email: this.emails.join(","),
                status: this.form.status,
                format: 'cors'
              }
              this.modifyEmail(params);
              setTimeout(() => {
                window.location.reload();
              }, 0)
            }
          }
        })
      },

      // 是否往邮箱发送交易报表
      sendChange() {
        if(this.emails.length) {
          let params = {
            email: this.emails.join(","),
            status: this.form.status,
            format: 'cors'
          };
          this.modifyEmail(params)
        } else {
          this.form.status = 0;
        }

      },

      // 删除，添加邮箱的修改邮箱操作操作
      modifyEmail(params) {
        axios.post(`${config.host}/merchant/add/email`, params).then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            // 删除成功，将返回的新邮箱数据更新到this.emails
            if (data.data.email.length) {
              this.emails = data.data.email.split(",");
            } else {
              this.emails = []
            }
          } else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {
          this.$message.error(this.$t('common.modFailed'));
        })
      },

      // 弹框提示
      open6(cb) {
          this.$confirm(this.$t('setting.tip.m1'), {
          confirmButtonText: this.$t('shopmng.dialog.ok'),
          cancelButtonText: this.$t('shopmng.dialog.cancel'),
          type: 'warning',
          center: true
        }).then(() => {
          // 点击确认关闭开关（这里应该为接口返回已删除后再关闭开关）
          this.form.status = '0';
          this.isShow = false;
          cb(0);
        }).catch(() => {
          // 点击取消保持开关开着
          this.form.status = '1';
          this.isShow = true;
          cb(1)
        });
      }

    }
  };
</script>

<style lang="scss">
  .settings {
    .el-button .el-button--default .el-button--primary {
      background-color: #FE9B20;
    }
    .panel-select-input-230 {
      width: 230px;
    }
    .panel-header__auto{
      border-top: none;
    }
    .gray-explain {
      color: #FF8100;
      font-size: 14px;
      margin-top: 10px;
      margin-left: 20px;
      margin-bottom: 20px;
    }
    .el-form-item__label {
      color: #2f323a;
    }
    .el-switch__core {
      margin-left: 20px;
    }
    .panel-header-btn {
      display: inline-block;
      float: none;
    }
    .panel-header-btn {
      margin-left: 18px;
    }
    .el-input.is-disabled .el-input__inner {
      color: #2f323a;
      background-color: transparent;
      border: none;
      font-size: 16px;
    }
    .edit {
      display: inline-block;
      float: none;
      color: #FE9B20;
      cursor: pointer;
    }
    .myform_wrapper {
      padding-bottom: 2px;
    }
    .emails-box {
      // height:150px;
      padding:20px 0 22px;
      margin:0 29px 12px 20px;
      border-top: 1px solid rgba(232,231,230,1);
      border-bottom: 1px solid rgba(232,231,230,1);
      display: flex;
      h5 {
        font-size:16px;
        color:rgba(47,50,58,1);
        line-height:22px;
        margin-right: 20px;
      }
      .emails-list {
        flex: 1;
        li {
          font-size:14px;
          color:rgba(138,140,146,1);
          line-height:20px;
          margin-bottom: 15px;
          span {
            padding-left: 30px;
            font-size:12px;
            color:rgba(231,59,72,1);
            line-height:17px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

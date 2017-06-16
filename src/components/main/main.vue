<template>
  <div>
    <sidebar></sidebar>
    <div class="main">
      <div class="header">
        <div class="user_wrapper">
          <div class="user_name">
            {{shop.shopname?'Welcome, '+shop.shopname:''}}
          </div>
          <a href="javascript:;" @click="logout">
            <div class="user_operation">
              <i class="icon-ic_logout"></i>
              <span class="text">退出</span>
            </div>
          </a>
        </div>
      </div>
      <router-view :shop="shop" @associate="associate" @showDetail="showDetail" @unbind="unbind"></router-view>
    </div>
    <el-dialog title="关联分店" v-model="visible" class="mydialog">
      <el-form :model="form" :rules="formrules" ref="form">
        <div class="desc">
          <p>请输入您的分店信息，以做关联。</p>
          <p>如您的分店还没有钱方好近商户的账号，请联系客服或</p>
          <p>者业务员为您的分店入网。</p>
        </div>
        <el-form-item label="分店账号" prop="account">
          <el-input v-model="form.account" size="small" placeholder="请输入分店登录手机号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input type="password" v-model="form.password" size="small" placeholder="请输入分店登录密码"></el-input>
        </el-form-item>
        <el-form-item label="收款人" prop="bankuser">
          <el-input v-model="form.bankuser" size="small" placeholder="请输入分店收款人姓名"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankaccount">
          <el-input v-model="form.bankaccount" size="small" placeholder="请输入分店收款银行卡号"></el-input>
        </el-form-item>
      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <div @click="visible = false" class="cancel">取 消</div>
        <div @click="submit" class="submit"><i class="el-icon-loading" v-show="iconShow"></i>确 定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sidebar from '../../components/sidebar/sidebar.vue';
import axios from 'axios';
import config from '../../config';

export default {
  data() {
    return {
      iconShow: false,
      visible: false,
      shop: {
        shopname: '',
        bankaccount: '',
        uid: ''
      },
      form: {
        account: '',
        password: '',
        payee: '',
        cardno: ''
      },
      formrules: {
        account: [
          { required: true, message: '请输入分店登录手机号!' }
        ],
        password: [
          { required: true, message: '请输入分店登录密码!' }
        ],
        bankuser: [
          { required: true, message: '请输入分店收款人姓名!' }
        ],
        bankaccount: [
          { required: true, message: '请输入分店收款银行卡号!' }
        ]
      },
      detailData: {}
    };
  },
  components: {
    sidebar
  },
  created() {
    this.$store.dispatch('getShopList');
    this.getData();
  },
  methods: {
    // 退出登录
    logout() {
      axios.get(`${config.host}/merchant/logout`).then((res) => {
        let data = res.data;
        if (data.respcd === config.code.OK) {
          this.$router.push("/login");
        } else {
          this.$message.error(data.respmsg);
        }
      }).catch(() => {
        this.$message.error('请求失败');
      });
    },

    getData() {
      axios.get(`${config.host}/merchant/info`)
        .then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            this.shop = {
              shopname: data.data.shopname,
              mobile: data.data.mobile,
              uid: data.data.uid
            };

          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.$message.error('网络错误!');
        });
    },

    associate() {
      this.visible = true;
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if(valid) {
          this.iconShow = true;
          axios.post(`${config.host}/merchant/sub/bind`, this.form)
          .then((res) => {
            this.iconShow = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.$message({
                type: 'success',
                message: '绑定成功!'
              });
              this.visible = false;
              this.$refs['form'].resetFields();
              this.$store.dispatch('getPageShopData');
              this.$store.dispatch('getShopList');
            } else {
              this.$message.error(data.resperr);
            }
          });
        }
      });
    },
    showDetail(type, data) {
      this.detailData = data;
      this.detailData.type = type;
    },
    unbind(uid) {
      this.$confirm('是否要删除此分店?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '关闭'
      })
      .then(() => {
        axios.get(`${config.host}/merchant/sub/remove`, {
          params: {
            sub_uid: uid
          }
        })
        .then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            this.$message({
              type: 'success',
              message: '解绑成功!'
            });
            this.$store.dispatch('getPageShopData');
            this.$store.dispatch('getShopList');
          } else {
            this.$message.error(data.resperr);
          }
        })
        .catch(() => {
          this.$message.error('解绑失败!');
        });
      }).catch(() => {
        console.log("取消");
      });
    }
  }
};
</script>

<style lang="scss">
  @import "../../assets/scss/dialog.scss";

  .responsive_img {
    max-width: 100%;
    height: auto;
  }
  .main {
    padding-left: 220px;
    min-height: 100%;
    @at-root .header {
      display: flex;
      height: 50px;
      background-color: #FE9B20;
      justify-content: flex-end;
      align-items: center;
      color: #fff;
    }
    @at-root .user_wrapper {
      display: flex;
      align-items: center;
      @at-root .user-img__wrapper {
        width: 35px;
        height: 35px;
        background-color: #ccc;
        border-radius: 50%;
        margin-right: 14px;
      }
      @at-root .user_name {
        margin-right: 20px;
      }
      @at-root .user_operation {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F39118;
        width: 123px;
        height: 50px;
        cursor: pointer;
        transition: .3s cubic-bezier(.645,.045,.355,1);
        &:hover {
          box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.12);
        }
        .icon-ic_logout {
          font-size: 22px;
          margin-right: 10px;
        }
      }
    }
  }
</style>

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
      <router-view :shop="shop"></router-view>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import config from '../../config';
import { getRole } from '../../common/js/util';
import Store from '../../common/js/store';
import sidebar from '../../components/sidebar/sidebar.vue';

export default {
  data() {
    return {
//      iconShow: false,
//      visible: false,
      shop: {
        shopname: '',
        bankaccount: '',
        uid: ''
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
      }
    };
  },
  components: {
    sidebar
  },
  created() {
    this.$store.dispatch('getShopList');
    this.$store.dispatch('getMemberTotal');
    this.getData();
  },
  methods: {
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

    getData() {
      axios.get(`${config.host}/merchant/info`)
        .then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            // 本地调试或者刷新页面时设置role
            if(!Store.get('role')) {
              let val = getRole(data.data);
              Store.set('role', val);
            }

            this.shop = {
              shopname: data.data.shopname,
              mobile: data.data.mobile,
              uid: data.data.uid
            };
            if(data.data.cate === 'submerchant') {
                Object.assign(this.shop, {
                  address: data.data.address,
                  bankaccount: data.data.bankaccount,
                  headbankname: data.data.headbankname, // 总行名称
                  bankname: data.data.bankname, // 支行名称
                  bankuser: data.data.bankuser, // 持卡人
                  telephone: data.data.telephone, // 手机号
                  cate: data.data.cate, // 商户分类
                  country: data.data.country // 国家地区
                })
            }
          } else {
            this.$message.error(data.respmsg);
          }
        })
        .catch(() => {
          this.$message.error('网络错误!');
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

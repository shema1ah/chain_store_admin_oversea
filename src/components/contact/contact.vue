<template lang="html">
  <!-- <h1>contact us</h1> -->
  <div class="contact">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$t('nav.contact')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">{{$t('nav.contact')}}</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="panel-body-phone panel-body-con-box">
          <h5>{{$t('contact.phone')}}:</h5>
          <div class="panel-body-con">
            <!-- <p>+853 2613 9299</p>
            <p>+853 2613 9299</p> -->
            <p v-for="tel in tels">{{ tel.val }}</p>
          </div>
        </div>
        <div class="panel-body-email panel-body-con-box">
          <h5>{{$t('contact.email')}}:</h5>
          <div class="panel-body-con">
            <!-- <p>+853 2613 9299</p>
            <p>+853 2613 9299</p> -->
            <p v-for="email in emails">{{ email.val }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '../../config';

export default {
  data() {
    return {
      tels: [
        { val: "111111" },
        { val: "222222" }
      ],
      emails: [
        { val: "3333333" },
        { val: "4444444" }
      ]
    }
  },

  mounted() {
    this.getContact();
  },

  methods: {
    getContact() {
      // 获取相关的联系方式
      // /mchnt/user/csinfo
      axios.get(`${config.ohost}/mchnt/user/csinfo?format=cors`)
      .then((res) => {
        console.log(res.data)
      }).catch(() => {
        console.log('catch')
      })

    }
  }
}
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
  .panel-body {
    padding: 2px 0 0 21px;
    .panel-body-con-box {
      display: flex;
      padding: 35px 0 15px;
      h5 {
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(38,36,36,1);
        line-height:16px;
      }
      .panel-body-con {
        margin-left: 30px;
        p{
          font-size:14px;
          color:rgba(152,152,158,1);
          line-height:14px;
          padding-bottom:20px;
        }
      }
    }
  }
</style>

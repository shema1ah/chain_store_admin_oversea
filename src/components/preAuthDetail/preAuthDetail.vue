<template>
  <div class="preAuthDetail" v-loading="loading" :element-loading-text="$t('common.loading')">
    
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <span></span>
        <el-breadcrumb-item :to="{ path: '/main/preAuth' }">{{$t('preAuth.message.m5')}}</el-breadcrumb-item>
        <el-breadcrumb-item >{{$t('preAuth.message.m9')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
 
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">{{$t('preAuth.message.m9')}}</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="info_wrapper">
          <!-- 创建时间 -->
          <div class="info">
            <div class="info__title">{{$t('preAuth.message.m13')}}</div>
            <div class="info__desc">{{ toDetail.sysdtm }}</div>
          </div>
          <!-- 店铺名称 -->
          <div class="info">
            <div class="info__title">{{$t('tradeMng.table.shopName')}}</div>
            <div class="info__desc">{{ toDetail.username }}</div>
          </div>
          <!-- 收银员 -->
          <div class="info">
            <div class="info__title">{{$t('tradeMng.table.operator')}}</div>
            <div class="info__desc">{{ toDetail.opuser }}</div>
          </div>
          <!-- 订单类型 -->
          <div class="info">
            <div class="info__title">{{$t('preAuth.message.m14')}}</div>
            <div class="info__desc">{{ toDetail.busicdInfo }}</div>
          </div>
          <!-- 业务订单号 -->
          <div class="info">
            <div class="info__title">{{$t('preAuth.message.m15')}}</div>
            <div class="info__desc">{{ toDetail.chnlsn }}</div>
          </div>
          <!-- 订单金额 -->
          <div class="info">
            <div class="info__title">{{$t('preAuth.message.m16')}}</div>
            <div class="info__desc">{{ toDetail.totalAmt | formatNumber }}</div>
          </div>
          <!-- 订单状态 -->
          <div class="info">
            <div class="info__title">{{$t('preAuth.message.m17')}}</div>
            <div class="info__desc">{{ toDetail.statusStr }}</div>
          </div>
          <!-- 交易流水号 -->
          <div class="info">
            <div class="info__title">{{$t('preAuth.message.m18')}}</div>
            <div class="info__desc">{{ toDetail.origssn ? toDetail.syssn + '(' + $t('tradeMng.detail.syssn2') + ':' + toDetail.origssn + ')' : toDetail.syssn }}</div>
          </div>
          <!-- 扣款金额 -->
          <div class="info">
            <div class="info__title">{{$t('preAuth.message.m19')}}</div>
            <div class="info__desc">{{ toDetail.tradeTxamt | formatNumber }}</div>
          </div>
        </div>
      </div>
    </div>
 
  </div>

</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import Store from '../../common/js/store';

  export default {
    data() {
      return {
        lang: config.lang,
        role: Store.get('role') || {},
        loading: false,
        toDetail: {
          sysdtm: '',
          username: '',
          opuser: '',
          busicdInfo: '',
          chnlsn: '',
          totalAmt: '',
          statusStr: '',
          origssn: '',
          syssn: '',
          tradeTxamt: ''
        }
      };
    },
    created() {
      this.detail();
    },
    methods: {
      // 获取交易详情
      detail() {
        let sysdtm = decodeURI(this.$route.query.sysdtm);
        let username = decodeURI(this.$route.query.username);
        let opuser = decodeURI(this.$route.query.opuser);
        let busicdInfo = decodeURI(this.$route.query.busicdInfo);
        let chnlsn = decodeURI(this.$route.query.chnlsn);
        let totalAmt = decodeURI(this.$route.query.totalAmt);
        let statusStr = decodeURI(this.$route.query.statusStr);
        let origssn = decodeURI(this.$route.query.origssn);
        let syssn = decodeURI(this.$route.query.syssn);
        let tradeTxamt = decodeURI(this.$route.query.tradeTxamt);
        this.toDetail.sysdtm = sysdtm;
        this.toDetail.username = username;
        this.toDetail.opuser = opuser;
        this.toDetail.busicdInfo = busicdInfo;
        this.toDetail.chnlsn = chnlsn;
        this.toDetail.totalAmt = totalAmt;
        this.toDetail.statusStr = statusStr;
        this.toDetail.origssn = origssn;
        this.toDetail.syssn = syssn;
        this.toDetail.tradeTxamt = tradeTxamt;
        // console.log(sysdtm);
        // console.log(username);
        // console.log(opuser);
        // console.log(busicdInfo);
        // console.log(chnlsn);
        // console.log(totalAmt);
        // console.log(statusStr);
        // console.log(syssn);
        // console.log(tradeTxamt);
      }
    }
  };
</script>

<style lang="scss">
</style>

<template>
  <router-view />
</template>
<script>
  import config from './config';
  import Store from './common/js/store';
  export default {
    created() {
      // 设置api地址
      this.setConfig();

      document.title = this.$t('login.head');
    },
    methods: {
      // 设置config
      setConfig() {
        let uri = {};
        let u = location.hostname;
        let pro = location.protocol;
        // 本地调试
        if (process.env.NODE_ENV === 'development') {
          //  u = 'qa.qfpay.net';
           uri = {

            // host: `https://sh.${u}`,
            host: `https://test-sh-db.qfapi.com`,
            //  host: `http://172.100.108.211:9099`,

            // oHost: `https://o.${u}`,
            oHost: `https://test-o-db.qfapi.com`,
            // oHost: `http://172.100.108.190:7200`,

            // payHost: `https://openapi.${u}`,
            payHost: `https://openapi-kh.qfapi.com`,
            uploadUrl: `${pro}//${u}/goods/overseas_upload`,
            downloadUrl: `${pro}//${u}/goods/overseas_error_download`,
            imgUpUrl: `https://test-o-db.qfapi.com/mchnt/tool/upfile`
           };
        } else {
          uri = {
            host: `${pro}//${u}`,
            oHost: `${pro}//${u.replace('sh', 'o')}`,
            payHost: `${pro}//${u.replace('sh', 'openapi')}`,
            uploadUrl: `${pro}//${u}/goods/overseas_upload`,
            downloadUrl: `${pro}//${u}/goods/overseas_error_download`,
            imgUpUrl: `${pro}//${u.replace('sh', 'o')}/mchnt/tool/upfile`,
            downzipUrl: `${pro}//${u}/goods/overseas_downlaod_QRcode`
          }
        }
        Object.assign(config, uri);
      }
    }
  }
</script>
<style lang="">
.qr-in-label .el-form-item__label{
  color: #282B2D;
  font-size: 14px;
}
.dc-cate-table .el-table__body-wrapper{
  height: calc(100vh - 350px);
  overflow: hidden;
  overflow-y: scroll;
}
.dc-pro-table .el-table__body-wrapper{
  height: calc(100vh - 400px);
  overflow: hidden;
  overflow-y: scroll;
}
</style>

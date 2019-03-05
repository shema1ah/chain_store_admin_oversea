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
        let [uri, u] = [];
        // 本地调试
        if(process.env.NODE_ENV === 'development') {
          u = 'qa.qfpay.net';
          uri = {
            host: `https://sh.${u}`,
            // host: `http://172.100.108.154:9099`,
            ohost: `https://o.${u}`,
            // ohost: `http://172.100.108.190:7200`,
            payHost: `https://openapi.${u}`,
          };
        }else if(process.env.NODE_ENV === 'test') {
          // 独立包
          uri = {
            host: `http://sh-test.qfapi.com`,
            ohost: `http://o-test.cimb.com`,
            payHost: `http://openapi-test.cimb.com`,
          };
        }else if(location.hostname.includes('jp.qfapi')) {
          // 日本独立包
          uri = {
            host: `https://sh-jp.qfapi.com`,
            ohost: `https://o-jp.qfapi.com`,
            payHost: `https://openapi-jp.qfapi.com`,
          };
        }else {
          uri = Store.get('hosts') || {
            host: `https://sh.qfpay.com`,
            ohost: `https://o.qfpay.com`,
            payHost: `https://openapi.qfpay.com`,
          };
        }
        Object.assign(config, uri);
      },
    }
  }
</script>

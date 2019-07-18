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
            //  host: `http://172.100.108.211:9099`,
             oHost: `https://o.${u}`,
             // oHost: `http://172.100.108.190:7200`,
            //  payHost: 'api'
             payHost: `https://openapi.${u}`,
           };

        } else if(location.hostname.includes('kh.qfapi')) {
          // 柬埔寨环境
          uri = {
            host: `https://sh-kh.qfapi.com`,
            oHost: `https://o-kh.qfapi.com`,
            payHost: `https://openapi-kh.qfapi.com`,
          };
        }else {
          uri = Store.get('hosts') || {
            host: `https://sh.qfpay.com`,
            oHost: `https://o.qfpay.com`,
            payHost: `https://openapi.qfpay.com`,
          };
        }
        Object.assign(config, uri);
      }
    }
  }
</script>

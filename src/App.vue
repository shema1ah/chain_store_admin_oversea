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
        if (process.env.NODE_ENV === 'development') {
           u = 'qa.qfpay.net';
           uri = {

            // host: `https://sh.${u}`,
            host: `https://sh-kh.qfapi.com`,
            //  host: `http://172.100.108.211:9099`,

            // oHost: `https://o.${u}`,
            oHost: `https://o-kh.qfapi.com`,
            // oHost: `http://172.100.108.190:7200`,

            // payHost: `https://openapi.${u}`,
            payHost: `https://openapi-kh.qfapi.com`,

           };

        } else {
          let u = location.hostname;
          let pro = location.protocol;
          uir = {
            host: `${pro}//${u}`,
            oHost: `${pro}//${u.replace('sh', 'o')}`,
            payHost: `${pro}//${u.replace('sh', 'openapi')}`
          }
        }
        Object.assign(config, uri);
      }
    }
  }
</script>

<template>
  <router-view />
</template>
<script>
  import config from './config';
  export default {
    created() {
      // 设置api地址
      this.setConfig();

      document.title = this.$t('login.head');
    },
    methods: {
      // 设置config
      setConfig() {
        let hostName = location.hostname;
        let uri;
        // 本地调试
        if(process.env.NODE_ENV === 'development') {
          let u = 'qa.qfpay.net';
          uri = {
            host: `https://sh.${u}`,
            // host: `http://172.100.108.154:9099`,
            ohost: `https://o.${u}`,
            // ohost: `http://172.100.108.190:7200`,
            payHost: `https://openapi.${u}`
          };
        }else {
          if(hostName.indexOf('-') > -1) {
            let len = hostName.split('-');

            let u = len.slice(1 - len.length).join('-');
            uri = {
              host: `https://sh-${u}`,
              ohost: `https://o-${u}`,
              payHost: `https://openapi-${u}`
            };
          }else if(hostName.indexOf('.qfpay') > -1) {
            let len = hostName.split('.');

            let u = len.slice(1 - len.length).join('.');
            uri = {
              host: `https://sh.${u}`,
              ohost: `https://o.${u}`,
              payHost: `https://openapi.${u}`
            };
          }else {
            let u = 'qa.qfpay.net';
            uri = {
              host: `https://sh.${u}`,
              ohost: `https://o.${u}`,
              payHost: `https://openapi.${u}`
            };
          }
        }

        Object.assign(config, uri);
      },
    }
  }
</script>

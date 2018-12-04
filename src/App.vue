<template>
  <router-view />
</template>
<script>
  import config from './config';
  export default {
    created() {
      // 设置api地址
      this.setConfig();
      console.log(config, 555)

      document.title = this.$t('login.head');
    },
    methods: {
      // 设置config
      setConfig() {
        let hostName = location.hostname;

        let uri;
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
        Object.assign(config, uri);
      },
    }
  }
</script>

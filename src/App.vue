<template>
  <router-view />
</template>
<script>
  import { getCookie } from './common/js/util';
  import Store from './common/js/store';
  export default {
    created() {
      document.title = this.$t('login.head');
      // cookie存在跳转首页
      if(getCookie('sessionid') && Store.get('flag') === false) {
        this.$router.push('/main/index');
      }
    }
  }
</script>

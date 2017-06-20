<template>
  <router-view />
</template>
<script>
  import { getCookie } from 'common/js/util';
  export default {
    created() {
      // cookie存在跳转首页
      if(getCookie('sessionid')) {
        this.$router.push('/main/index');
      }
    }
  };

</script>

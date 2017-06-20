<template>
  <router-view />
</template>
<script>
  import { getCookie } from 'common/js/util';
  import Store from 'common/js/store';
  export default {
    created() {
      // cookie存在跳转首页
      if(getCookie('sessionid')) {
        let role = {
          type: 'chain',
          haiwai: false,
          single: false
        };
        Store.set('role', role);
        
        this.$router.push('/main/index');
      }
    }
  };

</script>

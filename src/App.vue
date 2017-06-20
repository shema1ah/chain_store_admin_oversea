<template>
  <router-view />
</template>
<script>
  import { getCookie } from 'common/js/util';
  import Store from 'common/js/store';
  export default {
    created() {
      if(!Store.get('role')) {
        let role = {
          type: 'chain',
          haiwai: false,
          single: false
        };
        Store.set('role', role);
      }

      // cookie存在跳转首页
      if(getCookie('sessionid')) {
        this.$router.push('/main/index');
      }
    }
  };

</script>

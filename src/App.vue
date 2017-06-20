<template>
  <router-view />
</template>
<script>
  import { getCookie } from 'common/js/util';
  import Store from 'common/js/store';
  export default {
    created() {
<<<<<<< HEAD
      if(!Store.get('role')) {
        let role = {
          type: 'chain',
          haiwai: false,
          single: false
        };
        Store.set('role', role);
      }

=======
      let role = {
        type: 'chain',
        haiwai: false,
        single: false
      };
      Store.set('role', role);
>>>>>>> 95da90f1f7abac3f1dc9d1acfe1c4974dabba96b
      // cookie存在跳转首页
      if(getCookie('sessionid')) {
        this.$router.push('/main/index');
      }
    }
  };

</script>

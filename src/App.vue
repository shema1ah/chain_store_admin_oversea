<template>
  <router-view />
</template>
<script>
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
        Store.set('flag', false);
      }
    }
  };

</script>

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
          currency: data.currency || '元',
          rate: data.rate || 100,
          single: false,
          isBaoshang: false,
          diancan: false
        };
        Store.set('role', role);
        Store.set('flag', false);
      }
    }
  };

</script>

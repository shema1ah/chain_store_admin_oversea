<template>
  <router-view :shop="shop">
    <!--<router-view name="createsubshop"></router-view> -->
  </router-view>
</template>
<script>
    export default {
      props: {
        shop: {
          type: Object
        }
      }
    };
</script>


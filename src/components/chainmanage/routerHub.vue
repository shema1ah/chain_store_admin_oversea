<template>
  <router-view :shop="shop" @associate="associate">
    <!--<router-view name="createsubshop"></router-view> -->
  </router-view>
</template>
<script>
    export default {
      props: {
        shop: {
          type: Object
        }
      },

      methods: {
        associate() {
          this.$emit('associate');
        }
      }
    };
</script>


<template>
  <router-view />
</template>
<script>
  export default {
    created() {
      document.title = this.$t('login.head');
    }
  }
</script>

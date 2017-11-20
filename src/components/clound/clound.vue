<template>
  <div class="clound">
    <iframe src="http://b.bigaka.com/welcome.do" frameborder="0" scrolling="no"></iframe>
  </div>

</template>
<script>
  export default {

    mounted() {
      let height = document.querySelector('body').clientHeight - 60;
      height = height > 600 ? height : 600;
      document.querySelector('iframe').height = height;
    }
  };
</script>
<style lang="scss">
.clound {
  flex: 1;
  overflow: hidden;
  iframe {
    width: 100%;
  }
}
</style>

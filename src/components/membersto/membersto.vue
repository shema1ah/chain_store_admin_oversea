<template>
  <div>
    <template v-if="$route.meta.keepAlive">
     <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
  
</template>

<script>
  export default {

  };
</script>

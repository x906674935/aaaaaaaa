<template>
  <div id="app">
    <!-- <goodsList></goodsList> -->
 
    <router-view></router-view>
  </div>
</template>

<script>
import page1 from 'views/page1'
import goodsList from 'views/goodsList'
export default {
  components : {
    page1,goodsList
  }
}
</script>

<style lang="less">

</style>

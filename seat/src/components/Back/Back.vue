<template>
  <div id="app-icon">
    <span v-if="this.icon==='back'" class="mui-icon mui-icon-back" @click="$router.go(-1)"></span>
    <span v-else-if="this.icon==='close'" class="mui-icon mui-icon-closeempty" @click="$router.go(-1)"></span>
  </div>
</template>

<script>
export default {
  name:"Back",
  props:['icon']
}
</script>


<style lang="stylus">
#app-icon
  position fixed
  left 8px
  // .mui-icon
  //   font-size 28px
  //   font-weight 700
</style>


<template>
  <div class="btn-container">
    <button class="submit ignore" @click.prevent="$emit('submit')">{{text}}</button>
  </div>
</template>
<script>
export default {
  props:{
    text:null
  }
}
</script>

<style lang="stylus">
.btn-container
  display flex
  align-items center
  padding 50px 10px
  .submit
    width 100%
    height 75px
    font-size 30px
    letter-spacing 2px
    font-weight 500
    box-shadow 1px 2px 5px rgba(42,41,41,.4)
</style>

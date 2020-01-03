<template>
  <div id="tab">
    <div class="tab-container">
      <div class="tab-item" :class="{'active':clickedIndex==index}" v-for="(item,index) in tabs" :key="index" @click="getPlanId(index,item)">
        {{item.description}}
      </div>
    </div>
  </div>
</template>
<script>
import {joinMember} from "../../api/index"
export default {
  data(){
    return {
      clickedIndex:null
    }
  },
  props:{
    tabs:null
  },
  watch:{
    tabs(){
      this.clickedIndex=null;
    }
  },
  methods:{
    getPlanId(index,item){
      this.clickedIndex=index; 
      this.$emit("change",item)  // 将选中项传递给父组件
    }
  }
}
</script>
<style lang="stylus" scoped>
#tab
  width 100%
  
  &:after
    content ""
    display block 
    clear both
  .tab-item
    float left
    width 46%
    margin 2%
    height  60px
    text-align  center
    border  1px solid #e1e1e1
    border-radius 5Px
    font-size 22px
    font-weight 500
    line-height 60px
    color #999
    &.active
      background-color #cf7c2e
      color #fff
</style>



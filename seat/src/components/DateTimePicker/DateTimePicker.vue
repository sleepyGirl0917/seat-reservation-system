<template>
<div id="date-time-picker">
    <div class="dp-picker-container">
    <div class="dp-header">
      <button class="btn-cancel">取消</button>
      <button class="btn-ok">确定</button>
    </div>
    <!-- <div class="dp-title" style="display:none">
      <h5 data-id="title-y">年</h5>
      <h5 data-id="title-m">月</h5>
      <h5 data-id="title-d">日</h5>
      <h5 data-id="title-h">时</h5>
      <h5 data-id="title-i">分</h5>
    </div> -->
    <div class="dp-body">
      <div id="picker-y" class="picker">
        <div class="picker-inner">
          <div class="picker-rule picker-rule-ft"></div>
          <ul class="picker-list">
            <li v-for="(item,i) in days" :class="{'highlight':i==0,'visible':i<3}" :key="i">{{item}}</li>
          </ul>
          <div class="picker-rule picker-rule-bg"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      shopOpenTime:null,
      shopCloseTime:null,
      starTimeMinute:null,
      starTimeHour:null,
      endTimeMinute:null,
      endTimeHour:null,
      date:null,
      hours:[],
      minutes:[],
      days:[1,2,3,4,5,6,7]
    }
  },
  props: {},
  methods:{

  }
};
</script>

<style lang="stylus" scoped>
#date-time-picker
  position fixed 
  z-index 10000
  bottom  0
  width  100%
  margin 0 -15px
  background-color  #f7f7f7
  
  .dp-picker-container
    width 100%
    height  500px
    .dp-header
      width 100%
      height 60px
      border-bottom  1px solid rgba(0,0,0,.1)
      button 
        position relative
        top 50%
        transform translateY(-50%)
        background transparent
        font-size 22px
        &:last-child
          float right
        &.btn-cancel
          color gray 
        &.btn-ok
          color blue

    .dp-body
      display flex
      justify-content center 
      align-items center
      position  relative
      width 100%
      height  440px
      .picker
        flex  1
        text-align center
        height  100%
        .picker-inner
          height  100%
          .picker-rule-ft  
            z-index  2 
            border-top  1px solid rgba(0,0,0,.1) 
            border-bottom  1px solid rgba(0,0,0,.1)  
          
          .picker-rule-bg  
            z-index  0 
          
          .picker-list, .picker-rule  
            box-sizing  border-box 
            position  absolute 
            width  100% 
            height  45px 
            left  0 
            top  50% 
          
          .picker-list 
            height 60%
            overflow scroll
            li
              font-size    20px
              line-height  45px 
              &.highlight
                color  #222
              &.highlight,
              &.visible
                visibility  visible

</style>


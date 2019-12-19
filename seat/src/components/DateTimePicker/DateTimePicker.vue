<template>
  <div id="time-picker">
    <div class="dp-container">
      <div class="box">
        <div class="choosedate">
          <span class="uni-input mui-icon-extra mui-icon-extra-calendar"> 2019-12-17 </span>
        </div>
        <!-- 日期弹窗 -->
        <div class="dp-picker-container">
          <div class="dp-header">
            <button class="btn-cancel">取消</button>
            <button class="btn-ok">确定</button>
          </div>
          <div class="dp-title" style="display:none">
            <h5 data-id="title-y">年</h5>
            <h5 data-id="title-m">月</h5>
            <h5 data-id="title-d">日</h5>
            <h5 data-id="title-h">时</h5>
            <h5 data-id="title-i">分</h5>
          </div>
          <div class="dp-body">
            <div id="picker-y" class="picker">
              <div class="picker-inner">
                <div class="picker-rule picker-rule-ft"></div>
                <ul class="picker-list">
                  <!-- <li class="highlight">{{new Date()|dateTimeFilter('dateOnly')}}</li>
                  <li class="visible">{{new Date()|dateTimeFilter('dateOnly')}}</li>
                  <li class="visible">{{new Date()|dateTimeFilter('dateOnly')}}</li> -->
                  <li v-for="(item,i) in days" :class="{'highlight':i==0}" :key="i">{{item}}</li>
                </ul>
                <div class="picker-rule picker-rule-bg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box" style="flex-direction: column;">
        <div class="choosetime">
          <div>开始时间</div>
          <div style="visibility: hidden;">-----</div>
          <div>结束时间</div>
          <div style="visibility: hidden;">-----</div>
          <div>时长</div>
        </div>
        <div class="choosetime">
          <div id="start-time" class="uni-input">12:00</div>
          <div>-----</div>
          <div id="end-time" class="uni-input">18:00</div>
          <div>-----</div>
          <div id="show-time" class="font-orange">6h</div>
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
      days:[1,2,3]
    }
  },
  props: {},
  methods:{

  }
};
</script>

<style lang="stylus" scoped>
#time-picker  
  width  100% 

  .dp-container  
   background-color  #efeff4 

   .box  
    background-color  #fff 
    margin  10px 0 
    border-radius  5Px 

    // .uni-input
    //  flex  1
    //  text-align center
    //  height  40px
    //  line-height  40px 
    //  font-size   24px 
    //  font-weight  500

    .choosedate  
      height  60px 
      display  flex 
      justify-content  center 
      align-items  center 
      font-size  24px
      text-align  center
      
    .choosetime  
      height  40px 
      display  flex 
      justify-content  space-around 
      align-items  center 

      >div  
       flex 1 
       text-align center
       font-family  '微软雅黑' 
       font-size  16px 
       height  40px 
       line-height  40px 

    .dp-picker-container
      position fixed 
      z-index 10000
      bottom  0
      width 100%
      margin 0 -15px
      border-top  solid 1px #ccc
      background-color  #eee
      box-shadow  0 -5px 7px 0 rgba(0,0,0,.1)
      font-size 18px

      .dp-header
        width 100%
        button 
          background transparent
          border none
          padding 15px
          font-size 20px
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
        height  200px
        .picker
          flex  1
          text-align center
          .picker-rule-ft  
            z-index  2 
            border-top  solid 1px rgba(0,0,0,.1) 
            border-bottom  solid 1px rgba(0,0,0,.1) 
          
          .picker-rule-bg  
            z-index  0 
          
          .picker-list, .picker-rule  
            box-sizing  border-box 
            padding  0 
            margin  -20px 0 0 
            width  100% 
            height  36px 
            line-height  36px 
            position  absolute 
            left  0 
            top  50% 
          
          .picker-list li
            &.highlight
              color  #222
            &.highlight,
            &.visible
              visibility  visible

</style>


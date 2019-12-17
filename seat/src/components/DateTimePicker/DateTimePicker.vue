<template>
  <div id="time-picker">
    <div class="dp_container">
      <div class="box">
        <div class="choosedate">
          <span class="uni-input mui-icon-extra mui-icon-extra-calendar"> 2019-12-17 </span>
        </div>
        <!-- 日期弹窗 -->
        <div class="dp_header" style="display:none">
          
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
          <div id="show-time" class="font_orange">6h</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {}
};
</script>

<style lang="stylus" scoped>
#time-picker  
  width  100% 

  .dp_container  
    background-color  #efeff4 

    .box  
      background-color  #fff 
      margin  10px 0 
      border-radius  5Px 

      .uni-input
        flex  1
        text-align center
        height  40px
        line-height  40px 
        font-size    24px 
        font-weight  500

      .choosedate  
        height  60px 
        display  flex 
        justify-content  center 
        align-items  center 
       
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

</style>


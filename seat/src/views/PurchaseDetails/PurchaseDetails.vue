<template>
  <div id="purchase-details">
    <div class="container">
      <div>
        <span>店铺名称:</span>
        <span>店铺名称</span>
      </div>
      <div>
        <span>时间段:</span>
        <span>20191210 12:00-19:30</span>
      </div>
      <div>
        <span>小计:</span>
        <span>&yen;4.5</span>
      </div>
      <div>
        <span>类型:</span>
        <span>订座</span>
      </div>
      <div>
        <span>支付方式:</span>
        <span>储值卡</span>
      </div>
      <div>
        <span>余额抵扣:</span>
        <span>- &yen;4.5</span>
      </div>
      <div>
        <span>实际支付:</span>
        <span>&yen;0</span>
      </div>
    </div>
    <div class="container">
      <div>支付时间：。。。</div>
      <div>订单编号：</div>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
#purchase-details
  .container
    background #fff
    border-top  1px solid rgba(88, 88,88,0.3) 
    border-bottom  1px solid rgba(88, 88,88,0.3) 
    margin 15px
      
    &:nth-child(1)
      padding-left 15px
      &>div
        display flex
        justify-content space-between
        align-items center
        padding-right 15px
        height  80px
        font-size  20px

        :nth-child(1)
          font-weight 600
        :nth-child(2)
          color #8f8f94
        &:not(:last-child)
          border-bottom 1px solid rgba(88, 88,88,0.3) 

    &:nth-child(2)
      padding 10px 15px
      &>div
        height  50px  
        line-height 50px
        font-size  18px
        font-weight  400
</style>


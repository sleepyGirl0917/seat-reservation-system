<template>
  <div id="order-item">
      <div class="order-title">{{orderData.order_date|dateTimeFilter('dateOnly')}}</div>
      <div class="order-item">
        <div class="order-info">
          <div>{{orderData.shop_name}}</div>
          <div>{{orderData.seat_info}}</div>
          <div class="small">
            时间：{{orderData.start_time|dateTimeFilter('timeOnly')}}-{{orderData.end_time|dateTimeFilter('timeOnly')}}
          </div>
        </div>
        <div class="order-bottom border-top">状态：{{orderData.order_status|orderStatusFilter}}</div>
        <div class="order-bottom navigate-right border-top" @click="$router.push(`/order_details/${orderData.order_id}`)">查看详情</div>
      </div>
  </div>
</template>
<script>
export default {
  props:{
    orderData:{}
  }
}
</script>
<style lang="stylus" scoped>
#order-item
  line-height 2.5
  .order-title 
    font-size 25px
    color #999
    text-align center
      
  .order-item 
    background #fff
    padding  0 25px

    .order-info 
      div 
        font-size 28px
        font-weight 500
        color #333

        &.small 
          font-size 26px
          color #999

    .order-bottom 
      font-size 25px
      color #999 !important

      &.border-top 
        border-top 1px solid rgba(80, 80, 80, 0.1)

    .navigate-right 
      position relative
      display block

      &:after
        right 0
</style>
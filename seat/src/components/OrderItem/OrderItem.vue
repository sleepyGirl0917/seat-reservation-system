<template>
  <div id="order-item">
      <div class="order-title">{{orderData.order_date|dateTimeFilter('dateOnly')}}</div>
      <div class="order-item">
        <div class="order-info">
          <p>{{orderData.shop_name}}</p>
          <p>{{orderData.seat_info}}</p>
          <p class="small">
            <span v-if="$route.path==='/order'">时间：</span>
            <span v-else>时间段：{{orderData.order_date|dateTimeFilter('dateOnly')}}</span>
            {{orderData.start_time|dateTimeFilter('timeOnly')}}-{{orderData.end_time|dateTimeFilter('timeOnly')}}
          </p>
        </div>
        <div 
          class="order-status" 
          :class="{'border-top':$route.path==='/order'}"
        >状态：{{orderData.start_time|orderStatusFilter}}</div>
        <a 
          v-if="$route.path=='/order'" 
          class="navigate-right border-top" 
          @click="$router.push(`/OrderDetails/${orderData.order_id}`)"
        >查看详情</a>
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
  .order-title 
        padding 15px 0
        font-size 20px
        color #999
        text-align center
      
      .order-item 
        background #fff
        padding  0 20px

        .order-info 
          p 
            font-size 20px
            color #333
            padding 15px 0
            margin 0

          .small 
            font-size 18px
            color #999

        .order-status, a 
          padding 10px 0
          font-size 14px
          color #999 !important

        .border-top 
          border-top 1px solid rgba(80, 80, 80, 0.1)

        .navigate-right 
          position relative
          display block

          &:after
            right 0
</style>
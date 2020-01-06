<template>
    <div id="purchase-item">
        <div class="order-box ignore">
            <div class="media navigate-right" @click="$router.push(`${$route.path}/details/${myData.order_id}`)">              
                <div class="media-object">
                    <img src="../../assets/img/ordered.png" />
                </div>
                <div class="media-body">
                <div>{{myData.shop_name}}</div>
                <div>
                    <!-- <p>{{myData.seat_info.slice(0,3)}}</p> -->
                    <p>{{myData.seat_type|seatTypeFilter}}</p>
                    <p>{{myData.pay_time|dateTimeFilter}}</p>
                    <p>支付类型：<span class="font_orange">{{myData.pay_type|payTypeFilter}}</span></p>
                </div>
                </div>           
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    props:{
      myData:{}
    },
    filters:{ // 局部过滤器：座位类型
        seatTypeFilter(val){
            if(val===0){
                return  '单人座';
            }else{
                return  '双人座';
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
#purchase-item
    .ignore
        border-radius  10px
    .order-box  
        position  relative 
        background  #fff 
        height 300px 
        margin  15px 15px 25px
        
        .media,
        .media .media-body  
            overflow  hidden 
        .media  
            display flex
            align-items center
            justify-content flex-start
            padding  0 65px 0 25px 
            height 100% 
            .media-object 
                width 80px
                img
                    width  100% 
                    height  100% 
                    display block
            .media-body
                padding-left 25px
                div
                    line-height 2.5
                    &:nth-child(1)
                        font-size   28px
                        font-weight 500
                    &:nth-child(2)>p
                        font-size  25px
                        margin 0
</style>


<template>
    <div id="purchase-item">
        <div class="order-box ignore">
            <div class="media">
                <div class="navigate-right" @click="$router.push(`${$route.path}/details/${myData.order_id}`)">
                    <img class="media-object float-left" src="../../assets/img/ordered.png" />
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
        height 150px 
        margin  15px 15px 25px
        
        .media,
        .media .media-body  
            overflow  hidden 
        .media  
            padding  15px 65px 15px 15px 
            height 150px 
            .media-object 
                margin 30px 15px 30px 0 
                width  60px 
                height  60px 
            .media-body
                * 
                    margin 10px 0 
                div
                    font-size   18px
                    font-weight 500
                    p
                        font-size  16px
                        font-weight 400
</style>


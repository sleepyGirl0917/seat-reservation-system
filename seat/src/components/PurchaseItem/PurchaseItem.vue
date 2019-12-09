<template>
    <div id="purchase-item">
        <div class="order-box ignore">
            <div class="media">
                <a class="navigate-right" @click="$router.push(`/OrderDetails/${myData.order_id}`)">
                    <img class="media-object float-left" src="../../assets/img/ordered.png" />
                    <div class="media-body">
                    <div>{{myData.shop_name}}</div>
                    <div>
                        <p>座位{{myData.seat_info}}</p>
                        <p>
                            日期：
                            {{myData.start_time|dateTimeFilter('dateOnly')}} 
                            {{myData.start_time|dateTimeFilter('timeOnly')}}-
                            {{myData.end_time|dateTimeFilter('timeOnly')}}
                        </p>
                        <p>状态：{{myData.start_time|orderStatusFilter}}</p>
                    </div>
                    </div>
                </a>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    data(){
        return  {
        }
    },
    props:{
      myData:{}
    },
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
        margin  10px 15px 25px
        
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
            .media-body * 
                margin 10px 0 
</style>


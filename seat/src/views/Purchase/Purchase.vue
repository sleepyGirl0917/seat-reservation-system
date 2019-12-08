<template>
    <div id="app-purchase" class="order-box">
        <div class="media">
            <a class="navigate-right" @click="$router.push(`/OrderDetails/${jsonData.order_id}`)">
                <img class="media-object float-left" src="../../assets/img/ordered.png" />
                <div class="media-body">
                <div>{{jsonData.shop_name}}</div>
                <div>
                    <p>座位{{jsonData.seat_info}}</p>
                    <p>日期：{{jsonData.start_time|dateTimeFilter('dateOnly')}} {{jsonData.start_time|dateTimeFilter('timeOnly')}}-{{jsonData.end_time|dateTimeFilter('timeOnly')}}</p>
                    <p>状态：{{jsonData.start_time|orderStatusFilter}}</p>
                </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return  {
            jsonData:{order_id:'1',start_time:'1',end_time:'1',shop_name:'1'}
        }
    },
    created(){
        // this.loadPurchaseAll();
    },
    methods:{
        async loadPurchaseAll(){
            // let result = await 
        }
    }
}
</script>

<style lang="stylus" scoped>
.order-box  
    position  relative 
    background  #fff 
    height 150px 
    
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


<template>
  <div id="order-detail">
    <order-item :orderData=jsonData[0] v-if="jsonData[0]"></order-item>
    <div class="btn-container">
      <button @click.prevent="deleteOrder">取消订单</button>
      <button @click.prevent="$router.go(-1)">返回</button>
    </div>
  </div>
</template>
<script>
import { getOrderDetails } from '../../api/index'
import { Indicator } from "mint-ui"
import { mapGetters } from 'vuex'
import OrderItem from '../../components/OrderItem/OrderItem'
export default {
  name: "Order",
  data() {
    return {
      jsonData:[]
    };
  },
  props:['order_id'],
  computed:{
    // 通过mapGetters获取store中state设置的变量
    ...mapGetters(['userInfo']),
  }, 
  components:{
    "order-item":OrderItem
  },
  created() {
    this.loadOrderDetails();
  },
  methods: {
    async loadOrderDetails(){
      Indicator.open('加载中...');
      let result=await getOrderDetails(this.userInfo.user_id,this.order_id);
      console.log(result)
      if(result.success_code==200){
        this.jsonData=result.data;
      }
      Indicator.close();
    },
    deleteOrder(){
      
    }
  }
};
</script>
<style lang="stylus">
#order-detail
  width 100%
  height  100%
  background-color #fff
  .btn-container
    width 100%
    display flex
    justify-content space-between
    position absolute
    bottom 20px
    button 
      flex  1
      margin 50px
      height  50px
      font-size 18px
      font-weight 500
</style>


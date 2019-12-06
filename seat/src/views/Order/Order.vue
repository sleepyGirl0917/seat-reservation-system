<template>
  <div id="app-order">
    <h1 class="title">我的预定</h1>
    <div class="order-container" v-for="(item,i) of jsonData" :key="i">
      <order-item :orderData=item></order-item>
    </div>
  </div>
</template>

<script>
import { getOrderAll } from '../../api/index'
import { Indicator } from "mint-ui"
import { mapGetters } from 'vuex'
import OrderItem from '../../components/Order/OrderItem'
export default {
  name: "Order",
  data() {
    return {
      jsonData:[]
    };
  },
  computed:{
    // 通过mapGetters获取store中state设置的变量
    ...mapGetters(['userInfo']),
  }, 
  components:{
    "order-item":OrderItem
  },
  created() {
    this.loadOrderInfoAll();
  },
  methods: {
    async loadOrderInfoAll(){
      Indicator.open('加载中...');
      let result=await getOrderAll(this.userInfo.user_id);
      console.log(result)
      if(result.success_code==200){
        this.jsonData=result.data;
      }
      Indicator.close();
    }
  }
};
</script>

<style lang="stylus">
#app-order 
  .title 
    font-size 22px
    font-weight 700
  
  .order-container 
    padding 0 15px
      
    
</style>


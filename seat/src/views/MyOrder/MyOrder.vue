<template>
  <div id="app-order">
    <div class="order-container" v-for="(item,i) of jsonData" :key="i">
      <order-item :orderData=item></order-item>
    </div>
  </div>
</template>

<script>
import { getOrderAll } from '../../api/index'
import { Indicator } from "mint-ui"
import { mapGetters } from 'vuex'
import OrderItem from '../../components/OrderItem/OrderItem'
export default {
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
  .order-container 
    padding 0 15px
      
</style>


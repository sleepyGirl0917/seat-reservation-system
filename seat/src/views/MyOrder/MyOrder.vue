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
import OrderItem from '../../components/OrderItem/OrderItem'
export default {
  data() {
    return {
      jsonData:[]
    };
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
      let result=await getOrderAll(this.$store.getters.uid);
      // console.log(result)
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
  width 100%
  height 100%
  padding-top 80px
  padding-bottom 80px
  .order-container 
    padding 0 15px
    margin-bottom 20px
      
</style>


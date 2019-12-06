<template>
  <div id="order-detail">
    <order-item :orderData=jsonData[0]></order-item>
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

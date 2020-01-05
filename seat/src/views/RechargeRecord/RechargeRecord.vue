<template>
  <div id="recharge-record">
    <ul v-for="(item,i) in jsonData" :key="i">
        <li>
            <span>会员卡</span>
            <span>{{item.recharge_type|payTypeFilter}}</span>
        </li>
        <li>
            <span>办卡日期</span>
            <span>{{item.recharge_date|dateTimeFilter()}}</span>
        </li>
        <li>
            <span>有效期</span>
            <span>{{item.deadline|dateTimeFilter()}}</span>
        </li>
        <li>
            <span>充值类别</span>
            <span>{{item.description}}</span>
        </li>
        <li>
            <span>支付金额</span>
            <span>&yen;{{item.price.toFixed(2)}}</span>
        </li>
    </ul>
    <btn-container :text="btnText" @submit="$router.go(-1)"></btn-container>
  </div>
</template>

<script>
import Button from "../../components/Button/Button"
import {getRechargeRecord} from "../../api/index"
export default {
  data(){
    return {
      jsonData:[],
      btnText:'返回'
    }
  },
  components: {
    "btn-container":Button
  },
  created(){
      this.loadRechargeRecord();
  },
  methods:{
    async loadRechargeRecord(){
      let result=await getRechargeRecord(this.$store.getters.uid);
      if(result.success_code==200){
        this.jsonData=result.data;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
#recharge-record
  width 100%
  height 100vh
  padding-top 60px

  ul
    margin 20px 30px
    padding 10px
    border-radius 5Px
    background-color #fff
    list-style none
    font-size 22px
    line-height 1.8
    li
      display flex
      align-items center
      justify-content space-between
      padding 10px
      span  
        &:first-child
            color #222
            font-weight 600
        &:last-child
            color #8f8f94
      
</style>
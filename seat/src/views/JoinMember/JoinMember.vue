<template>
  <div id="join-member">
    <div class="member-navbar">
      <div class="navbar-item" @click="currentTab=0" >
        <div class="navbar-item-title" :class="{'active':currentTab==0}">储值卡</div>
      </div>
      <div class="navbar-item" @click="currentTab=1" >
        <div class="navbar-item-title" :class="{'active':currentTab==1}">畅享卡</div>
      </div>
    </div>
    <div class="member-body">
      <tab-list :tabs="jsonData[this.currentTab]" @change="receivePlanId"></tab-list>
      <div class="text">
        <span v-if="currentTab==0">充值后消费抵扣，预定座位按时计费，当日各门店累计完成单时长超过6小时后，超出时段免费</span>
        <span v-if="currentTab==1">有效期内随时预定座位使用，不收取订座费用</span>
      </div>
    </div>
    <btn-container :text="btnText" @submit="confirm"></btn-container>
  </div>
</template>

<script>
import Button from "../../components/Button/Button"
import Tab from "../../components/Tabs/Tab"
import {getPlan,joinMember} from "../../api/index"
export default {
  data(){
    return {
      jsonData:[],
      btnText:'确认',
      currentTab:0,
      selectedId:null
    }
  },
  components: {
    "btn-container":Button,
    "tab-list":Tab
  },
  created(){
    this.loadPlan()
  },
  methods:{
    async loadPlan(){
      let result = await getPlan();
      if(result.success_code==200){
        this.jsonData=result.data;
      }
    },
    receivePlanId(id){
      this.selectedId=id;
    },
    confirm(){
      console.log('确认购买，去付款')
      // 跳转支付组件
      // 支付成功后，发送请求加入会员
      this.loadJoinMember();
    },
    async loadJoinMember(){
      let result = joinMember(this.$store.getters.uid,this.selectedId);
      if(result.success_code==200){
        Toast('充值成功');
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
#join-member
  width 100%
  height 100vh
  padding-top 60px
  .member-navbar
    width 100%
    .navbar-item
      display inline-block
      width 50%
      padding 0 50px
      height  60px
      text-align  center
      .navbar-item-title
        display inline
        padding 10px
        color #999
        line-height 60px
        font-size 22px
        font-weight 500
        &.active
          color #cf7c2e
          border-bottom solid 1px #cf7c2e          
  .member-body
    margin 20px 30px
    .text
      margin 100px 50px
      text-align center
      span 
        font-size 18px
        color #777
</style>


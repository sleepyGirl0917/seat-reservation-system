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
      <tab-list :tabs="jsonData[this.currentTab]" @change="receiveTab"></tab-list>
      <div class="text">
        <span v-if="currentTab==0">充值后消费抵扣，预定座位按时计费，当日各门店累计完成单时长超过6小时后，超出时段免费</span>
        <span v-if="currentTab==1">有效期内随时预定座位使用，不收取订座费用</span>
      </div>
    </div>
    <btn-container :text="btnText" @submit="confirm"></btn-container>
    <mt-popup v-model="popupVisible" position="middle" class="pay-card" v-if="popupVisible">
      <div class="popup-content">
        <div class="top">
          <span class="mui-icon mui-icon-closeempty" @click="popupVisible=false"></span>
          <!-- <span>使用密码</span> -->
        </div>
        <div class="middle">
          <div class="pay-shop">众独空间</div>
          <div class="pay-price">&yen;{{selectedItem.price.toFixed(2)}}</div>
          <div class="pay-type navigate-right">
            <span>支付方式</span>
            <span @click="choosePayType">{{selectedPayType}}</span>
          </div>
        </div>
        <div class="bottom">
          <button  class="pay-btn" @click.prevent="handlePay">确认支付</button>
        </div>
      </div>
    </mt-popup>
    <mt-popup v-model="popupVisible2" position="middle" :closeOnClickModal="false" class="pay-type-card" v-if="popupVisible2">
      <div class="popup-content">
        <div class="top">
          <span class="mui-icon mui-icon-back" @click="goBackPay"></span>
          <span>选择支付方式</span>
        </div>
        <div class="middle">
          <ul>
            <li v-for="(item,i) of payType" :key="i" @click="selectPayType(item)">
              <span>{{item}}</span>
              <span class="mui-icon mui-icon-checkmarkempty" v-if="selectedPayType==item"></span>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <span>+</span>
          <span>更多支付方式</span>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Button from "../../components/Button/Button"
import Tab from "../../components/Tabs/Tab"
import {getPlan,joinMember} from "../../api/index"
import {Toast} from "mint-ui"
export default {
  data(){
    return {
      jsonData:[],
      btnText:'确认',
      currentTab:0,
      selectedItem:{},
      popupVisible:false,
      popupVisible2:false,
      payType:['微信支付','支付宝支付','银联支付',],
      selectedPayType:'微信支付',
    }
  },
  components: {
    "btn-container":Button,
    "tab-list":Tab
  },
  created(){
    this.loadPlan();
  },
  methods:{
    async loadPlan(){
      let result = await getPlan();
      if(result.success_code==200){
        this.jsonData=result.data;
      }
    },
    receiveTab(item){
      this.selectedItem=item;
    },
    confirm(){
      console.log('确认购买，去付款')
      // 打开支付弹窗
      this.popupVisible=true;
    },
    handlePay(){
      // 支付成功后，接收到返回值
      console.log('支付成功')
      // 发送请求加入会员
      this.loadJoinMember();
    },
    async loadJoinMember(){
      let result = await joinMember(this.$store.getters.uid,this.selectedItem.plan_id);
      if(result.success_code==200){
        Toast('充值成功');
        this.$router.go(-1);
      }else{
        Toast('充值失败');
        this.popupVisible=false;
      }
    },
    choosePayType(){
      this.popupVisible=false;
      this.popupVisible2=true;
    },
    goBackPay(){
      this.popupVisible2=false;
      this.popupVisible=true;
    },
    selectPayType(item){
      this.selectedPayType=item;
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
  .mint-popup.pay-card{
    width:500px;
    height:400px;
    border-radius:5Px;
    .popup-content{
      width:100%;
      height:100%;
      line-height:50px;
      padding:5px 20px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      color:#222;
      .top{
        display:flex;
        align-items:center;
        justify-content:space-between;
        height:50px;
        span{
          font-size:18px;
          color:#999;
          &.mui-icon{
            font-size 30px
            font-weight 700 
          }
        }
      }
      .middle{
        text-align: center;
        .pay-shop{
          font-size:24px;
          height:50px;
        }
        .pay-price{
          font-size:50px;
          font-weight:700;
          height:100px;
          line-height:100px;
        }
        .pay-type{
          display:flex;
          align-items:center;
          position: relative;
          height:60px;
          font-size:22px;
          span{
            &:first-child{
              flex:1;
              text-align:left;
            }
            &:last-child{
              flex:3;
              font-weight:600;
              text-align:right;
              padding-right:50px;
            }
          }
        }
      }
      .bottom{
        margin:30px 0;
        text-align:center;
        button.pay-btn{
          width:50%;
          height:60px;
          border-radius:5Px;
          background-color:#45be5a;
          font-size:24px;
          color:#fff;
        }
      } 
    }
  }
  .mint-popup.pay-type-card
    width:400px;
    border-radius:5Px;
    max-height:80vh;
    .popup-content
      overflow:auto;
      padding:5px;
      font-size 22px
      line-height 60px
      .top
        position relative
        height  60px
        span 
          &:first-child
            position absolute
            top 50%
            transform translateY(-50%)
            left  0
            color #999
          &:last-child
            display block
            text-align center
      .middle>ul
        margin  10px 25px
        li
          border-bottom 1px solid #e1e1e1
          height  60px
          display flex
          align-items center
          justify-content space-between
          span.mui-icon.mui-icon-checkmarkempty
            font-size 30px
            font-weight 700    
      .bottom
        span  
          display inline-block
          &:first-child
            text-align center
            width 25px
          &:last-child
            color blue
</style>


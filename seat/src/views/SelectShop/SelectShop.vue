<template>
  <div id="select-shop" v-if="jsonData[0]">
    <div class="shop-container">
      <div class="shop-item" v-for="(item,i) of jsonData" :key="i">
        <div class="left">
          <div class="shop-name">{{item.shop_name}}</div>
          <div class="shop-address">{{item.address}}</div>
        </div>
        <div class="right">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input type="radio" name="shop" :value="item.shop_id" v-model="shopSelected" :checked="item.isChecked" @click="checked(i)"> 
        </div>
      </div>
    </div>
    <btn-container :text="btnText" @submit="toSelectSeat"></btn-container>
  </div>
</template>

<script>
  import Button from '../../components/Button/Button'
  import {Toast,Indicator} from 'mint-ui'
  import {getShopInfo} from '../../api/index'
  export default {
    data(){
      return {
        jsonData:[],
        shopSelected:null,
        btnText:'确定'
      }
    },
    components:{
      "btn-container":Button
    },
    created(){
      this.loadShopData();
    },
    methods:{
      async loadShopData(){
        Indicator.open('加载中')
        let result=await getShopInfo();
        // console.log(result)
        if(result.success_code==200){
          this.jsonData=result.data;
        }
        Indicator.close();
      },
      checked(i){
        // 取消所有选中项
        this.jsonData.forEach((item) => {
          item.isChecked = false;
        });
        // 设置当前input选中
        this.shopSelected = this.jsonData[i].shop_id;
        // 设置span的isChecked
        this.jsonData[i].isChecked = true;
      },
      toSelectSeat(){
        if(this.shopSelected){
          this.$router.push({
            path:'/select_seat',
            query:{shop_id:this.shopSelected}
          });
        }else{
          Toast('请选择店铺');
        }
      }

    }
  }
</script>

<style lang="stylus" scoped>
#select-shop
  width 100%
  padding-top 60px

  .shop-container
    background #fff
    border-top  1px solid rgba(88,88,88,0.3) 
    border-bottom  1px solid rgba(88,88,88,0.3) 
    padding-left 15px

    .shop-item
      display flex
      justify-content space-between
      align-items center
      padding-right 20px
      height  150px

      .left
        width 70%    
        &>div
          font-size 20px
          line-height 1.8
        .shop-name
          font-weight 500
          padding 10px 0
        .shop-address
          font-weight 400
          color #8f8f94  
          
      .right
        width 30%
        position relative
        text-align right
        input[type=radio]
          position  absolute
          display inline-block
          width  30px
          height 30px
          right  0
          opacity  0
          outline none
          cursor  pointer;
        .radio
          background-image url('../../assets/img/unchecked.svg')
          background-repeat  no-repeat
          background-size 100% 100%
          display inline-block
          vertical-align  middle
          width   30px
          height  30px
          cursor  pointer  
        .on 
          background-image url('../../assets/img/check-circle.svg')

      &:not(:last-child)
        border-bottom  1px solid rgba(88, 88,88,0.3) 

</style>


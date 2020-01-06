<template>
  <div id="contact" v-if="jsonData.length">
    <div v-for="(item,i) in jsonData" :key="i" class="shop-item">
      <div class="top">
        <div class="left">
          <img :src="item.pic_title" alt="">
        </div>
        <div class="right">
          <div>
            <span>店铺名称：</span>
            <span>{{item.shop_name}}</span>
          </div>
          <div>
            <span>营业时间：</span>
            <span>{{item.open_time}}-{{item.close_time}}</span>
          </div>
          <div>
            <span>联系地址：</span>
            <span>{{item.address}}</span>
          </div>
          <div>
            <span>联系电话：</span>
            <span>{{item.shop_phone}}</span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <img :src="item.pic_map" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {Indicator} from "mint-ui"
import {getShopInfo} from "../../api/index"
export default {
  data(){
    return {
      jsonData:[]
    }
  },
  created(){
    this.loadShopData();
  },
  methods:{
    async loadShopData(){
      Indicator.open('加载中')
      let result=await getShopInfo();
      if(result.success_code==200){
        this.jsonData=result.data;
      }
      Indicator.close();
    }
  }
}
</script>

<style lang="stylus" scoped>
#contact
  width 100%
  height 100%
  margin-top 60px
  .shop-item
    margin 20px 15px 30px
    .top
      display flex
      justify-content space-between
      align-items center
      width 100%
      height  250px
      .left
        width 25%
        img 
          width 100%
          height 100%
          display block 
      .right
        width 75%
        padding-left 2%
        div
          font-size 22px
          font-weight 500
          line-height 40px
          color #222
    .bottom
      img
        width 100%
        height 100%
        display block 
</style>


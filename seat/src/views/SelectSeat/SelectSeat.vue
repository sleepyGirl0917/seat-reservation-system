<template>
  <div id="select-seat">
    <div class="shop">店铺名</div>
    <time-picker></time-picker>
    <div class="seat-example ignore">
      <div class="example example-single">
        <img src="../../assets/img/seat/seat-single.png" alt="">
        <span>可选</span>
      </div>
      <div class="example example-sold">
        <img src="../../assets/img/seat/seat-sold.png" alt="">
        <span>已售</span>
      </div>
      <div class="example example-double">
        <img src="../../assets/img/seat/seat-double.png" alt="">
        <span>双人座</span>
      </div>
    </div>
    <div class="seat-container">
      <!-- 
        座位号用自定义属性 
        座位写2个组件
        根据shop_id，响应不同的组件 
        或者把座位表写在一个json中
       seat [
          'shop_1':[
            {id:1,status:single-kexuan,position:...},
          ]
        ]
        v-for=(item,i) of seat[shop_id]
        座位号：  item.id
        座位类型：item.status 
        座位定位：item.position
        class="item.status item.position" data-item.id(自定义属性)
      -->
      <div class="seat seat-single seat-bg1 seat-position-dz-1"></div>
      <div class="seat seat-double seat-bg4 seat-position-dz-2"></div>
    </div>
  </div>
</template>

<script>
import {Toast,Indicator,MessageBox} from 'mint-ui'
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker'
export default {
  data(){
    return {
      // 选择的座位
      selectedSeatInfo:{}
    }
  },
  components:{
    "time-picker":DateTimePicker
  },
  created(){

  },
  methods:{
    // 加载座位信息
    // 选择座位
    // 取消选座
    // 确认选座
  }
}
</script>

<style lang="stylus" scoped>
#select-seat
  width 100%
  min-height 100vh
  padding 60px 15px 0
  
  .seat-example
    display flex
    justify-content center
    align-items center
    padding 20px
    background-color #fff
    .example
      flex  1
      display flex
      justify-content center
      align-items center
      font-size 18px
      color #888
      img 
        height 30px
      span 
        display inline-block
        padding-left  10px

  .seat-container  
    position relative    
    .seat
      position absolute
      height  30px
      background-repeat  no-repeat
      background-size    100% 100%
    .seat-single
      width   30px
    .seat-double
      width   60px
    .seat-bg1
      background-image url('../../assets/img/seat/seat-single.png')
    .seat-bg2
      background-image url('../../assets/img/seat/seat-sold2.png')
    .seat-bg3
      background-image url('../../assets/img/seat/single-seat-choose.png')
    .seat-bg4
      background-image url('../../assets/img/seat/seat-double.png')
    .seat-bg5
      background-image url('../../assets/img/seat/double-seat-sold.png')
    .seat-bg6
      background-image url('../../assets/img/seat/double-seat-choose.png')
    // .seat-position-dz-1
    //   top  50px
    //   left 100px
    // .seat-position-dz-2
    //   top  20px
    //   left 30px

     
</style>


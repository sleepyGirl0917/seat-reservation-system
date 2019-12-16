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
      <div v-for="(item,i) in seatJson" :key="i">
        <div class="seat" :class="item.class" :style="item.style"></div>
      </div>
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
      selectedSeatInfo:{},
      // 座位表
      seatJson:[]
    }
  },
  components:{
    "time-picker":DateTimePicker
  },
  created(){
    this.axios.get("seat.json").then(res=>{
      if(res.data.code==200){//请求成功
        console.log(res.data.data)
        this.seatJson=res.data.data[1]
      }else{
        console.log("请求的数据不见了，去看一下你的json文件")
      }
    })
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

     
</style>


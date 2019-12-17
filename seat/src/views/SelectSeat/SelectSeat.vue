<template>
  <div id="select-seat">
    <div class="shop">（店铺名）众独空间：昙华林店</div>
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
    <div class="seat-outer-container">
      <div class="seat-inner-container">
        <div class="set-position">
          <div v-for="(item,i) in seatJson" :key="i" :class="item.class"></div>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <button class="submit ignore" @click.prevent="confirmSelect">确认选座</button>
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
      seatJson:[],
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
    confirmSelect(){
      console.log('确认选座')
    }
  }
}
</script>

<style lang="stylus" scoped>
#select-seat
  width 100%
  min-height 100vh
  padding 60px 15px 0
  
  .seat-example
    // margin  10px 0
    display flex
    justify-content center
    align-items center
    padding 20px
    background-color #fff
    .example
      flex  1
      text-align center
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

  .seat-outer-container  
    position relative  
    overflow hidden
    width    100%
    height   calc(100vh - 100px)
    .seat-inner-container
      position absolute
      width   100%
      // height  100%
      .set-position
        position relative
        overflow hidden
        width   100%
        min-height  1000px
        // height  100%
        margin  0 auto 
        .seat
          position absolute
          background-repeat  no-repeat
          background-size    100% 100%
        .seat-single
          width   30px
          height  30px
        .seat-double
          width   60px
          height  30px
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
  .btn-container   
    width    100% 
    position fixed
    z-index  1000
    bottom 20px   
    padding 15px 30px
    button.submit
      width 100%
      height  60px
      font-size 20px
      font-weight 500
      opacity 0.8
</style>


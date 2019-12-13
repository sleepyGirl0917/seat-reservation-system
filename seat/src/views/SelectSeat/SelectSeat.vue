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
  </div>
</template>

<script>
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker'
export default {
  data(){
    return {
      
    }
  },
  components:{
    "time-picker":DateTimePicker
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
</style>


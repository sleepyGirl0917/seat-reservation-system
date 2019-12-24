<template>
  <div id="select-seat">
    <div class="shop">（店铺名）众独空间：昙华林店</div>
    <div class="dp-container">
      <div class="box ignore">
        <div class="choosedate" @click="selectDate">
          <span class="uni-input mui-icon-extra mui-icon-extra-calendar">{{dateVal}}</span>
        </div>
      </div>
      <div class="box ignore" style="flex-direction: column;">
        <div class="choosetime">
          <div>开始时间</div>
          <div style="visibility: hidden;">-----</div>
          <div>结束时间</div>
          <div style="visibility: hidden;">-----</div>
          <div>时长</div>
        </div>
        <div class="choosetime">
          <div
            id="start-time"
            class="uni-input"
            @click="selectStartTime"
          >{{selectedStartValue?selectedStartValue:'请选择'}}</div>
          <div>-----</div>
          <div
            id="end-time"
            class="uni-input"
            @click="selectEndTime"
          >{{selectedEndValue?selectedEndValue:'请选择'}}</div>
          <div>-----</div>
          <div id="show-time" class="font_orange">{{duration}}h</div>
        </div>
      </div>
    </div>
    <div class="seat-example ignore">
      <div class="example example-single">
        <img src="../../assets/img/seat/seat-single.png" alt />
        <span>可选</span>
      </div>
      <div class="example example-sold">
        <img src="../../assets/img/seat/seat-sold.png" alt />
        <span>已售</span>
      </div>
      <div class="example example-double">
        <img src="../../assets/img/seat/seat-double.png" alt />
        <span>双人座</span>
      </div>
    </div>
    <div class="seat-outer-container">
      <div class="seat-inner-container">
        <div v-for="(item,i) in seatJson" :key="i" :class="[item.class,item.classBg]" @click="handleSelectSeat(i)"></div>
      </div>
    </div>
    <div class="btn-container">
      <button class="submit ignore" @click.prevent="confirmSelect">{{buttonText}}确认选座</button>
    </div>
    <!-- 日期时间选择器弹窗 -->
    <time-picker ref="pickerDate" :type="types[0]" @confirmDate="getDate"></time-picker>
    <time-picker ref="pickerStartTime" :type="types[1]" @confirmTime="getStartTime"></time-picker>
    <time-picker ref="pickerEndTime" :type="types[1]" @confirmTime="getEndTime"></time-picker>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from "mint-ui";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import { formatDate,checkTime, formatTime,parseTime } from "../../api/common";
import {getSeatSoldInfo} from '../../api/index';
export default {
  data() {
    return {
      seatJson: [], // 座位表
      seatSoldInfo:[], // 已被预定的座位
      selectedSeatInfo: null, // 选择的座位
      seatCount:0,  // 选中的座位数
      buttonText:null,
      types: ["date", "time", "datetime"], // 日期选择器类型
      dateVal: formatDate(new Date(),'yyyy-MM-dd'), // 默认为当前日期
      selectedStartValue: null,
      selectedEndValue: null,
      unit: 1000 * 60 * 30, // 时长单位：30分钟
      duration: 0,
      isToday:true, 
      openTime:'08:30',  // 开业时间
      closeTime:'23:00'  // 闭店时间
    };
  },
  components: {
    "time-picker": DateTimePicker
  },
  created() {
    this.loadSeatJson();
  },
  watch:{
    dateVal(){
      let today=formatDate(new Date(),'yyyy-MM-dd');
      if(this.dateVal==today){
        this.isToday=true
      }else{
        this.isToday=false
      }
    }
  },
  methods: {
    // 加载座位信息
    loadSeatJson(){
      this.axios.get("seat.json").then(res => {
        if (res.data.code == 200) {
          //请求成功
          console.log(res.data.data);
          this.seatJson = res.data.data[this.$route.query.shop_id];
        } else {
          console.log("请求的数据不见了，去看一下你的json文件");
        }
      });
    },
    // 打开日期时间选择器
    selectDate() {
      this.$refs.pickerDate.openPicker();
    },
    selectStartTime() {
      this.$refs.pickerStartTime.openPicker();
    },
    selectEndTime() {
      if (this.selectedStartValue) {
        this.$refs.pickerEndTime.openPicker();
      } else {
        Toast("请先选择开始时间");
      }
    },
    // 设置日期
    getDate(value) {
      if(value){
        this.dateVal = formatDate(value,'yyyy-MM-dd');
      }
    },
    // 设置开始时间
    getStartTime(value) {
      // 开始时间和结束时间要在开业时间范围内
      let new_value=parseTime(value),
          openTime=parseTime(this.openTime),
          closeTime=parseTime(this.closeTime);
      if(new_value<openTime||new_value>closeTime){
        return;
      }
      // 如果是当天，只能选择当前时间之后的开始时间
      // if(this.isToday){
      //   let now=formatTime(new Date());
      //   value<now?value=now:''
      // }
      this.selectedStartValue = value;
      let startValue = parseTime(value);
      let endValue = new Date(startValue + this.unit);
      this.getEndTime(formatTime(endValue));
    },
    // 设置结束时间
    getEndTime(value) {
      // 结束时间不能小于开始时间，不能大于闭店时间
      let new_value=parseTime(value),
          startValue=parseTime(this.selectedStartValue),
          closeTime=parseTime(this.closeTime);
      if(new_value>closeTime||new_value<=startValue||startValue==closeTime){
        return;
      }
      this.selectedEndValue = value;
      // 选择结束时间后，自动计算时长
      let length =parseTime(this.selectedEndValue) -parseTime(this.selectedStartValue);
      this.duration = Math.ceil(length / this.unit) * 0.5;
      this.loadSeatSoldInfo();
    },
    // 获取可选座位
    async loadSeatSoldInfo(){
      if (this.$route.query.shop_id){
        // 请求已被预定的座位
        let json = await getSeatSoldInfo(this.$route.query.shop_id,this.dateVal,this.selectedStartValue,this.selectedEndValue);
        console.log(json)
        if(json.success_code==200){
          this.seatSoldInfo = json.data;
          // 遍历seatJson
          this.seatJson.forEach((item)=>{
            if(this.seatSoldInfo.includes(item.seatId)){
              item.isSold=true;
              item.type==0?item.classBg='seat-bg2':item.classBg='seat-bg5';
            }else{
              item.isSold=false;
              item.type==0?item.classBg='seat-bg1':item.classBg='seat-bg3';
            }
          })
        }
      }
    },
    // 选择座位
    handleSelectSeat(i){
      if(!(this.selectedStartValue||this.selectedEndValue)){
        Toast('请选择时间');
        return;
      }
      if (this.seatCount==1&&i!=this.selectedSeatInfo){ 
        Toast('只能选1个座位');
      } else{
        if(this.seatCount==0){  // 选择座位
          this.seatJson[i].type==0?this.seatJson[i].classBg='seat-bg3':this.seatJson[i].classBg='seat-bg6';
          this.selectedSeatInfo=i;
          this.seatCount=1;
          this.buttonText=(this.seatJson[i].type==0?'单人座：':'双人座：')+this.seatJson[i].seatId+' ';
        }else if(i==this.selectedSeatInfo){ // 取消选座
          this.seatJson[i].type==0?this.seatJson[i].classBg='seat-bg1':this.seatJson[i].classBg='seat-bg4';
          this.selectedSeatInfo=null;
          this.seatCount=0;
          this.buttonText=null;
        }
      }
    },
    // 确认选座
    confirmSelect() {
      console.log("确认选座");
    }
  }
};
</script>

<style lang="stylus">
#select-seat {
  width: 100%;
  min-height: 100vh;
  padding: 60px 15px 0;
  background-color: #efeff4;

  .shop {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }

  .dp-container {
    width: 100%;
    height: 170px;

    .box {
      background-color: #fff;
      margin: 15px 0;

      .choosedate {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        text-align: center;
      }

      .choosetime {
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        >div {
          flex: 1;
          text-align: center;
          font-size: 18px;
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }

  .seat-example {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    line-height: 80px;
    background-color: #fff;

    .example {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: #888;

      img {
        height: 30px;
      }

      span {
        display: inline-block;
        padding-left: 10px;
      }
    }
  }

  .seat-outer-container {
    position: relative;
    overflow: auto;
    width: 100%;
    height: calc(100vh - 400px);

    .seat-inner-container {
      position: absolute;
      overflow: auto;
      width: 100%;
      height: 100%;

      .seat {
        position: absolute;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .seat-single {
        width: 30px;
        height: 30px;
      }

      .seat-double {
        width: 60px;
        height: 30px;
      }

      .seat-bg1 {
        background-image: url('../../assets/img/seat/seat-single.png');
      }

      .seat-bg2 {
        background-image: url('../../assets/img/seat/seat-sold2.png');
      }

      .seat-bg3 {
        background-image: url('../../assets/img/seat/single-seat-choose.png');
      }

      .seat-bg4 {
        background-image: url('../../assets/img/seat/seat-double.png');
      }

      .seat-bg5 {
        background-image: url('../../assets/img/seat/double-seat-sold.png');
      }

      .seat-bg6 {
        background-image: url('../../assets/img/seat/double-seat-choose.png');
      }
    }
  }

  .btn-container {
    width: 100%;
    position: fixed;
    z-index: 1000;
    bottom: 20px;
    padding: 15px 30px;

    button.submit {
      width: 100%;
      height: 60px;
      font-size: 20px;
      font-weight: 500;
      opacity: 0.8;
    }
  }

  span.mint-datetime-action {
    display: block;
    padding: 0 15px;

    &.mint-datetime-cancel {
      text-align: left;
      color: gray;
    }

    &.mint-datetime-confirm {
      text-align: right;
      color: blue;
    }
  }
}
</style>


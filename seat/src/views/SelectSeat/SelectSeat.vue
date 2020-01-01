<template>
  <div id="select-seat">
    <div class="shop">{{shopName}}</div>
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
    <btn-container :text="btnText" @submit="confirmSelect"></btn-container>
    <mt-popup class="show-detail" v-model="popupVisible" popup-transition="popup-fade" v-show="seatSoldDetail">
      <div class="popup-content">
        <p>座位：{{clickedSeatInfo}}</p>
        <p>已被预定的时段：</p>
        <p>{{seatSoldDetail}}</p>
      </div>
    </mt-popup>
    <!-- 日期时间选择器弹窗 -->
    <time-picker ref="pickerDate" :type="types[0]" @confirmDate="getDate"></time-picker>
    <time-picker ref="pickerStartTime" :type="types[1]" @confirmTime="getStartTime"></time-picker>
    <time-picker ref="pickerEndTime" :type="types[1]" @confirmTime="getEndTime"></time-picker>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from "mint-ui";
import Button from '../../components/Button/Button'
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import { formatDate,checkTime, formatTime,parseTime } from "../../api/common";
import {getSeatSoldInfo,getSeatSoldDetail} from '../../api/index';
export default {
  data() {
    return {
      shopName:null,
      seatJson: [], // 座位表
      seatSoldInfo:[], // 已被预定的座位
      seatSoldDetail:null, // 座位被预定的时段详情
      clickedSeatInfo:null, // 点击的已被预定座位号
      selectedSeatInfo: null, // 当前选中的座位号
      selectedSeatType:null,  // 当前选中的座位类型
      seatCount:0,  // 当前选中的座位数
      popupVisible:null, // 控制popupVisible的显示和隐藏
      buttonText:null,
      types: ["date", "time", "datetime"], // 日期选择器类型
      dateVal: formatDate(new Date(),'yyyy-MM-dd'), // 默认为当前日期
      selectedStartValue: null,
      selectedEndValue: null,
      unit: 1000 * 60 * 30, // 时长单位：30分钟
      duration: 0,
      isToday:true, 
      btnText:'确认选座',
      openTime:'08:30',  // 开业时间
      closeTime:'23:00'  // 闭店时间
    };
  },
  components: {
    "time-picker": DateTimePicker,
    "btn-container":Button
  },
  created() {
    this.loadSeatJson();
  },
  watch:{
    dateVal(){
      this.selectedStartValue=null;
      this.selectedEndValue=null;
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
          // console.log(res.data.data);
          this.shopName=res.data.data[this.$route.query.shop_id]['shop_name'];
          this.seatJson = res.data.data[this.$route.query.shop_id]['info'];
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
      // 把hh:mm格式字符串解析为单位为毫秒的时间
      let new_value=parseTime(value),
          openTime=parseTime(this.openTime),
          closeTime=parseTime(this.closeTime),
          startValue = parseTime(value); ;
      if(new_value<openTime||new_value>=closeTime){
        return;
      }
      // 如果是当天，只能选择当前时间之后的开始时间
      if(this.isToday){
        new_value<new Date().getTime()?value=formatTime(new Date()):''
      }
      this.selectedStartValue = value;    
      // 初始状态下,结束时间为空
      if(this.selectedEndValue==null){
        let endValue = new Date(startValue + this.unit);  // 默认结束时间比开始时间多半小时
        this.getEndTime(formatTime(endValue));
      }else{ // 设置结束时间后，限制修改的开始时间不能大于结束时间
        let endValue=parseTime(this.selectEndValue);
        if(new_value>=endValue){
          Toast('开始时间不能大于结束时间');
          return 
        }
      }
    },
    // 设置结束时间
    getEndTime(value) {
      // 开始时间和结束时间要在开业时间范围内，且结束时间不能小于开始时间
      let new_value=parseTime(value),
          openTime=parseTime(this.openTime),
          closeTime=parseTime(this.closeTime),
          startValue=parseTime(this.selectedStartValue);
      if(new_value<=openTime||new_value>closeTime||new_value<=startValue){
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
        let start_time=new Date(this.dateVal+' '+this.selectedStartValue).getTime(),
            end_time=new Date(this.dateVal+' '+this.selectedEndValue).getTime();
        // 请求已被预定的座位
        let result = await getSeatSoldInfo(this.$route.query.shop_id,this.dateVal,start_time,end_time);
        if(result.success_code==200){
          this.seatSoldInfo = result.data;
          // 遍历seatJson
          this.seatJson.forEach((item)=>{
            if(this.seatSoldInfo.includes(item.seatId)){
              item.isSold=true;
              item.type==0?item.classBg='seat-bg2':item.classBg='seat-bg5';
            }else{
              item.isSold=false;
              item.type==0?item.classBg='seat-bg1':item.classBg='seat-bg4';
            }
          })
        }else{
          this.seatSoldInfo=[];
        }
      }
    },
    // 获取已被预定的时段
    async loadSeatSoldDetail(){
      Indicator.open();
      let result=await getSeatSoldDetail(this.$route.query.shop_id,this.dateVal,this.clickedSeatInfo);
      // console.log(result)
      if(result.success_code==200){
        let detail='';
        result.data.forEach((item)=>{
          let start_time=new Date(item.start_time),end_time=new Date(item.end_time);
          detail+=formatTime(start_time)+'--'+formatTime(end_time)+'\xa0\xa0\xa0'
        })
        this.seatSoldDetail=detail;
      }
      Indicator.close();
    },
    // 选择座位
    handleSelectSeat(i){
      let id=this.seatJson[i].seatId;
      if(!(this.selectedStartValue&&this.selectedEndValue)){
        Toast('请选择时间');
        return;
      }
      if (this.seatCount==1&&id!=this.selectedSeatInfo&&this.seatJson[i].isSold==false){ 
        Toast('只能选1个座位');
      } else{
        if(this.seatCount==0){  // 选择座位
          if(this.seatJson[i].isSold==false){
            this.seatJson[i].type==0?this.seatJson[i].classBg='seat-bg3':this.seatJson[i].classBg='seat-bg6';
            this.selectedSeatInfo=id;
            this.selectedSeatType=this.seatJson[i].type;
            this.seatCount=1;
            this.buttonText=(this.seatJson[i].type==0?'单人座：':'双人座：')+this.seatJson[i].seatId+' ';
          }else{
            this.clickedSeatInfo=id;
            this.loadSeatSoldDetail();
            this.popupVisible=true;
          }
        }else if(id==this.selectedSeatInfo){ // 取消选座
          this.seatJson[i].type==0?this.seatJson[i].classBg='seat-bg1':this.seatJson[i].classBg='seat-bg4';
          this.selectedSeatInfo=null;
          this.selectedSeatType=null;
          this.seatCount=0;
          this.buttonText=null;
        }
      }
    },
    // 确认选座
    confirmSelect() {
      if(this.seatCount==1){
        this.$router.push({
          name:'order_confirm',
          params:{
            shop_id:this.$route.query.shop_id,
            shop_name:this.shopName,
            seat_id:this.selectedSeatInfo,
            // seat_count:this.seatCount,
            seat_type:this.selectedSeatType,
            order_date:this.dateVal,
            start_time:this.selectedStartValue,
            end_time:this.selectedEndValue,
            duration:this.duration
          }
        })
      }
    }
  }
};
</script>

<style lang="stylus">
$bg1='../../assets/img/seat/seat-single.png'
$bg2='../../assets/img/seat/seat-sold2.png'
$bg3='../../assets/img/seat/single-seat-choose.png'
$bg4='../../assets/img/seat/seat-double.png'
$bg5='../../assets/img/seat/double-seat-sold.png'
$bg6='../../assets/img/seat/double-seat-choose.png'

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
        background-image: url($bg1);
      }

      .seat-bg2 {
        background-image: url($bg2);
      }

      .seat-bg3 {
        background-image: url($bg3);
      }

      .seat-bg4 {
        background-image: url($bg4);
      }

      .seat-bg5 {
        background-image: url($bg5);
      }

      .seat-bg6 {
        background-image: url($bg6);
      }
    }
  }

  .btn-container {
    width: 100%;
    position: fixed;
    z-index: 1000;
    margin:-15px;
    bottom: 50px;
    padding: 0 30px;

    button.submit {
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
  .mint-popup.show-detail{
    width:300px;
    height:150px;
    border-radius:5Px;
    .popup-content{
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      p{
        font-size:15px;
        font-weight:600;
        color:#222;
      }
    }
  } 
}
</style>


<template>
  <div id="select-seat">
    <div class="shop">（店铺名）众独空间：昙华林店</div>
    <div class="dp-container">
      <div class="box ignore">
        <div class="choosedate" @click.prevent="open">
          <span class="uni-input mui-icon-extra mui-icon-extra-calendar">{{day}}</span>
        </div>
        <!-- 日期弹窗 -->
        <time-picker ref="picker" @confirmDate="getDate"></time-picker>
        <!-- <mt-datetime-picker
          v-model="pickerVisible"
          type="date"
          ref="picker"
          :startDate="startDate" 
          :endDate="endDate" 
          @confirm="handleConfirm" 
        >
        </mt-datetime-picker> -->
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
          <div id="start-time" class="uni-input">12:00</div>
          <div>-----</div>
          <div id="end-time" class="uni-input">18:00</div>
          <div>-----</div>
          <div id="show-time" class="font-orange">6h</div>
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
        <div v-for="(item,i) in seatJson" :key="i" :class="item.class"></div>
      </div>
    </div>
    <div class="btn-container">
      <button class="submit ignore" @click.prevent="confirmSelect">确认选座</button>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from "mint-ui";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import { formatDate } from "../../api/formatDate";
export default {
  data() {
    return {
      // 选择的座位
      selectedSeatInfo: {},
      // 座位表
      seatJson: [],
      day: formatDate(new Date(), "yyyy-MM-dd"),
      pickerVisible: null,
      startDate: new Date(),
      endDate: new Date(Date.parse(new Date())+1000 * 60 * 60 * 24 * 2)
    };
  },
  components: {
    "time-picker": DateTimePicker
  },
  created() {
    this.axios.get("seat.json").then(res => {
      if (res.data.code == 200) {
        //请求成功
        console.log(res.data.data);
        this.seatJson = res.data.data[2];
      } else {
        console.log("请求的数据不见了，去看一下你的json文件");
      }
    });
  },
  methods: {
    // 加载座位信息
    // 选择座位
    // 取消选座
    // 确认选座
    confirmSelect() {
      console.log("确认选座");
    },
    open() {
      this.$refs.picker.openPicker();
    },
    getDate(value){
      this.day=value;
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


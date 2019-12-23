<template>
  <mt-datetime-picker
    v-model="pickerVisible"
    :type="type"
    ref="picker"
    :startDate="startDate"
    :endDate="endDate" 
    hour-format="{value}时" 
    minute-format="{value}分" 
    @cancel="cancel"
    @visible-change="handleValueChange"
    @confirm="handleConfirm"
    @open="openPicker"
  ></mt-datetime-picker>
</template>

<script>
import { formatDate,checkTime,formatTime } from "../../api/common";
export default {
  data() {
    return {
      pickerVisible: '',
      startDate: new Date(),
      endDate: new Date(Date.parse(new Date()) + 1000 * 60 * 60 * 24 * 2),
    };
  },
  props: { 
    type: { 
      type: String, 
      default: "datetime" 
    } 
  },
  mounted() {
    if(this.type=='date'){
      this.$nextTick(() => {
        this.formatList();
      })
    }
  },
  methods: {
    formatList() {
      for (let i = 0; i < 3; i++) {
        let date = new Date(Date.parse(new Date()) + 1000 * 60 * 60 * 24 * i);
        document
          .getElementsByClassName("picker-slot")[2]
          .getElementsByClassName("picker-item")[i].innerHTML = formatDate(date,'yyyy-MM-dd');
        document.getElementsByClassName("picker-slot")[0].style.display =
          "none";
        document.getElementsByClassName("picker-slot")[1].style.display =
          "none";
      }
    },
    openPicker() {
      if(this.type=='time'){
        this.pickerVisible=formatTime(new Date()) // 每次打开始终定位到当前时间
        // console.log(this.pickerVisible)
      }
      this.$refs.picker.open();
    },
    handleConfirm() {
      if(this.type=='date'){
        this.$emit("confirmDate", this.pickerVisible);
      }else if(this.type=='time'){
        // console.log(this.pickerVisible)
        this.$emit("confirmTime", this.pickerVisible);
      }
    },
    handleValueChange(val) {
      // console.log(val,'visible')
    },
    cancel() {
      // console.log('cancel')
    }
  }
};
</script>

<style lang="stylus" scoped>
#date-time-picker {
  position: fixed;
  z-index: 10000;
  bottom: 0;
  width: 100%;
  margin: 0 -15px;
  background-color: #f7f7f7;
}
</style>


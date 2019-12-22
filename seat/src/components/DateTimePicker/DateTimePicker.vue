<template>
  <mt-datetime-picker
    v-model="pickerVisible"
    type="date"
    ref="picker"
    :startDate="startDate" 
    :endDate="endDate" 
    @confirm="handleConfirm" 
    @open="openPicker"
  >
  </mt-datetime-picker>
</template>

<script>
import { formatDate } from "../../api/formatDate";
export default {
  data(){
    return {
      pickerVisible: null,
      startDate: new Date(),
      endDate: new Date(Date.parse(new Date())+1000 * 60 * 60 * 24 * 2)
    }
  },
  props: {},
  mounted(){
    this.$nextTick(()=>{
      this.formatList();
    })
  },
  methods:{
    formatList(){
      for(let i=0;i<3;i++){
        let date=new Date(Date.parse(new Date())+1000 * 60 * 60 * 24 * i);
        document.getElementsByClassName('picker-slot')[2].getElementsByClassName('picker-item')[i].innerHTML=formatDate(date,'yyyy-MM-dd');
        document.getElementsByClassName('picker-slot')[0].style.display = 'none';
        document.getElementsByClassName('picker-slot')[1].style.display = 'none';
      }
      // let parent=document.getElementsByClassName('picker-items')[0];
      // let children=document.getElementsByClassName('picker-slot');
      // parent.removeChild(children[0]);
      // parent.removeChild(children[1]);
      // for(let i=0;i<3;i++){
      //   let date=new Date(Date.parse(new Date())+1000 * 60 * 60 * 24 * i);
      //   document.getElementsByClassName('picker-item')[i].innerHTML=formatDate(date,'yyyy-MM-dd');
      // }
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm() {
      let day = formatDate(this.pickerVisible,"yyyy-MM-dd");
      this.$emit('confirmDate',day);
    }
  }
};
</script>

<style lang="stylus" scoped>
#date-time-picker
  position fixed 
  z-index 10000
  bottom  0
  width  100%
  margin 0 -15px
  background-color  #f7f7f7
  
</style>


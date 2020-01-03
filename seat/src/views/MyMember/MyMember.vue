<template>
  <div id="app-member">
    <my-vip v-for="(item,i) in vipInfo" :vipData=item :key="i" class="card"></my-vip>
  </div>
</template>

<script>
import VipCard from "../../components/VipCard/VipCard"
import {getVipInfo} from "../../api/index"
export default {
  data(){
    return {
      vipInfo:[]
    }
  },
  components:{
    "my-vip":VipCard
  },
  created(){
    this.loadVipInfo();
  },
  methods:{
    async loadVipInfo(){
      let json=await getVipInfo(this.$store.getters.uid);
      if(json.success_code==200){
        this.vipInfo=json.data;
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
#app-member
  width 100%
  height  100vh
  padding 60px 20px 0
  overflow auto
  .card
    margin 20px 0
</style>


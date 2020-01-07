<template>
  <div id="app-purchase">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div v-for="(item,i) of jsonList" :key="i">
        <purchase-item :myData="item"></purchase-item>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import PurchaseItem from "../../components/PurchaseItem/PurchaseItem";
import {
  getMyDataAll,
  getMyDataDelay,
  getMyDataCancel,
  getMyDataEnd,
  getMyDataOverdue
} from "../../api/index";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      jsonList: [],
      pno:0,
      pageSize:5,
      allLoaded:false
    };
  },
  components: {
    "purchase-item": PurchaseItem
  },
  created() {
    this.loadPurchaseData();
  },
  methods: {
    async loadPurchaseData() {
        Indicator.open();
        let result;
        this.pno++;
        if (this.$route.name == "purchase-all") {
            result = await getMyDataAll(this.$store.getters.uid,this.pno,this.pageSize);
        } else if (this.$route.name == "purchase-delay") {
            result = await getMyDataDelay(this.$store.getters.uid,this.pno,this.pageSize);
        } else if (this.$route.name == "purchase-cancel") {
            result = await getMyDataCancel(this.$store.getters.uid,this.pno,this.pageSize);
        } else if ((this.$route.name == "purchase-end")) {
            result = await getMyDataEnd(this.$store.getters.uid,this.pno,this.pageSize);
        } else {
            result = await getMyDataOverdue(this.$store.getters.uid,this.pno,this.pageSize);
        }
        // console.log(result)
        if (result.success_code == 200) {
          this.jsonList = this.jsonList.concat(result.data);
        }else{
          this.allLoaded = true; // 数据已全部获取完毕
        }
        Indicator.close();
    },
    loadBottom() {
      this.loadPurchaseData(); // 加载更多数据
      this.$refs.loadmore.onBottomLoaded(); // 对数组进行重新定位
    }
  }
};
</script>

<style lang="stylus" scoped>
#app-purchase
  width 100%
  height 100%
  padding-top 80px
  &:after
    content ''
    display table
</style>


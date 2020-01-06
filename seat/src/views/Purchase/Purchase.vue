<template>
  <div id="app-purchase">
    <div v-for="(item,i) of jsonData" :key="i">
      <purchase-item :myData="item"></purchase-item>
    </div>
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
      jsonData: []
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
        if (this.$route.name == "purchase-all") {
            result = await getMyDataAll(this.$store.getters.uid);
        } else if (this.$route.name == "purchase-delay") {
            result = await getMyDataDelay(this.$store.getters.uid);
        } else if (this.$route.name == "purchase-cancel") {
            result = await getMyDataCancel(this.$store.getters.uid);
        } else if ((this.$route.name == "purchase-end")) {
            result = await getMyDataEnd(this.$store.getters.uid);
        } else {
            result = await getMyDataOverdue(this.$store.getters.uid);
        }
        // console.log(result)
        if (result.success_code == 200) {
            this.jsonData = result.data;
        }
        Indicator.close();
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


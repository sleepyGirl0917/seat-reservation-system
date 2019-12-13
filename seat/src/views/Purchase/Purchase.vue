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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      jsonData: []
    };
  },
  computed: {
    // 通过mapGetters获取store中state设置的变量
    ...mapGetters(["userInfo"])
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
            result = await getMyDataAll(this.userInfo.user_id);
        } else if (this.$route.name == "purchase-delay") {
            result = await getMyDataDelay(this.userInfo.user_id);
        } else if (this.$route.name == "purchase-cancel") {
            result = await getMyDataCancel(this.userInfo.user_id);
        } else if ((this.$route.name == "purchase-end")) {
            result = await getMyDataEnd(this.userInfo.user_id);
        } else {
            result = await getMyDataOverdue(this.userInfo.user_id);
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
  min-height 100vh
  padding-top 60px
  &:after
    content ''
    display table
</style>


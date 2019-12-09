<template>
  <div id="app-error">
    <div class="error-box">sorry,there is nothing in the page~</div>
  </div>
</template>
<script>
export default {
  name: "Error",
  data() {
    return {
      icon: "close"
    };
  }
};
</script>
<style>
#app-error .error-box {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>
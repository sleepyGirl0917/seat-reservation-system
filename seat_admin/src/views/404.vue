<template>
  <div class="page404">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  computed: {
    message() {
      return '这里是404页面'
    }
  }
}
</script>

<style lang="less" scoped>
.page404 {
  text-align: center;
  display: flex;
  align-items: center;
  text-align: center;
}
</style>

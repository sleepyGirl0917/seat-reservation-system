<template>
  <div id="app-order">
    <h1 class="title">我的预定</h1>
    <ul class="order-box">
      <li class="media">
        <a class="navigate-right">
          <img class="media-object float-left" src="img/ordered.png" />
          <div class="media-body">
            <div>众独空间（昙华林店）</div>
            <div>
              <p>单人座：4</p>
              <p>日期：2019-11-21 09:40-21:10</p>
              <p>状态：进行中</p>
            </div>
          </div>
        </a>
      </li>
		</ul>
  </div>
</template>

<script>
  export default {
    name:"Order",
    data(){
      return{
        
      }
    },
    methods:{}
  }
</script>

<style>
#app-order .title{
  font-size: 22px;
  font-weight: 700;
}
</style>


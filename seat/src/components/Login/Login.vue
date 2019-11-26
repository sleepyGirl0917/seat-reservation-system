<template>
    <div id="app-login">
      <header class="mui-bar mui-bar-nav">
			  <h1 class="mui-title">登录</h1>
		  </header>
      <div class="mui-content">
        <form id="login-form" class="mui-input-group">
          <div class="mui-input-row">
            <label>账号</label>
            <input id="account" type="text" class="mui-input-clear mui-input" placeholder="请输入账号" data-input-clear="2"><span class="mui-icon mui-icon-clear mui-hidden"></span>
          </div>
          <div class="mui-input-row">
            <label>密码</label>
            <input id="password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码" data-input-clear="3"><span class="mui-icon mui-icon-clear mui-hidden"></span>
          </div>
        </form>
        <form class="mui-input-group">
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell">
              自动登录
              <div id="autoLogin" class="mui-switch" data-switch="1">
                <div class="mui-switch-handle"></div>
              </div>
            </li>
          </ul>
        </form>
        <div class="mui-content-padded">
          <button id="login" type="button" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
          <div class="link-area"><a id="reg">注册账号</a> <span class="spliter">|</span> <a id="forgetPassword">忘记密码</a>
          </div>
        </div>
        <div class="mui-content-padded oauth-area">

        </div>
		  </div>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  data(){
      return {uname:"",upwd:""}
    },
  methods:{
    btnLogin(){
        var u = this.uname;
        var p = this.upwd;
        var reg = /^[a-z0-9]{3,12}$/i;
        if(!reg.test(u)){
           Toast("用户名格式不正确，请检查");
           return;
        }
        var url = "http://127.0.0.1:8080";
        url+="/api/login?uname="+u+"&upwd="+p;
        this.axios.get(url).then(result=>{
          if(result.data.code==1){
            //再次发送ajax请求获取购物车商品数量
            var url = "http://127.0.0.1:3000/cartlist";
            this.axios.get(url).then(result=>{
              //1:接收服务器程序返回数据
              var rows = result.data.data;
             //立即更新 updateCount();
              this.$store.commit("updateCount",rows.length);
            })
            this.$router.push("/Home")
          }else{
            Toast("用户名或密码有误");
          }
        })
        //4:失败 显示提示框
        //5:成功 跳转home
      }
  }
}
</script>


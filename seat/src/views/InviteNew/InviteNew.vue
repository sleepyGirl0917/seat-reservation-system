<template>
  <div id="inviete">
    <div class="invite-banner">
      <img src="../../assets/img/user/inviteNew.jpg" alt="">
    </div>
    <div class="invite-content">
      <div class="myCode">
        <span class="left">我的邀请码</span>
				<div class="right">
          <span id="inviteCode">{{inviteCode}}</span>
          <span class="copy_btn" :data-clipboard-text="inviteCode" @click.prevent="copy">复制</span>  
        </div>
			</div>
			<div class="total">
				<span class="left">累计获得</span>
        <div class="right">
          <span>¥0</span>
        </div>
			</div>
			<div class="bindCode">
        <span class="left">绑定邀请码</span>
        <div class="right">
          <input type="text" placeholder="请输入邀请码" :value="code">
          <button>确认绑定</button>
        </div>
      </div>
			<div class="tipText">
				<p>
					如果好友填写了您的邀请码并成功在平台办理储蓄卡或畅享卡，邀请双方将获得一次红包奖励哦，红包将直接进入你的账户余额中。
				</p>
			</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui"
// import Clipboard from 'clipboard';  
export default {
  name:'InviteNew',
  data(){
    return {
      code:null,
      inviteCode:'xpjvot'
    }
  },
  methods:{
    copy(){
      var clipboard = new this.Clipboard('.copy_btn');  
      clipboard.on('success', () => {
        Toast('复制成功');
        clipboard.destroy();  // 释放内存    
      });  
      clipboard.on('error', () => {  
        console.log('该浏览器不支持自动复制');  
        clipboard.destroy();  
      });  
    }
  }
}
</script>

<style lang="stylus" scoped>
#inviete
  width 100%
  height 100%
  margin-top 60px
  .invite-banner
    width 100%
    img 
      display block
      width 750px
      height 355px
  .invite-content    
    padding 20px 0
    >div
      margin 20px
      padding 20px
      background-color #fff
      display flex
      align-items center
      span,p
        font-size 25px
        font-weight 500
        line-height 2
        margin 0
      .left  
        flex 1
        height 40px
        text-align center
      .right
        flex 3  

    .myCode,.total
      .right
        span
          display inline-block
          text-align center
          width 30%
          color rgb(228, 114, 20)
          &:nth-child(2)
            border 1px solid color rgb(228, 114, 20)
            border-radius 5Px
            padding 5px 0

    .bindCode
      .right     
        height 60px
        button 
          width 40%  
          height 100%
          border-radius 5Px
          font-size 25px
        input[type=text]
          width 60%
          height 100%
          margin 0 
          font-size 25px
          caret-color #36369c
</style>


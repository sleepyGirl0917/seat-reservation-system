<template>
    <div id="update-user-info">
        <div class="info-container">
            <div class="info">
                <span>头像</span>
                <div class="avatar"><img src="../../assets/img/logo.jpg"></div>
    <!-- <div
        class="avatar"
        :style="'background:url('+(jsonData?baseUrl+jsonData.avatar:avatar)+') no-repeat 50% 50%;background-size:cover;'"
    ></div> -->
            </div>
            <div class="info">
                <span>昵称</span>
                <div class="uname">
                    <input type="text" :value="uname">
                </div>
            </div>
        </div>
        <btn-container :text="btnText" @submit="handleSubmit"></btn-container>
    </div>
</template>

<script>
import Button from "../../components/Button/Button"
export default {
  data(){
    return {
        uname:'ali',
        btnText:'确定'
    }
  },
  components:{
    "btn-container":Button
  },
  methods:{
    handleSubmit(){
        console.log('修改用户名和头像')
        // this.$router.go(-1);
    }
  }
}
</script>

<style lang="stylus" scoped>
#update-user-info
    width 100%
    padding 60px 15px 0
    overflow hidden
    .info-container
        margin-top 50px
        .info
            display flex
            align-items center
            justify-content flex-start
            padding 20px 40px
            border-bottom  1px solid #e1e1e1
            span 
                display inline-block
                height  100px
                line-height 100px
                font-size  32px
                font-weight  500
                width 20%
                
            .avatar
                border-radius 50%
                overflow hidden
                width 120px
                height 120px
                img 
                    width 100%
                    height 100%
            
            .uname
                width 80%
                input 
                    outline none
                    border none 
                    background-color inherit 
                    caret-color #36369c
                    margin 0
                    padding 0    
                    height  100px
                    line-height 100px
                    font-size  32px
                    font-weight  500   
                        
    .btn-container 
        width 100%
        position fixed
        z-index 1000
        margin -15px
        bottom 50px
        padding 0 30px
</style>
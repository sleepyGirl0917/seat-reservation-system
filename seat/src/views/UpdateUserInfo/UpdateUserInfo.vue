<template>
    <div id="update-user-info">
        <div class="info-container">
            <div class="info">
                <span>头像</span>
                <div class="avatar">
                    <img :src="avatar" ref="previewImg">
                    <input type="file" id="file" name="file" ref="uploadImg" accept="image/*" @change="changeImg">
                </div>
            </div>
            <div class="info">
                <span>昵称</span>
                <div class="uname">
                    <input type="text" v-model="uname">
                </div>
            </div>
        </div>
        <btn-container :text="btnText" @submit="modifyUserInfo"></btn-container>
    </div>
</template>

<script>
import Button from "../../components/Button/Button"
import {getUserInfo,upLoadImg,updateUserAvatar,updateUserInfo} from "../../api/index"
import { Indicator,Toast } from 'mint-ui'
export default {
  data(){
    return {
        // uname:this.$route.params.uname,
        // avatar:this.$route.params.avatar,
        btnText:'确定', 
        uname:null,
        avatar:null,
        newAvatar:null
    }
  },
  props: ["user_id"],
  components:{
    "btn-container":Button
  },
  created(){
    this.loadUserInfo();
  },
  methods:{
    async loadUserInfo(){
        if(this.$store.getters.uid){
          Indicator.open('加载中...')
          let result = await getUserInfo(this.$store.getters.uid);
          if(result.success_code===200){
            this.uname=result.data.user_name;
            this.avatar=result.data.avatar;
          }
          Indicator.close();
        }
    },
    changeImg() {
      let reader = new FileReader();
      reader.readAsDataURL(this.$refs.uploadImg.files[0]); 
      let _this = this;
      reader.onload = function() {
        _this.uploadUserAvatar();
        _this.$refs.previewImg.src = this.result;
      };
    },
    //上传用户头像
    async uploadUserAvatar() {
        let formData = new FormData();
        formData.append("file", this.$refs.uploadImg.files[0]);
        let result = await upLoadImg(formData);
        if (result.success_code == 200) {
            this.newAvatar="/img/avatar/" + result.data[0].filename;
            Toast({
                message:'上传成功',
                position: "middle",
                duration: 2000
            });
        }     
    },
    // 修改用户名和头像
    async modifyUserInfo(){
        let result = await updateUserInfo(this.$store.getters.uid,this.uname,this.newAvatar);
        Toast({
            message: result.message,
            position: "middle",
            duration: 2000
        });
        if(result.success_code==200){
            this.$router.go(-1)
        }
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
                position relative
                border-radius 50%
                overflow hidden
                width 120px
                height 120px
                img 
                    width 100%
                    height 100%
                input 
                    position absolute
                    left 0
                    top 0
                    width 100%
                    height 100%
                    opacity 0

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
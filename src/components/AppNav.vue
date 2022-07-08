<template>
  <transition name="slide-fade">
    <div id="AppPlus"  v-show="plus">
    </div>
  </transition>



    <div id="AppNav" @mouseenter="handleEnter" @mouseleave="handleOut" >
      <div class="content" >
        <!--logo-->
        <div class="logo">
          <a href="/">wypty.com</a>
        </div>
        <!--导航-->
        <transition name="slide-fade" >
        <div class="nav" v-show="nav">
          <router-link to="/">首页</router-link>
          <router-link to="/article">文章</router-link>
          <router-link to="/message">留言</router-link>
          <router-link to="/link">友链</router-link>
          <router-link to="/about">关于</router-link>
          <router-link to="/Video">视频</router-link>
        </div>
        </transition>
        <!--登陆/注册-->
        <div class="login">
          <UserBox v-if="userInfo.user"></UserBox>
          <LoginBox v-else></LoginBox>
        </div>
      </div>
    </div>


</template>

<script>
import LoginBox from "@/components/Login/LoginBox";
import UserBox from "@/components/Login/UserBox";
import {mapState} from "vuex"
export default {
  name: "AppNav",
  data(){
    return{
      nav:false,
      plus:false,
      top:0,
    }
  },
  components: {
    LoginBox, UserBox
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods:{

    handleScroll(e){
      let top = e.srcElement.scrollingElement.scrollTop;// 获取页面滚动高度
      this.top=top
      if(this.top>=50){
        this.nav=true
        this.plus=true
      }else if(this.top<50) {
        this.nav=false
        this.plus=false
      }
    },
    handleEnter(){
      if(this.top==0){
        this.nav=true
        this.plus=true
      }

    },
    handleOut(){
      if(this.top==0){
        this.nav=false
        this.plus=false
      }

      },



    },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  }
}
</script>

<style lang="less" scoped>
#AppPlus {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: rgb(124,134,221);
  z-index: 999;

  /* 可以为进入和离开动画设置不同的持续时间和动画函数 */
  &.slide-fade-enter-active {
    transition: all 3s ease-out;
  }

  &.slide-fade-leave-active {
    transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
  }

  &.slide-fade-enter-from,
  &.slide-fade-leave-to {
    transform: translateX();
    opacity: 0;
  }
}


  #AppNav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    z-index: 999;




    .content {
      box-sizing: border-box;
      justify-content: space-between;
      display: flex;
      width: 1226px;
      min-width: 1226px;
      padding: 0 15px;
      margin-left: auto;
      margin-right: auto;
    }

    .logo {
      width: 130px;
      height: 50px;


      a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 60px;
        font-size: 26px;
        letter-spacing: 5px;
        font-family: Pacifico;
        color: red;
      }
    }

    .nav {
      display: flex;
      height: 70px;
      font-family: STHupo;
      font-size: 20px;
      /* 可以为进入和离开动画设置不同的持续时间和动画函数 */
      &.slide-fade-enter-active {
        transition: all 0.8s ease-out;
      }

      &.slide-fade-leave-active {
        transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
      }

      &.slide-fade-enter-from,
      &.slide-fade-leave-to {
        transform: translateX();
        opacity: 0;
      }



      a {
        display: block;
        height: 48px;
        border-bottom: 2px solid transparent;
        padding: 0 25px;
        color: black;
        line-height: 70px;
        font-weight: bolder;
        transition: all .3s;

        &:hover {
          color: #00b7ff;
        }

        &.router-link-active {
          color: #00b7ff;
          border-color: #00b7ff;
        }
      }


    }




  }



</style>















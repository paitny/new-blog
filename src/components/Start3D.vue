<template>

  <div id="firstPage">
    <div class="wrap">
      <BackGround
          class="swiperPlus"
      ></BackGround>
      <div class="txt">
      <span>
         welCom to my blog
      </span>

      </div>
      <Album class="album"></Album>
      <Appoint class="point"></Appoint>

    </div>

  </div>

</template>

<script>
import Album from "./FirstStart/Album";
import Appoint from "./FirstStart/Appoint";
import BackGround from "./FirstStart/BackGround";
export default {
  name: "Start3D",
  data(){
    return{
      height:0,

    }
  },
  components:{
    Album,Appoint,BackGround
  },
  methods:{
    handleScroll(e){
      let top = e.srcElement.scrollingElement.scrollTop;// 获取页面滚动高度
      if(top==0){
      }
  }
  },

  mounted() {
    /*console.log(document.documentElement.clientHeight)*/
    document.documentElement.style.height='100%'
    document.body.style.height='100%'
    document.getElementById('app').style.height='100%'
    window.addEventListener("scroll", this.handleScroll, true);
  }
}

</script>

<style scoped lang="less">
#firstPage{
  width: 100%;
  height: 100%;
  min-width: max-content;
}
.wrap {
  position: relative;
  min-width: 1226px;
  height: 100%;
  //background: url(../assets/img/3D/bg1.jpg) no-repeat;
  //background-size: cover;
  .swiperPlus{
    position: absolute;
    bottom: 0;
    left: -1px;


  }

  .album{
    position: absolute;
    left: 0;
    top: 0;
  }
  .txt{
    position: absolute;
    top: 20%;
    width:100%;
    height: 150px;
    z-index: 998;
    text-align: center;
      font-size:70px ;
      color: #fff;
      font-family: Pacifico;
    margin: 0 auto;
    move-1{
      animation-duration: 0.5s;
      animation-timing-function: ease-in-out;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-direction: alternate-reverse;
      animation-fill-mode: none;
      animation-play-state: running;
    }
    &:hover{
      text-shadow: -4px 0 #00a7e0, 3px 0 #ff3f1a;
      animation: move-1 .5s ease-in-out infinite alternate-reverse;
    }

  }
  .point{
    position:absolute;
    width: 100px;
    height: 150px;
    left: 50%;
    bottom: 0;
    cursor: pointer;
    background-image:url("../assets/img/3D/point.jpg") ;
    background-size: cover;
    z-index: 999;
  }
}






</style>

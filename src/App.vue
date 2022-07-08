<template>
    <Start3D></Start3D>
  <AppNav>
  </AppNav>
<div
class="blog"
>
  <div id="main">
    <div class="left">
      <AppSide></AppSide>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>

</div>
  <ToTop></ToTop>
</template>
<script>
import AppNav from "./components/AppNav";
import AppSide from "./components/AppSide";
import Start3D from "./components/Start3D";
import {mapMutations} from "vuex";
import ToTop from "./components/ToTop/ToTop";
export default {
  components: {
    AppNav, AppSide,ToTop,Start3D
  },
  methods: {
    ...mapMutations(['loginSuccess']),
  },
  async created() {
    let {data} = await this.$axios({
      method: "POST",
      url: "/login/check"
    })
    //未登录
    if (data.code)return
    //已登录
    this.loginSuccess(data.data)

    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    })
  },


}
</script>
<style lang="less">
@import "assets/css/reset.css";
@import "assets/css/font.css";
@import "assets/css/font/iconfont.css";

//vue_particles{
//  position: absolute;
//  left: 0;
//  right: 0;
//  top: 0;
//  bottom: 0;
//  background: linear-gradient(to left top, #0099cc, #996699, #336699);
//}
::-webkit-scrollbar { /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0;
}

::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 167, 232, .3);
}

::-webkit-scrollbar-track { /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #EDEDED;
}
.blog{
  width:100%;
  background: url("assets/img/bg/blackvistor.jpg") no-repeat center center;
  background-size:cover;
  min-width: max-content;
}
#main {
  box-sizing: border-box;
  display: flex;
  width: 1226px;
  min-width: 1226px;
  padding: 100px 15px;
  margin: 0 auto 0;
  //background: url("assets/img/bg/blackvistor.jpg") no-repeat ;
  background-size:cover;

  > .left {
    width: 270px;
    margin-right: 15px;
  }

  > .right {
    flex: 1;
    min-height: 721px;
  }
}


</style>

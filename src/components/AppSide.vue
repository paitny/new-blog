<template>
  <div id="AppSide">
    <!--个人信息-->

    <Personal></Personal>

    <div
      class="sticky"
      :class="{'fixed':ifFixed}"
    >
      <!--热门文章-->
      <HotArticle></HotArticle>
      <!--最近访客-->
      <Visitor></Visitor>
    </div>
  </div>
</template>

<script>
import Personal from "@/components/AppSide/Personal";
import HotArticle from "@/components/AppSide/HotArticle";
import Visitor from "@/components/AppSide/Visitor";
export default {
  name: "AppSide",
  data() {
    return {
      ifFixed: false,
      height:0
    }
  },
  components: {
    Personal, HotArticle, Visitor
  },

  methods: {

    scrollFn(){

      this.height=document.body.clientHeight
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.ifFixed = scrollTop >= this.height+270
    }
  },

  mounted() {
    this.scrollFn()
    window.addEventListener("scroll", ()=>{
      this.scrollFn()
    })
  }
}
</script>

<style scoped lang="less">
.sticky.fixed {
  position: fixed;
  top: 85px;
  width: 270px;

}
</style>















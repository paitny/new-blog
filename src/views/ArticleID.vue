<template>
  <div id="ArticleID" oncontextmenu="return false" onselectstart="return false" oncopy="return false" >
    <article>
      <main id="mdToHTML" v-for="item in random" :key="item.id"></main>
    </article>

  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "ArticleID",
  data(){
    return{
      random :{
        id:new Date()
      }
    }
  },
  watch:{
    // $route(to,from){
    //   this.$router.go(0)
    // },
    userInfo() {
      this.backHome()
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    //未登录情况下，返回文章页
    backHome() {
      if (!this.userInfo.user) {
        this.$router.replace("/Article")
        this.$message.error("当前未登录,请先登录后阅读文章")
      }
    },
    unloadFn(){
      if(this.userInfo.user)return
    }
,
  async getArt(){
    let id = this.$route.params.id
    let {data} = await this.$axios({
      method: "GET",
      url: "/get/articleID",
      params: {id}
    })


    if (data.code) {
      return this.$message({
        type: "error",
        message: data.msg,
        duration: 1000,
        onClose: () => {
          this.$router.replace('/article')
        }
      })
    }

    let {data: md} = await this.$axios({
      method: "GET",
      url: `${data.data.md}`
    })
    editormd.markdownToHTML("mdToHTML", {
      markdown: md,
      emoji: true
    });
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.backHome()
    })
  },
  mounted() {
    window.addEventListener("beforeunload", e => {
      this.unloadFn(e);
    });
    this.getArt()

  },
  destroyed() {
    window.removeEventListener("beforeunload", e => {
      this.unloadFn(e);
    });

  }
}
</script>

<style lang="less" scoped>
#ArticleID {
  background: #fff;
  #mdToHTML {
    box-sizing: border-box;
  }
}
</style>















<template >
  <div id="Article" >
    <article class="fadeIn" v-for="item in articleData" :key="item._id">
      <h2>{{ item.title }}</h2>
      <div class="time">
        <p class="date">{{ new Date(item.date).getDate() }}</p>
        <p class="m-y">
          <span>{{ new Date(item.date).getMonth() + 1 }}</span>
          <span>{{ new Date(item.date).getFullYear() }}</span>
        </p>
      </div>
      <div class="show">
        <div class="img" :style="{backgroundImage: `url(${baseURL}${item.cover})`}"></div>
        <div class="des">{{ item.des }}</div>
      </div>
      <div class="r-b">
        <p>浏览量：{{ item.pv }}</p>
        <router-link :to="`/article/${item._id}`" @click="checkLogin">阅读全文</router-link>

      </div>

    </article>




  </div>
  <div class="page" v-if="show">
    <el-pagination
        align="center"
        background
        layout="sizes,prev,pager,next,jumper,->,slot, total"
        :total="total"
        v-model:page-size="query.perPage"
        v-model:current-page="query.page"
        @current-change="getArticles"
        @size-change="getArticles"
        :page-sizes="[2,5,10,20,30]"

    />
  </div>


</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Article",
  data() {
    return {
      articleData: [],
      total:0,
      show:true,
      query:
        {
          page:1,
          perPage: 5
        }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {

    async getArticles() {
      let {data} = await this.$axios({
        method: "get",
        url: "/get/article",
        params:this.query
      })
      if (data.code) {
        return this.$message.error(data.msg)
      }
      this.articleData= data.data
      this.total=data.total
      if(this.total==0){
        this.show=false
      }
    },
    checkLogin(){
      //没有登录的话，给提示
      if (!this.userInfo.user) {
        this.$router.replace('/Article')
        return this.$message.error("请先登录或注册")

      }
    }
    ,
    //将数据分组

  },
  mounted() {
  this.getArticles()
  }

}

</script>

<style lang="less" scoped>
#Article {
  article {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: Quicksand, Microsoft YaHei, sans-serif;
    border-radius: 10px;

    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }

    .time {
      position: absolute;
      top: 0;
      right: 10px;
      width: 60px;

      .date {
        font-weight: bolder;
        font-size: 40px;
        text-align: center;
        color: #6bc30d;
      }

      .m-y {
        display: flex;
        justify-content: space-between;
      }
    }

    .show {
      display: flex;

      height: 250px;
      max-width: 950px;
      .img {
        box-sizing: border-box;
        width: 50%;
        padding-right: 1%;
        background-size: cover;
        background-position: 50%;
      }

      .des {
        box-sizing: border-box;
        width: 50%;
        padding-left: 1%;
      }
    }

    .r-b {
      position: absolute;
      right: 20px;
      bottom: 20px;

      p {
        position: relative;
        top: -10px;
        color: #aaa;
        font-size: 12px;
      }

      a {
        padding: 10px 20px;
        background-color: #409eff;
        color: #fff;
        transition: opacity .3s;

        &:hover {
          opacity: .8;
        }
      }
    }

    &.fadeIn {
      animation: fadeIn 1s 1;
      animation-fill-mode: backwards;
    }

    @keyframes fadeIn {
      from {
        transform: scale(.5);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
}

</style>















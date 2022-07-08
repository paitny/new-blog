<template>
  <div id="videos" >
    <div id="demo"
         v-for="item in videoList"
    >
      <div class="title">
        <p class="title">{{item.title}}</p>
      </div>
      <div>
        <vue3VideoPlay :poster="`${baseURL}${item.videoCover}`" :src="`${baseURL}${item.video}`"  :autoPlay="false"/>
      </div>
      <div class="time">
        <p class="title">{{setNowTimes(item.date)}}</p>
      </div>

    </div>
  </div>

</template>

<script>

export default {
  name:'Video',
  data () {
    return {
      videoList:[],
    }
  },
  methods:{
    async getVideo(){
      let {data}=await this.$axios({
        method:"GET",
        url:"/get/video"
      })
      if(data.code){
        return this.$message.error(data.msg)
      }
      this.videoList=data.data

    },
    setNowTimes(date) {
      let myDate = new Date(date);
      // console.log(myDate)
      let wk = myDate.getDay();
      let yy = String(myDate.getFullYear());
      let mm = myDate.getMonth() + 1;
      let dd = String(
          myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()
      );
      let hou = String(
          myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()
      );
      let min = String(
          myDate.getMinutes() < 10
              ? "0" + myDate.getMinutes()
              : myDate.getMinutes()
      );
      let sec = String(
          myDate.getSeconds() < 10
              ? "0" + myDate.getSeconds()
              : myDate.getSeconds()
      );
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];

      return  yy + "-" + mm + "-" + dd + " "+hou+":"+min

    }

  }
  ,
  mounted() {
    this.getVideo()

  }
}
</script>
<style lang="less" scoped>
#videos{
  width: 100%;
  #demo{
    overflow: hidden;
    margin-left: 35px;
    border-radius: 10px;
    margin-top: 20px;
    float: left;
    .time{
      width: 100%;
      height: 20px;
      background: #fff;
      text-align: center;
    }
    .title{
      width: 100%;
      background: #fff;
      text-align: center;
    }
  }
  #refPlayerWrap{
    width: 420px;
    height: 230px;
  }
}


</style>







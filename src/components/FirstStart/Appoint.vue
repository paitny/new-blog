<template>
  <div id="point" @click="clickQuotation">
  </div>

</template>

<script>
export default {
  name: "Appoint",
  data(){
    return{
      heightFlag:false,
      height:0
    }
  },
  methods:{
    clickQuotation() {
      this.height=document.body.clientHeight
      if (this.heightFlag) return
      const orangeHeight = window.pageYOffset//点击事件后，页面移动至页面左上角的距离，现在为0（顶部）；const orangeHeight = window.pageYOffset-100（指距顶部下移100）
      //
      let i = 0
      this.heightFlag = true
      clearInterval()
      this.interval = setInterval(() => {
        const next = Math.floor(this.heightChange(50 * i, orangeHeight, -orangeHeight, 1000))
        if (next <= 0) {
          window.scrollTo(0,this.height)//第二个0表示滚动距离
          clearInterval(this.interval)
          this.heightFlag = false
        } else {
          window.scrollTo(0, next)

        }
        i++
      }, 16.7)
    },
    heightChange(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    }
  }
}

</script>

<style scoped lang="less">

</style>

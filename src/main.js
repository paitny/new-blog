// noinspection JSCheckFunctionSignatures

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from "axios";
import moment from 'moment'

import {message} from "./assets/js/resetMessage";
// import 'default-passive-events'
//一般视频播放器
import VideoPlayer from 'vue-video-player/src'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import  'videojs-contrib-hls'
//好看的视频播放器
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css


const app = createApp(App)
//引入element-plus
installElementPlus(app)

//服务器前缀设置
const baseURL = process.env.NODE_ENV === "development" ? 'http://localhost:4000' : ''
//配置全局axios
axios.defaults.baseURL = baseURL //配置前缀url
axios.defaults.withCredentials = true //携带cookie
app.config.globalProperties.$axios = axios //添加到vue实例
//重写message添加到vue实例
app.config.globalProperties.$message=message
app.use(VideoPlayer)
app.use(vue3videoPlay)
app.use(moment)
app.use(store).use(router).mixin({
    data() {
        return {baseURL}
    },

}).mount('#app')

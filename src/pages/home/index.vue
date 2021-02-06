<template>
  <div class="home-warrper">
    <search-bar></search-bar>
    <header class="banner-wrapper"></header>
    <div class="cate-wrapper">
      <div class="cate-bg">
        <img :src="require('../../assets/images/bg-cate.png')" class="opa1" />
      </div>
      <div
        class="cate-container"
        ref="cateWrapper"
        @touchstart="cateTouchStart"
        @touchmove="cateTouchMove"
        @touchend="cateTouchEnd"
      >
        <!-- touchstart触摸时间不能在 cate-frist盒子上,否则会出现左右滑动，上下跟着滑动
      因为当cate-frist滑动出屏幕后，滑动的是其外层盒子-->
        <div class="cate-frist">
          <a
            class="cate-item"
            href=""
            v-for="(item, index) in getFristCats"
            :key="index"
            @click.prevent=""
          >
            <img class="cate-icon" v-lazy="item.icon" />
            <span class="cate-name">{{ item.name }}</span>
          </a>
        </div>
        <div class="cate-second">
          <a
            class="cate-item"
            href=""
            v-for="(item, index) in getSecondCats"
            :key="index"
            ref="disLink"
          >
            <img class="cate-icon" v-lazy="item.icon" />
            <span class="cate-name">{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
    <div
      class="dis-wrapper"
      @touchstart="disTouchStart"
      @touchmove="disTouchMove"
      @touchend="disTouchEnd"
    >
      <div class="dis-container" ref="disWrapper">
        <a
          class="dis-item"
          href=""
          v-for="(item, index) in disList"
          :key="index"
          :style="setStyle(index)"
          @click.prevent=""
        >
          <img
            :style="getImgWidth(index)"
            class="dis-img"
            :src="item.icon"
            ref="disImg"
          />
        </a>
      </div>
    </div>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
    <p>skdjskd</p>
  </div>
</template>

<script>
import SearchBar from '../../components/SearchBar.vue'
import { prefixStyle } from '../../utils/dom'
import HomeAip from '../../request/home'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

const cateList = [
  { name: '京东超市', icon: require('../../assets/images/cate2.png') },
  { name: '京东服饰', icon: require('../../assets/images/cate0.png') },
  { name: '数码电器', icon: require('../../assets/images/cate1.png') },
  { name: '京东到家', icon: require('../../assets/images/cate4.jpg') },
  { name: '京东生鲜', icon: require('../../assets/images/cate5.png') },
  { name: '充值缴费', icon: require('../../assets/images/cate6.png') },
  { name: '9.9拼', icon: require('../../assets/images/cate7.png') },
  { name: '领券', icon: require('../../assets/images/cate8.jpg') },
  { name: 'PLUS会员', icon: require('../../assets/images/cate9.png') },
  { name: '京东国际', icon: require('../../assets/images/cate10.png') },
  { name: '京东拍卖', icon: require('../../assets/images/download-11.png') },
  { name: '玩3C', icon: require('../../assets/images/download-12.png') },
  { name: '沃尔玛', icon: require('../../assets/images/download-13.png') },
  { name: '美妆馆', icon: require('../../assets/images/download-14.png') },
  { name: '京东旅行', icon: require('../../assets/images/download-15.png') },
  { name: '拍拍二手', icon: require('../../assets/images/download-16.png') },
  { name: '京东到家', icon: require('../../assets/images/download-17.png') },
]
const disList = [
  { icon: require('../../assets/images/download-3.png') },
  { icon: require('../../assets/images/download-1.png') },
  { icon: require('../../assets/images/download-2.png') },
  { icon: require('../../assets/images/download-3.png') },
  { icon: require('../../assets/images/download-1.png') },
  { icon: require('../../assets/images/download-2.png') },
  { icon: require('../../assets/images/download-3.png') },
  { icon: require('../../assets/images/download-1.png') },
  { icon: require('../../assets/images/download-2.png') },
]
export default {
  components: { SearchBar },
  name: 'home',
  computed: {
    getFristCats() {
      return cateList.slice(0, 10)
    },
    getSecondCats() {
      return cateList.slice(10)
    },
  },
  data() {
    return {
      cateList: cateList,
      cateIndex: 0,
      disList: disList,
      disLeftIndex: 3,
    }
  },
  created() {
    this.cateTouchInfo = { windowW: window.innerWidth }
    this.disTouchInfo = { distant: 0 }
  },
  mounted() {
    this.initOrginLocation()
    HomeAip.homeInfo().then((res) => {
      console.log('homeInfo', res)
    })
  },
  methods: {
    cateTouchStart(e) {
      this.cateTouchInfo.cateStartX = e.touches[0].pageX
      this.cateTouchInfo.cateStartY = e.touches[0].pageY
      this.cateTouchInfo.cateTouchInit = true
    },
    cateTouchMove(e) {
      if (!this.cateTouchInfo.cateTouchInit) return
      const deltaX = e.touches[0].pageX - this.cateTouchInfo.cateStartX
      const deltaY = e.touches[0].pageY - this.cateTouchInfo.cateStartY
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        this.cateTouchInfo.cateMovePercent = 0
        return
      }
      e.preventDefault()
      if (
        (this.cateIndex === 0 && deltaX > 0) ||
        (this.cateIndex === 1 && deltaX < 0)
      ) {
        this.cateTouchInfo.cateMovePercent = 0
        return
      }
      const left = this.cateIndex === 0 ? 0 : -this.cateTouchInfo.windowW
      const offsetWidth = Math.min(
        0,
        Math.max(-this.cateTouchInfo.windowW, left + deltaX)
      )
      this.$refs.cateWrapper.style[transform] = `translateX(${offsetWidth}px)`
      this.$refs.cateWrapper.style[transitionDuration] = null
      this.cateTouchInfo.cateMovePercent = Math.abs(
        deltaX / this.cateTouchInfo.windowW
      )
      console.log(deltaX)
    },
    cateTouchEnd() {
      this.cateTouchInfo.cateTouchInit = false
      if (this.cateTouchInfo.cateMovePercent === 0) return
      if (this.cateIndex === 0) {
        if (this.cateTouchInfo.cateMovePercent > 0.2) {
          this.cateIndex = 1
          this.$refs.cateWrapper.style[transform] = `translateX(${-this
            .cateTouchInfo.windowW}px)`
        } else {
          this.$refs.cateWrapper.style[transform] = 'translateX(0px)'
        }
      } else {
        if (this.cateTouchInfo.cateMovePercent > 0.2) {
          this.$refs.cateWrapper.style[transform] = 'translateX(0px)'
          this.cateIndex = 0
        } else {
          this.$refs.cateWrapper.style[transform] = `translateX(${-this
            .cateTouchInfo.windowW}px)`
        }
      }
      this.$refs.cateWrapper.style[transitionDuration] = '500ms'
    },
    disTouchStart(e) {
      this.disTouchInfo.disStartX = e.touches[0].pageX
      this.disTouchInfo.disStartY = e.touches[0].pageY
      this.disTouchInfo.disTouchInit = true
    },
    disTouchMove(e) {
      const deltaX = e.touches[0].pageX - this.disTouchInfo.disStartX
      const deltaY = e.touches[0].pageY - this.disTouchInfo.disStartY
      // console.log('deltaX', deltaX, 'deltaY', deltaY)
      // if (Math.abs(Math.abs(deltaX) - Math.abs(deltaY)) < 30) {
      //   console.log('0000')
      //   this.disTouchInfo.stop = true
      //   return
      // }
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        this.disTouchInfo.stop = true
        return
      }
      console.log('22222')
      this.disTouchInfo.stop = false
      e.preventDefault()
      const reqDeltaX = this.disTouchInfo.distant + deltaX
      this.disTouchInfo.reqDeltaX = reqDeltaX
      this.$refs.disWrapper.style[transform] = `translateX(${reqDeltaX}px)`
      this.$refs.disWrapper.style[transitionDuration] = null
    },
    disTouchEnd(e) {
      console.log('3333')

      if (this.disTouchInfo.stop) return
      const percent = Math.round(
        Math.abs(this.disTouchInfo.distant - this.disTouchInfo.reqDeltaX) /
          (window.innerWidth / 3)
      )
      console.log('percent', percent)
      if (this.disTouchInfo.reqDeltaX > this.disTouchInfo.distant) {
        this.disTouchInfo.distant += (window.innerWidth / 3) * percent
        this.disLeftIndex = this.disLeftIndex - percent
        if (this.disLeftIndex <= 0) {
          this.initOrginLocation()
        } else {
          this.$refs.disWrapper.style[transitionDuration] = '500ms'
          this.$refs.disWrapper.style[
            transform
          ] = `translateX(${this.disTouchInfo.distant}px)`
        }
      } else {
        this.disTouchInfo.distant -= (window.innerWidth / 3) * percent
        this.disLeftIndex = this.disLeftIndex + percent
        if (this.disLeftIndex >= 6) {
          this.initOrginLocation()
        } else {
          this.$refs.disWrapper.style[
            transform
          ] = `translateX(${this.disTouchInfo.distant}px)`
          this.$refs.disWrapper.style[transitionDuration] = '500ms'
        }
      }
      console.log(this.disLeftIndex)
    },
    initOrginLocation() {
      this.disLeftIndex = 3
      this.disTouchInfo.distant = -window.innerWidth
      // this.$refs.disWrapper.style[transitionDuration] = '1ms'
      this.$refs.disWrapper.style[
        transform
      ] = `translateX(${this.disTouchInfo.distant}px)`
    },
    setStyle(index) {
      if (index === this.disLeftIndex) {
        return 'text-align: left;'
      } else if (index === this.disLeftIndex + 1) {
        return 'text-align: center;'
      } else if (index === this.disLeftIndex + 2) {
        return 'text-align: right;'
      } else {
        return 'text-align: center;'
      }
    },
    getImgWidth(index) {
      if (index === this.disLeftIndex + 1) {
        return 'width:100%;'
      }
    },
  },
}
</script>
//https://m.360buyimg.com/mobilecms/s1125x939_jfs/t1/171188/40/5449/67605/601a733eE9eb166b1/2440ac201ce1c627.jpg
<style scoped lang="scss">
.home-warrper {
  .banner-wrapper {
    height: 260px;
    background: url('../../assets/images/banner-bg.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .cate-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    .cate-bg {
      width: 100%;
      height: 100%;
      width: 100%;
      overflow: auto;
      position: relative;
      min-height: 150px;
      img {
        width: 100%;
        position: absolute;
        height: 100%;
      }
    }
    .cate-container {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      .cate-frist {
        position: absolute;
        top: 0;
        left: 0%;
        width: 100%;
        height: 100%;
      }
      .cate-second {
        position: absolute;
        top: 0;
        left: 100%;
        width: 100%;
        height: 100%;
      }
      .cate-item {
        width: 20%;
        float: left;
        text-align: center;
        padding: 5px 0;
        text-decoration: none;
        .cate-icon {
          width: 30px;
          vertical-align: top;
        }
        .cate-name {
          line-height: 30px;
          display: block;
          font-size: 10px;
        }
      }
    }
  }
  .dis-wrapper {
    width: 100%;
    height: 120px;
    position: relative;
    overflow: hidden;
    .dis-container {
      white-space: nowrap;
      .dis-item {
        display: inline-block;
        width: 33.33%;
        overflow: hidden;
        .dis-img {
          width: 100px;
          vertical-align: baseline;
        }
      }
    }
  }
}
</style>

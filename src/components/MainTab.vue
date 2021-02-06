<template>
  <div id="main-tab-warpper">
    <a
      v-for="(item, index) in mainTabData"
      class="main-tab-item"
      :key="item.index"
      @click="tabSelect(item)"
    >
      <img class="item-img" :src="getImg(index)" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    mainTabData: Array,
    default: [],
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  computed: {},
  methods: {
    tabSelect(item) {
      this.currentIndex = item.index
      this.$router.push(item.path)
    },
    getImg(index) {
      return this.currentIndex === index
        ? this.mainTabData[index].selectImg
        : this.mainTabData[index].defaultImg
    },
  },
}
</script>
<style scoped lang="scss">
#main-tab-warpper {
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  display: flex;
  box-shadow: 5px 5px 5px 5px #ccc;
  justify-content: space-between;
  .main-tab-item {
    height: 100%;
    .item-img {
      width: 65px;
      height: 50px;
    }
  }
}
</style>

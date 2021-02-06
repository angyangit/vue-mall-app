<template>
  <div id="searchbar-warpper">
    <i class="icon-shouqi def-icon"></i>
    <div class="ipt-warpper">
      <input class="ipt-search" v-model="searchKey" placeholder="输入内容" />
      <i class="icon-sousuo ic-search"></i>
    </div>
    <i class="icon-iconfontwo def-icon"></i>
  </div>
</template>

<script>
export default {
  name: 'searchbar',
  props: {},
  data() {
    return { searchKey: '' }
  },
  computed: {},
  methods: {},
}
</script>
<style scoped lang="scss">
@import '../styles/variables.scss';
#searchbar-warpper {
  height: 50px;
  line-height: 50px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .ipt-warpper {
    position: relative;
    display: inline-block;
    flex-grow: 1;
    .ipt-search {
      position: absolute;
      left: 0;
      top: 10px;
      height: 30px;
      border-radius: 15px;
      border: 0;
      width: 100%;
      font-size: 16px;
      box-sizing: border-box;
      padding-left: 40px;
      background: white;
      border: 0;
      outline: none;
      &::placeholder {
        color: $color-text-white;
      }
      &:focus {
        caret-color: $color-theme;
      }
    }
    .ic-search {
      position: absolute;
      left: 10px;
      color: #ddd;
    }
  }
  .def-icon {
    color: white;
    font-weight: 600;
    font-size: 20px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .icon-iconfontwo {
    font-size: 24px;
  }
}
</style>

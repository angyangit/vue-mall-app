<template>
  <div id="app">
    <router-view></router-view>
    <main-tab :main-tab-data="mainTabData"></main-tab>
  </div>
</template>

<script type="text/ecmascript-6">
import MainTab from './components/MainTab'
import {homeTabData} from '../common/constant'
export default {
  data () {
    return {
      mainTabData: homeTabData
    }
  },
  components: {
    MainTab
  }
}
</script>
<style scoped lang="scss">
#app {
}
</style>

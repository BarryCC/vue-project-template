<template>
  <div id="app">
    <Layout>
      <Header></Header>
      <Slider></Slider>
      <div class="main">
        <router-view/>
        <!-- <Footer></Footer> -->
      </div>
    </Layout>
  </div>
</template>

<script>
import layout from './components/layout/Layout'
import header from './components/header/Header'
import slider from './components/slider/Slider'
// import footer from './components/footer/Footer'
export default {
  name: 'app',
  components: {
    'Layout': layout,
    'Header': header,
    // 'Footer': footer,
    'Slider': slider
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

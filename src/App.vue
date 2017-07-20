<template>
  <div id="app">
    <navbar></navbar>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Navbar from 'components/Navbar'
import AppMain from 'components/AppMain'
import FooterBar from 'components/FooterBar'
// import { Monitor } from 'monitor-client'
export default {
  name: 'app',
  components: {
    Navbar,
    AppMain,
    FooterBar
  },
  mounted () {
    // let monitor = new Monitor({id: 'Duke', url: 'http://localhost:8080/api/test'})
    // console.log(monitor.getMainTiming())
    // console.log(monitor.getResourceTiming())
  }
}
</script>

<style lang="scss">
@import "~bulma";
@import "~scss/style.scss";
@import "~components/Table/style.scss";
@import '~element-ui/lib/theme-default/icon.css';
@import '~element-ui/lib/theme-default/date-picker.css';
</style>

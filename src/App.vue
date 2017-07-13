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
export default {
  name: 'app',
  components: {
    Navbar,
    AppMain,
    FooterBar
  }
}
</script>

<style lang="scss">
@import "~bulma";
@import "~scss/style.scss";
</style>

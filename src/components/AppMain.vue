<template>
  <section class="app-main">
    <transition
        name="slide-fade">
      <router-view class="animated"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "~scss/base.scss";
.app-main {
  padding-top: 60px;
  min-height: $min-height;
  background: $bg-color;
  transform: translate3d(0, 0, 0);
}
.app-content {
  padding: 0;
}
.app-main-un{
  padding-top: 0px;
  .app-content{
    padding: 0px;
  }
}
</style>

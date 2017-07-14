<template lang="html">
<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">
      <router-link class="nav-item" to="/">
          <img class="is-hidden-mobile" src="~assets/img/nav-logo.png" alt="logo">
          <img class="is-hidden-tablet" src="~assets/img/nav-logo.png" alt="logo">
      </router-link>
    </div>
    <div class="nav-center">
      <router-link
          class="nav-item is-tab"
          v-for="item in menus"
          :key="item.path"
          :to="`/${item.path}`"
          :class="{'is-active': activeMenu === item.path}">
        {{item.label}}
      </router-link>
      <div class="nav-item">
      </div>
    </div>
    <div class="nav-right nav-menu">
    </div>
  </div>
</nav>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {
          label: '首页',
          path: ''
        }, {
          label: '候选人',
          path: 'candidate'
        }, {
          label: '人才库',
          path: 'talent'
        }, {
          label: '报告',
          path: 'report'
        }
      ]
    }
  },
  computed: {
    activeMenu () {
      if (this.$route.name === 'Home') return ''
      return this.$route.path.split('/')[1]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/base.scss";
.nav {
  &.has-shadow{
    box-shadow: none;
    position: fixed;
    width: 100%;
    transition: all .3s;
    background: linear-gradient(270deg, #1486a2, #154163);
  }
  .nav-item a, a.nav-item {
    color: $nav-default-color;
    &:hover{
      color: white;
      border-bottom-color: white;
    }
    &.is-active{
      color: $nav-default-color;
      border-bottom-color: $nav-default-color;
      &:hover{
        color: white;
        border-bottom-color: white;
      }
    }
  }
  .nav-toggle{
    background: white;
    &.is-active span{
      background-color: $default-color;
    }
  }
  .nav-right.nav-menu.is-active{
    background: $nav-bg-color;
    opacity: 0.92;
  }
}
.logo img{
  width: $logo-size;
  height: $logo-size;
  border-radius: 50%;
}
.is-hidden-tablet{
  max-height: 1.5rem;
}
</style>

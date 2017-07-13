<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>Copyright@2013-2017 闯奇信息科技（上海）有限公司 版权所有</p>
        <p>沪ICP备15011042号-2</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "~scss/base.scss";
.footer {
  background: $bg-color;
  padding: $base-padding;
  .content{
    p{
      font-size: 12px;
      margin-bottom: 0;
    }
  }
  .social a {
    border-bottom: none !important;
  }
}
</style>

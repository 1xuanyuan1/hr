<template>
  <div class="card">
    <div class="card-header">
      <div class="icon-title"></div>
      <template v-if="title">
        <div class="title is-4">
          <strong>{{title}}</strong>
        </div>
      </template>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>  
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

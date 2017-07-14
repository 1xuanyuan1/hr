<template>
  <div class="asm-table">
    <div class="asm-tr asm-head">
      <div class="asm-th asm-grow-1"></div>
      <div class="asm-th" v-for="column in columns">
        {{string.candidate[column]}}
      </div>
      <div class="asm-th asm-grow-3">操作</div>
    </div>
    <div class="asm-tr" v-for="(item, index) in data">
      <div class="asm-td asm-grow-1">{{index + 1}}.</div>
      <div class="asm-td" v-for="column in columns">
        <template v-if="column == 'create_date'">
          {{$dateFormat('yyyy-MM-dd hh:mm:ss', new Date(item[column]))}}
        </template>
        <template v-else>
          {{item[column]}}
        </template>
      </div>
      <div class="asm-td asm-grow-3">
        <a>邀约</a>&nbsp;/&nbsp;<a>自填简历</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      string: 'global/string'
    })
  },
  data () {
    return {
      columns: [
        'name',
        'phone',
        'post',
        'source',
        'create_date'
      ]
    }
  }
}
</script>
<style lang="scss">
@import './style.scss';
</style>

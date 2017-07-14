<template>
  <div class="asm-table">
    <div class="asm-tr asm-head">
      <div class="asm-th asm-grow-1"></div>
      <div class="asm-th" v-for="column in columns">
        {{string.interview[column]}}
      </div>
      <div class="asm-th asm-grow-3">操作</div>
    </div>
    <div class="asm-tr" v-for="(item, index) in list">
      <div class="asm-td asm-grow-1">{{index + 1}}.</div>
      <div class="asm-td" v-for="column in columns">
        <template v-if="column == 'interview_date'">
          {{$dateFormat('yyyy-MM-dd hh:mm:ss', new Date(item[column]))}}
        </template>
        <template v-else>
          {{item[column]}}
        </template>
      </div>
      <div class="asm-td asm-grow-3">
        操作
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    status: {
      type: String,
      default: 'pending'
    }
  },
  computed: {
    ...mapGetters({
      string: 'global/string'
    }),
    data () {
      return this.$store.state.interview[this.status]
    },
    list () {
      return this.data.list || []
    }
  },
  data () {
    return {
      columns: [
        'name',
        'post',
        'interview_date',
        'interviewer'
      ]
    }
  }
}
</script>
<style lang="scss">
@import './style.scss';
</style>

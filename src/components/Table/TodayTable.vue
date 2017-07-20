<template>
  <div class="asm-table">
    <div class="asm-tr asm-head">
      <div class="asm-th" v-for="column in columns">
        {{string.home[column]}}
      </div>
    </div>
    <div class="asm-tr">
      <div class="asm-td big" v-for="column in columns">
        {{data[column]}}
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      columns: [
        'all',
        'communication',
        'pending'
      ]
    }
  },
  computed: {
    ...mapGetters({
      string: 'global/string'
    })
  }
}
</script>
<style lang="css" scoped>
.asm-td.big {
  font-size: 2em;
  padding: 10px 0;
}
</style>


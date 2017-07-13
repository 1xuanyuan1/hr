<template>
  <div class="container">
    <card title="首页">
      <table>
        <tr v-for="item in list">
          <td>{{item.name}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.post}}</td>
          <td>{{item.source}}</td>
          <td>{{item.create_date}}</td>
        </tr>
      </table>
    </card>
  </div>
</template>
<script>
import { Card } from '@/components/Common'
export default {
  name: 'Home',
  components: {
    Card
  },
  asyncData ({store}) {
    return store.dispatch('candidate/getList')
  },
  computed: {
    list () {
      return this.$store.state.candidate.list
    }
  }
}
</script>

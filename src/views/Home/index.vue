<template>
  <div class="container">
    <card title="首页">
      <table>
        <tr v-for="item in list">
          <td>{{item.name}}</td>
          <td>{{item.name}}</td>
          <td>{{item.name}}</td>
          <td>{{item.name}}</td>
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
  mounted () {
    this.$api.get('candidate/list').then((result) => {
      console.log(result)
    })
  },
  computed: {
    list () {
      return this.$store.state.candidate.list
    }
  }
}
</script>

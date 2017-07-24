<template>
  <div class="container">
    <card title="今日概况">
      <today-table :data="info"></today-table>
    </card>
    <card title="今天待沟通">
      <candidate-table :data="communication" isHome></candidate-table>
    </card>
    <card title="今日待面试">
      <interview-table :info="pending"></interview-table>
    </card>
  </div>
</template>
<script>
import { Card } from '@/components/Common'
import { TodayTable, CandidateTable, InterviewTable } from '@/components/Table'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    Card,
    TodayTable,
    CandidateTable,
    InterviewTable
  },
  asyncData ({store, cookie}) {
    return store.dispatch('home/getHomeInfo', {cookie})
  },
  computed: {
    ...mapGetters({
      allNum: 'home/allNum',
      communication: 'home/communication',
      pending: 'home/pending'
    }),
    info () {
      return {
        all: this.allNum,
        communication: this.communication.length,
        pending: this.pending.length
      }
    }
  },
  data () {
    return {
      data: {}
    }
  }
}
</script>

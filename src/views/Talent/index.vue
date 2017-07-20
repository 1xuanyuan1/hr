<template>
  <div class="container">
    <card title="人才库">
      <interview-table status="talent"></interview-table>
    </card>
  </div>
</template>
<script>
import { Card } from 'components/Common'
import { InterviewTable } from 'components/Table'
export default {
  name: 'Talent',
  components: {
    Card,
    InterviewTable
  },
  asyncData ({store}) {
    return store.dispatch('interview/getList', {status: 'talent'})
  }
}
</script>


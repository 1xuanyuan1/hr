<template>
  <div class="container">
    <card title="候选人详情" ref="card">
    </card>
  </div>  
</template>
<script>
import { Card } from '@/components/Common'
export default {
  name: 'CandidateDetail',
  components: {
    Card
  },
  created () {
    console.log(this.$route.query)
  }
}
</script>


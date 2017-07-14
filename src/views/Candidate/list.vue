<template>
  <div class="container">
    <card title="候选人列表">
      <button class="button is-primary" slot="right" @click="toAdd">添加候选人</button>
      <div class="tabs is-centered is-boxed">
        <ul>
          <li v-for="item in menus" :class="{'is-active': item === activeMenu}" @click="changeMenu(item)">
            <a>
              <span>{{string.menu[item]}} {{item === 'communication' ? total : (eachCount[item] || 0)}}</span>
            </a>
          </li>
        </ul>
      </div>
      <transition-group name="h-fade" tag="div">
        <candidate-table :data="list" key="communication" v-if="activeMenu === 'communication'"></candidate-table>
        <interview-table v-for="status in menu" :key="status" :status="status" v-if="activeMenu === status"></interview-table>
      </transition-group>
    </card>
  </div>
</template>
<script>
import { Card } from '@/components/Common'
import { CandidateTable, InterviewTable } from '@/components/Table'
import { mapGetters } from 'vuex'
export default {
  name: 'CandidataList',
  components: {
    Card,
    CandidateTable,
    InterviewTable
  },
  asyncData ({store}) {
    return Promise.all([
      store.dispatch('candidate/getList', {invitation: false}),
      store.dispatch('interview/getEachCount')
    ])
  },
  computed: {
    ...mapGetters({
      string: 'global/string',
      total: 'candidate/total',
      list: 'candidate/list',
      eachCount: 'interview/eachCount'
    })
  },
  data () {
    return {
      activeMenu: 'communication',
      menu: ['pending', 'success', 'fail'],
      menus: ['communication', 'pending', 'success', 'fail']
    }
  },
  methods: {
    toAdd () {
      this.$router.push('/candidate/add')
    },
    changeMenu (item) {
      this.activeMenu = item
      if (item !== 'communication') {
        this.$store.dispatch('interview/getList', {status: item})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs{
  margin-top: 19px;
  margin-bottom: 0;
  li{
    transition: all .3s;
  }
}
</style>


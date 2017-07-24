<template>
  <div class="container">
    <card title="候选人列表">
      <button class="button is-primary" slot="right" @click="toAdd">添加候选人</button>
      <div class="block">
        <span class="demonstration">时间：</span>
        <el-date-picker
          v-model="date"
          type="daterange"
          clearable
          placeholder="选择日期范围">
        </el-date-picker>
      </div>
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
  asyncData ({store, cookie}) {
    return Promise.all([
      store.dispatch('candidate/getList', {invitation: false, cookie}),
      store.dispatch('interview/getEachCount', {cookie})
    ])
  },
  computed: {
    ...mapGetters({
      string: 'global/string',
      total: 'candidate/total',
      list: 'candidate/list',
      eachCount: 'interview/eachCount'
    }),
    date: {
      get () {
        return [this.startTime, this.endTime]
      },
      set (val) {
        if (!val && val.length < 2) return
        this.startTime = val[0]
        this.endTime = val[1]
        if (this.activeMenu === 'communication') {
          this.updateCandidate()
        } else {
          this.changeMenu(this.activeMenu)
        }
        this.updateCount()
      }
    }
  },
  data () {
    return {
      activeMenu: 'communication',
      menu: ['pending', 'success', 'fail'],
      menus: ['communication', 'pending', 'success', 'fail'],
      startTime: null,
      endTime: null
    }
  },
  methods: {
    toAdd () {
      this.$router.push('/candidate/add')
    },
    changeMenu (item) {
      this.activeMenu = item
      if (item !== 'communication') {
        let param = {status: item}
        if (this.startTime && this.endTime) {
          param['create_date'] = {$gte: this.startTime, $lt: this.endTime}
        }
        this.$store.dispatch('interview/getList', param)
      }
    },
    updateCandidate () {
      let param = {invitation: false}
      if (this.startTime && this.endTime) {
        param['create_date'] = {$gte: this.startTime, $lt: this.endTime}
      }
      this.$store.dispatch('candidate/getList', param)
    },
    updateCount () {
      let param = {}
      if (this.startTime && this.endTime) {
        param.startTime = this.startTime
        param.endTime = this.endTime
      }
      this.$store.dispatch('interview/getEachCount', param)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs{
  // margin-top: 19px;
  margin-bottom: 0;
  li{
    transition: all .3s;
  }
}
.block{
  margin-top: 19px;
  margin-left: 20px;
}
</style>


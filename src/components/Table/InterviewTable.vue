<template>
<div class="interview-table">
  <div class="asm-table">
    <div class="asm-tr asm-head">
      <div class="asm-th asm-grow-1"></div>
      <div class="asm-th" v-for="column in columns">
        {{string.interview[column]}}
      </div>
      <div class="asm-th asm-grow-3">{{status === 'pending' ? '操作' : '评价'}}</div>
    </div>
    <div class="asm-tr asm-no-data" v-if="!isLoading && list.length < 1"></div>
    <div class="asm-tr" v-for="(item, index) in list" v-else>
      <div class="asm-td asm-grow-1">{{index + 1}}.</div>
      <div class="asm-td" v-for="column in columns">
        <template v-if="column == 'interview_date'">
          {{$dateFormat('yyyy-MM-dd hh:mm:ss', new Date(item[column]))}}
        </template>
        <template v-else-if="column === 'name' || column === 'post'">
          {{item.candidate ? item.candidate[column] : '---'}}
        </template>
        <template v-else>
          {{item[column]}}
        </template>
      </div>
      <div class="asm-td asm-grow-3">
        <template v-if="status === 'pending'">
          <a @click="operation(item._id, 'success')">通过</a>&nbsp;/&nbsp;<a @click="operation(item._id, 'fail')">不通过</a>
        </template>
        <template v-else>
          {{item.evaluation || '---'}}
        </template>
      </div>
    </div>
    <div class="asm-tr" v-if="isLoading">
      <loading></loading>
    </div>
  </div>
  <card-modal ref='evaluationModal' :visible="false" title="评价" @click="addEvaluation">
      <validate-input 
        name="评价"
        placeholder="请输入评价"
        rules="required" 
        :value.sync="evaluation" 
        @keyup.enter.native="addEvaluation"
        @update="value => evaluation = value"/>
  </card-modal>
</div>
</template>
<script>
import { CardModal, Loading } from 'components/Common'
import { mapGetters } from 'vuex'
export default {
  props: {
    status: {
      type: String,
      default: 'pending'
    }
  },
  components: {
    CardModal,
    Loading
  },
  computed: {
    ...mapGetters({
      string: 'global/string'
    }),
    data () {
      return this.$store.state.interview[this.status]
    },
    hasNext () {
      return this.data.hasNext
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
      ],
      isLoading: false,
      page: 1
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, false)
  },
  methods: {
    handleScroll () {
      if (this.isLoading) return
      let scrollY = window.scrollY
      let bodyHeight = document.querySelector('body').offsetHeight
      // console.log(this.status, scrollY, bodyHeight, bodyHeight / scrollY)
      if (bodyHeight - scrollY < 1000 && this.hasNext) {
        this.page++
        this.isLoading = true
        this.$store.dispatch('interview/getListMore', {param: {status: this.status}, page: this.page}).then(() => {
          this.isLoading = false
        })
      }
    },
    operation (id, status) {
      this.$api.post('interview/updateStatus', {id, status}).then((req) => {
        this.$openMessage({title: req.message})
        Promise.all([
          this.$store.dispatch('interview/getList', {status: this.status}),
          this.$store.dispatch('interview/getEachCount')
        ])
      })
    },
    addEvaluation () {
      console.log('addEvaluation')
    }
  }
}
</script>
<style lang="scss">
@import './style.scss';
</style>

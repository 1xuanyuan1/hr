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
          <a @click="operation(item._id)">处理</a>
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
  <card-modal ref='evaluationModal' :visible="false" title="处理" @click="addEvaluation">
      <validate-input 
        name="评价"
        placeholder="请输入评价"
        rules="required" 
        :value.sync="param.evaluation" 
        @keyup.enter.native="addEvaluation"
        @update="value => $set(param, 'evaluation', value)"/>
        <div class="field is-horizontal" style="width: 80%;">
          <div class="field-label is-normal">
            <label class="label">处理</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="param.status">
                    <option value="success">通过</option>
                    <option value="fail">不通过</option>
                    <option value="talent">进人才库</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
  </card-modal>
</div>
</template>
<script>
import { CardModal, Loading, ValidateInput } from 'components/Common'
import { mapGetters } from 'vuex'
export default {
  props: {
    status: {
      type: String,
      default: 'pending'
    },
    info: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CardModal,
    Loading,
    ValidateInput
  },
  computed: {
    ...mapGetters({
      string: 'global/string'
    }),
    hasInfo () { // 是否有传入相关数据
      return this.info.length > 0
    },
    data () {
      return this.$store.state.interview[this.status]
    },
    hasNext () {
      return this.data.hasNext
    },
    list () {
      if (this.hasInfo) return this.info
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
      page: 1,
      param: {}
    }
  },
  mounted () {
    !this.hasInfo && window.addEventListener('scroll', this.handleScroll, false)
  },
  beforeDestroy () {
    !this.hasInfo && window.removeEventListener('scroll', this.handleScroll, false)
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
    operation (id) {
      this.param = {
        id,
        status: 'success',
        evaluation: ''
      }
      this.$refs.evaluationModal.open()
    },
    addEvaluation () {
      this.$api.post('interview/updateStatus', this.param).then((req) => {
        this.$openMessage({title: req.message})
        Promise.all([
          this.$store.dispatch('interview/getList', {status: this.status}),
          this.$store.dispatch('interview/getEachCount')
        ])
        this.$refs.evaluationModal.close()
      })
    }
  }
}
</script>

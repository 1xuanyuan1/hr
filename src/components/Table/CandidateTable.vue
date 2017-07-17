<template>
  <div class="candidate-table">
    <div class="asm-table">
      <div class="asm-tr asm-head">
        <div class="asm-th asm-grow-1"></div>
        <div class="asm-th" v-for="column in columns">
          {{string.candidate[column]}}
        </div>
        <div class="asm-th asm-grow-3">操作</div>
      </div>
      <div class="asm-tr asm-no-data" v-if="!isLoading && data.length < 1"></div>
      <div class="asm-tr" v-for="(item, index) in data">
        <div class="asm-td asm-grow-1">{{index + 1}}.</div>
        <div class="asm-td" v-for="column in columns">
          <template v-if="column == 'create_date'">
            {{$dateFormat('yyyy-MM-dd hh:mm:ss', new Date(item[column]))}}
          </template>
          <template v-else>
            {{item[column]}}
          </template>
        </div>
        <div class="asm-td asm-grow-3">
          <a @click="openInvite(item._id)">邀约</a>&nbsp;/&nbsp;<a>自填简历</a>
        </div>
      </div>
      <div class="asm-tr" v-if="isLoading">
        <loading></loading>
      </div>
    </div>
    <card-modal ref='inviteModal' :visible="false" title="邀约" @click="addInterview">
      <validate-input 
        name="面试时间"
        :placeholder="`请输入面试时间`"
        rules="required" 
        :value.sync="interviewDate" 
        @keyup.enter.native="addInterview"
        @update="value => interviewDate = value"/>
      <validate-input 
        name="面试官"
        :placeholder="`请输入面试官`"
        rules="required" 
        :value.sync="interviewer" 
        @keyup.enter.native="addInterview"
        @update="value => interviewer = value"/>
    </card-modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { CardModal, ValidateInput, Loading } from 'components/Common'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CardModal,
    ValidateInput,
    Loading
  },
  computed: {
    ...mapGetters({
      string: 'global/string'
    }),
    param: {
      get () {
        return {
          candidate: this.activeCandidate,
          'interview_date': this.interviewDate,
          interviewer: this.interviewer
        }
      },
      set (item = {}) {
        this.activeCandidate = item.candidate || ''
        this.interviewDate = item.interview_date || ''
        this.interviewer = item.interviewer || ''
      }
    }
  },
  data () {
    return {
      columns: [
        'name',
        'phone',
        'post',
        'source',
        'create_date'
      ],
      isLoading: false,
      page: 1,
      interviewDate: '',
      interviewer: '',
      activeCandidate: ''
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, false)
  },
  methods: {
    addInterview () {
      this.$api.post('interview/insert', this.param).then(req => {
        if (req.code === 200) {
          this.$openMessage({title: '添加成功'})
          Promise.all([
            this.$store.dispatch('candidate/getList', {invitation: false}),
            this.$store.dispatch('interview/getEachCount')
          ]).then(() => {
            this.param = {}
            this.$refs.inviteModal.close()
          })
        } else {
          this.$openMessage({title: '添加失败', type: 'danger'})
        }
      })
    },
    openInvite (id) {
      this.activeCandidate = id
      this.$refs.inviteModal.open()
    },
    handleScroll () {
      if (this.isLoading) return
      let scrollY = window.scrollY
      let bodyHeight = document.querySelector('body').offsetHeight
      // console.log(this.status, scrollY, bodyHeight, bodyHeight / scrollY)
      if (bodyHeight - scrollY < 1000 && this.hasNext) {
        this.page++
        this.isLoading = true
        this.$store.dispatch('candidate/getListMore', {param: {invitation: false}, page: this.page}).then(() => {
          this.isLoading = false
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import './style.scss';
</style>

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
          <a @click="openInvite(item._id)">邀约</a>&nbsp;/&nbsp;
          <a @click="showDetail(item._id)" v-if="item.detail">查看简历</a>
          <a @click="showLinkModal(item._id)" v-else>自填简历</a>
        </div>
      </div>
      <div class="asm-tr" v-if="isLoading">
        <loading></loading>
      </div>
    </div>
    <card-modal ref='inviteModal' :visible="false" title="邀约" @click="addInterview">
      <div class="field is-horizontal" style="width: 80%;">
        <div class="field-label is-normal">
          <label class="label">面试时间</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
                <el-date-picker
                  v-model="interviewDate"
                  type="datetime"
                  placeholder="选择面试时间">
                </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <validate-input 
        name="面试官"
        :placeholder="`请输入面试官`"
        rules="required" 
        :value.sync="interviewer" 
        @keyup.enter.native="addInterview"
        @update="value => interviewer = value"/>
    </card-modal>
    <modal ref="linkModal" :visible="false">
      <card title="请复制下方列表给候选人">
        <div class="link-modal-content">
          <input class="input" :value="link" />
        </div>
      </card>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { CardModal, ValidateInput, Loading, Modal, Card } from 'components/Common'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    isHome: { // 是否是首页
      type: Boolean,
      default: false
    }
  },
  components: {
    CardModal,
    Modal,
    Card,
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
        this.activeCandidate = item.candidate || Date.now()
        this.interviewDate = item.interview_date || ''
        this.interviewer = item.interviewer || ''
      }
    },
    updateAction () {
      if (this.isHome) {
        return [
          this.$store.dispatch('home/getHomeInfo', {})
        ]
      } else {
        return [
          this.$store.dispatch('candidate/getList', {invitation: false}),
          this.$store.dispatch('interview/getEachCount', {})
        ]
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
      link: '',
      isLoading: false,
      page: 1,
      interviewDate: Date.now(),
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
          this.$openMessage({title: '操作成功'})
          Promise.all(this.updateAction).then(() => {
            this.param = {}
            this.$refs.inviteModal.close()
          })
        } else {
          this.$openMessage({title: '操作失败', type: 'danger'})
        }
      })
    },
    showLinkModal (id) {
      this.link = `http://${process.env.NODE_ENV === 'production' ? 'hr.topasm.com' : 'localhost:8080'}/candidate/detail/${id}`
      this.$refs.linkModal.open()
    },
    showDetail (id) {
      this.$router.push({name: 'candidate-show-detail', params: {id}})
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
        this.$store.dispatch('candidate/getListMore', {invitation: false, page: this.page}).then(() => {
          this.isLoading = false
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input__inner{
  height: 36px;
}
.link-modal-content{
  padding: 20px;
}
</style>

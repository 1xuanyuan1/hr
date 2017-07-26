<template>
  <div class="container">
    <card title="报告概况">
      <div class="block">
        <span class="demonstration">时间：</span>
        <el-date-picker
          v-model="time"
          type="daterange"
          :picker-options="pickerOptions"
          placeholder="选择日期范围">
        </el-date-picker>
      </div>
      <report-table :data="info"></report-table>
    </card>
    <card title="面试通过人员">
      <interview-table status="success" :info="success"></interview-table>
    </card>
    <card title="人才库">
      <interview-table status="talent" :info="talent"></interview-table>
    </card>
  </div>
</template>
<script>
import { Card } from 'components/Common'
import { mapGetters } from 'vuex'
import { ReportTable, InterviewTable } from 'components/Table'
import moment from 'moment'
export default {
  name: 'report',
  components: {
    Card,
    ReportTable,
    InterviewTable
  },
  asyncData ({store, cookie}) {
    let now = new Date()
    let param = {
      startTime: moment().subtract(now.getDate() - 1, 'days').format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD')
    }
    return store.dispatch('report/getReportInfo', {cookie, ...param})
  },
  computed: {
    ...mapGetters({
      allNum: 'report/allNum',
      success: 'report/success',
      talent: 'report/talent'
    }),
    info () {
      return {
        all: this.allNum,
        success: this.success.length,
        talent: this.talent.length
      }
    },
    time: { // 时间控件里的值
      get () {
        return [this.param.startTime, this.param.endTime]
      },
      set (val) {
        if (val === '' || val.length !== 2) return
        let startTime = moment(val[0]).format('YYYY-MM-DD')
        let endTime = moment(val[1]).format('YYYY-MM-DD')
        if (this.param.startTime !== startTime || this.param.endTime !== endTime) {
          this.param.startTime = startTime
          this.param.endTime = endTime
          this.getData()
        }
      }
    }
  },
  data () {
    let now = new Date()
    let param = {
      startTime: moment().subtract(now.getDate() - 1, 'days').format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD')
    }
    return {
      param,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() >= Date.now()
        },
        shortcuts: [{
          text: '本周',
          onClick (picker) {
            const start = moment().subtract(now.getDay(), 'days').format('YYYY-MM-DD')
            picker.$emit('pick', [start, now])
          }
        }, {
          text: '本月',
          onClick (picker) {
            const start = moment().subtract(now.getDate() - 1, 'days').format('YYYY-MM-DD')
            picker.$emit('pick', [start, now])
          }
        }, {
          text: '上个月',
          onClick (picker) {
            const end = moment().subtract(now.getDate(), 'days')
            const start = moment().subtract(now.getDate() - 1, 'days').subtract(1, 'months')
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '近三个月',
          onClick (picker) {
            const start = moment().subtract(now.getDate() - 1, 'days').subtract(2, 'months')
            picker.$emit('pick', [start, now])
          }
        }]
      }
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('report/getReportInfo', this.param)
    }
  }
}
</script>
<style lang="scss" scoped>
.block{
  margin-top: 19px;
  margin-left: 20px;
}
</style>

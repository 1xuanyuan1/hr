<template>
  <div class="container">
    <card title="添加候选人" ref="card">
      <div class="add-form">
        <validate-input 
          v-for="(val, key) in param" 
          :key="key" 
          :name="string.candidate[key]"
          :placeholder="`请输入候选人${string.candidate[key]}`"
          rules="required" 
          :value.sync="val" 
          @keyup.enter.native="addCandidate"
          @update="value => $set(param, key, value)"/>
        <div class="button-box">
          <button class="button is-primary" @click="addCandidate">添加</button>
          <button class="button" @click="back">返回</button>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import { Card, ValidateInput } from '@/components/Common'
import { mapGetters } from 'vuex'
export default {
  name: 'CandidateAdd',
  components: {
    Card,
    ValidateInput
  },
  computed: {
    ...mapGetters({
      string: 'global/string'
    })
  },
  data () {
    return {
      param: {
        name: '',
        phone: '',
        post: '',
        source: ''
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    addCandidate () {
      let hasErr = false
      this.$refs.card.$children.map((item) => {
        item.$validator.validateAll()
        if (item.errors.any() && !hasErr) {
          item.$el.getElementsByTagName('input')[0].focus()
          hasErr = true
        }
      })
      if (hasErr) { // 如果有错误则直接返回
        return
      }
      this.$api.post('candidate/insert', this.param).then(req => {
        if (req.code === 200) {
          this.$openMessage({title: '添加成功'})
          this.param = {
            name: '',
            phone: '',
            post: '',
            source: ''
          }
        } else {
          this.$openMessage({title: '添加失败', type: 'danger'})
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add-form{
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .button-box{
    display: flex;
    justify-content: center;
    .button:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>


<template>
  <div class="container">
    <card title="候选人简历详情" ref="card">
      <div class="detail-form">
        <validate-input
          v-for="(val, key) in param" 
          :key="key" 
          :name="string.candidatedetails[key]"
          :placeholder="`请输入您的${string.candidatedetails[key]}`"
          rules="required" 
          :value.sync="val"
          :readonly="exist"
          @keyup.enter.native="addCandidateDetail"
          @update="value => $set(param, key, value)"
        ></validate-input>
        <div class="button-box" v-if="!exist">
          <button class="button is-primary" @click="addCandidateDetail">提交</button>
        </div>
      </div>
    </card>
  </div>  
</template>
<script>
import { Card, ValidateInput } from '@/components/Common'
import { mapGetters } from 'vuex'
export default {
  name: 'CandidateDetail',
  components: {
    Card,
    ValidateInput
  },
  asyncData ({store, route}) {
    return store.dispatch('candidate/getDetail', route.params.id)
  },
  created () {
    if (Object.keys(this.detail).length > 0) {
      this.exist = true
      for (let key in this.param) {
        this.$set(this.param, key, this.detail[key] || '')
      }
    }
    // let {...this.param} = this.detail
    // this.$set(this.param, 'candidate', this.$route.query.id)
  },
  computed: {
    ...mapGetters({
      string: 'global/string',
      detail: 'candidate/detail'
    })
  },
  data () {
    return {
      exist: false,
      param: {
        name: '',
        department: '',
        post: '',
        gender: '',
        phone: '',
        native_place: '',
        nation: '',
        birthday: '',
        id_card: '',
        education: '',
        political: '',
        marital: '',
        address: '',
        language: '',
        Interests: '',
        certificate: ''
      }
    }
  },
  methods: {
    addCandidateDetail () {
      if (this.exist) return
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
      this.$api.post('candidate/setDetail?id=' + this.$route.params.id, this.param).then((req) => {
        console.log(req)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-form{
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

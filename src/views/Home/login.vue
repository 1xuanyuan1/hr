<template>
  <div class="login">
    <div class="logo">
      <img src="~@/assets/img/nav-logo.png">
    </div>
    <h1 class="content"></h1>
    <article class="tile is-child">
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input" :class="{'is-danger': errors.has('账号')}" name="账号" type="text" @keyup.enter="login" v-model="username" placeholder="请输入您的账号" v-validate="'required'">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <span class="icon is-small is-right" v-show="errors.has('账号')">
              <i class="fa fa-warning"></i>
            </span>
          </div>
          <p class="help is-danger" v-if="errors.has('账号')">{{ errors.first('账号') }}</p>
        </div>
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input" :class="{'is-danger': errors.has('密码')}" name="密码" @keyup.enter="login" v-model="password" type="password" placeholder="请输入您的密码" v-validate="'required'">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
            <span class="icon is-small is-right" v-show="errors.has('密码')">
              <i class="fa fa-warning"></i>
            </span>
          </div>
          <p class="help is-danger" v-if="errors.has('密码')">{{ errors.first('密码') }}</p>
        </div>
        <div class="field">
          <button class="button " type="button" @click="login" :style="{disabled: loading}">
            登录
          </button>
        </div>
    </article>
  </div>
</template>
<script>
import { ValidateInput } from '@/components/Common'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  components: {
    ValidateInput
  },
  computed: {
    ...mapGetters({
      string: 'global/string'
    }),
    params () {
      return {
        username: this.username,
        password: this.password
      }
    }
  },
  data () {
    return {
      loading: false,
      username: '',
      password: '',
      names: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$api.post('user/login', this.params).then((data) => {
        this.loading = false
        if (data && data.code > 0) {
          this.$openMessage({title: '登录成功'})
          this.$router.replace('/')
        } else {
          this.$openMessage({title: '登录失败！ 账号或者密码错误', type: 'danger'})
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  height: 100vh;
  background-image: url('~@/assets/img/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .content{
    color: white;
  }
  .logo{
    width: 230px;
    margin-bottom: 20px;
  }
  article{
    min-width: 336px;
    max-width: 336px;
    min-height: 300px;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    .control.has-icon{
      margin-bottom: 16px;
      .fa {
        padding-top: 5px;
      }
      input{
        height: 42px;
        background: rgba(255,255,255,0.35);
        border: none !important;
      }
      &.input-password input{
        background: rgba(255,255,255,0.2);
      }
    }
    img{
      width: 160px;
      height: 31px;
      margin: 30px 0;
    }
    .button{
      height: 42px;
      margin-top: 16px;
      width: 100%;
      background: rgba(52, 177, 253, 0.7);
      border: none;
      color: white;
      font-size: 14px;
      display: inline-block;
      &:first-child{
        margin-top: 5px;
      }
    }
    .button.is-outlined{
      background: transparent;
      border: 1px solid white;
    }
    .button:hover{
      background: #34b1fe;
      border: none;
    }
  }
}
</style>


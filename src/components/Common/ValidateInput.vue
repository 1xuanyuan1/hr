<template>
  <div class="field is-horizontal vd-input">
    <div class="field-label is-normal">
      <label class="label">{{name}}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control has-icons-right">
          <input class="input" :readonly="readonly" :class="{'is-danger': errors.has(name)}" @focusout="focusoutValue($event.target.value)" @input="updateValue($event.target.value)"  :name="name" type="text" :value="value" :placeholder="placeholder" v-validate="rules">
          <span class="icon is-small is-right" v-if="errors.has(name)">
            <i class="fa fa-warning"></i>
          </span>
        </div>
        <p class="help is-danger" v-if="errors.has(name)">{{errors.first(name)}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    value: {
      validator: function (val) {
        return typeof val === 'string' || typeof val === 'number'
      }
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('update', value)
    },
    focusoutValue (value) {
      this.$emit('update', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.vd-input{
  width: 80%;
}
</style>


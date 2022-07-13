<template>
  <el-select
    v-model="formData[field]"
    :placeholder="col.placeholder"
    :disabled="opt.disabled"
    :clearable="opt.clearable"
    :multiple="opt.multiple"
    :multiple-limit="opt.multiple_limit"
    :name="field"
    :filterable="opt.filterable || opt.allow_create"
    :remote="opt.remote"
    :remote-method="selectRemote"
    :loading="opt.loading"
    :allow-create="opt.allow_create"
    :default-first-option="opt.default_first_option"
  >
    <el-option
      :label="getListItemLabel(it,i)"
      :value="getListItemValue(it,i)"
      v-for="(it,i) in col.list"
      :key="i">

    </el-option>
  </el-select>
</template>

<script>
import formItemMixin from './form-item-mixin'

export default {
  name: 'SelectEl',
  alias: '下拉选择框',
  list: true,
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        multiple: false,
        // 多选限制数量
        multiple_limit: Infinity,
        filterable: false,
        remote: false,
        loading: false,
        placeholder: '请选择',
        default_first_option: true,
        allow_create: false
      }
    }
  },
  methods: {
    selectRemote(query) {
      console.log('remote query', query)
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <el-select
v-model="formData[col.field]"
             :placeholder="col.placeholder"
             :disabled="col.opts.disabled"
             :clearable="col.opts.clearable"
             :multiple="col.opts.multiple"
             :multiple-limit="col.opts.multiple_limit"
             :name="col.field"
             :filterable="col.opts.filterable"
             :remote="col.opts.remote"
             :remote-method="selectRemote"
             :loading="col.opts.loading"
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
        placeholder: '请选择'
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

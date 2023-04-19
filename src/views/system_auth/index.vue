<template>
  <div class="content-box">
    <curd-index
      ref="curd"
      :form-com="addForm"
      :table-com="tableList"
      :control="control"
      :curd="curd"
      :pagination="false"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </curd-index>
  </div>
</template>

<script>
import tableList from './components/tableList'
import addForm from './components/addForm'
import indexMixin from '@/utils/mixin/curd-index'

export default {
  data() {
    return {
      tableList,
      addForm,
      control: 'system_auth',
      curd: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>

<style scoped>

</style>

<template>
  <div class="content-box">
    <curd-index
      :query="query"
      :form-com="addForm"
      :table-com="tableList"
      :control="control"
      :mode="mode"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </curd-index>
  </div>
</template>

<script>
import indexMixin from '@/utils/mixin/curd-index'
import tableList from './components/tableList'
import addForm from './components/addForm'

export default {
  data() {
    return {
      tableList,
      addForm,
      control: 'admin',
      curd: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>

<style scoped>

</style>

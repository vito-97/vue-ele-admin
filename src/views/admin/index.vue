<template>
  <div class="content-box">
    <curd-index
      :query="query"
      :form-com="addForm"
      :table-com="tableList"
      :control="control"
      :mode="mode"
      :select-multiple="selectMultiple"
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
      searchable: true,
      curd: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>

<style scoped>

</style>

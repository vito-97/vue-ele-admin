<template>
  <div class="content-box">
    <crud-index
      ref="crud"
      :form-com="addForm"
      :table-com="tableList"
      :control="control"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </crud-index>
  </div>
</template>

<script>
import indexMixin from '@/utils/mixin/crud-index'
import tableList from './components/tableList'
import addForm from './components/addForm'

export default {
  data() {
    return {
      tableList,
      addForm,
      control: 'admin',
      crud: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>

<style scoped>

</style>

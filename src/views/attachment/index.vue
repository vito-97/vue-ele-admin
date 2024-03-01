<template>
  <div class="content-box">
    <crud-index
      ref="crud"
      :form-com="addForm"
      :table-com="tableList"
      :control="control"
      :crud="crud"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </crud-index>
  </div>
</template>

<script>
import tableList from './components/tableList'
import addForm from './components/addForm'
import indexMixin from '@/utils/mixin/crud-index'

export default {
  data() {
    return {
      tableList,
      addForm,
      control: 'attachment',
      crud: ['*']
    }
  },
  mixins: [indexMixin],
  created() {
  }
}
</script>

<style scoped>

</style>

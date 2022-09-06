<template>
  <div class="content-box">
    <curd-index
      :query="query"
      :form-com="addForm"
      :table-com="tableList"
      :control="control"
      :curd="curd"
      :mode="mode"
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
      control: 'adverts',
      curd: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>

<style scoped>

</style>

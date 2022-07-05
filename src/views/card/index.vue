<template>
  <div class="content-box">
    <curd-index
:form-com="addForm"
                :table-com="tableList"
                :control="control"
                :searchable="searchable"
                :curd="curd"
                :mode="mode"
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
      control: 'card',
      searchable: true,
      curd: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>

<style scoped>

</style>

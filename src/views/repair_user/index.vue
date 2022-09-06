<template>
  <div class="content-box">
    <curd-index
      :form-com="addForm"
      :table-com="tableList"
      :control="control"
      :curd="curd"
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
      control: 'repair_user',
      curd: ['*']
    }
  },
  mixins: [indexMixin],
  computed: {
  }
}
</script>

<style scoped>

</style>

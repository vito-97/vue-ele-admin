<template>
  <div>
    <custom-form
      :visible.sync="Visible"
      :columns="columns"
      :detail.sync="detail"
      :id="id"
      :list="list"
      :rules="rules"
      :append-to-body="appendToBody"
      :error="error"
      @submit="onSubmit"
    >

    </custom-form>
  </div>

</template>

<script>
import visible from '@/utils/mixin/visible'
import customFromMixin from '@/utils/mixin/custom-form'

export default {
  name: 'AddForm',
  mixins: [visible, customFromMixin],
  data() {
    return {
      rules: {},
      // 列配置
      columns: [
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>

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
      :hide-button="true"
      :error="error"
      @url-success="onUploadSuccess"
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
        // { name: '名称', field: 'name', opts: { required: true, maxlength: 100 }, addable: false },
        // { name: '分类', field: 'category', label: true, opts: { required: true }, addable: false, type: 'select' },
        {
          name: '附件', field: 'url', type: 'upload', opts: { required: true, maxlength: 255 },
          editable: false
        }
        // { name: '宽度', field: 'width', opts: { required: true, }, addable: false, type: 'number' },
        // { name: '高度', field: 'height', opts: { required: true, }, addable: false, type: 'number' },
        // { name: '大小', field: 'size', opts: { required: true, }, addable: false, type: 'number' },
        // { name: '类型', field: 'type', opts: { required: true, maxlength: 20 }, addable: false, },
        // { name: 'MIME', field: 'mime', opts: { required: true, maxlength: 50 }, addable: false, },
      ]
    }
  },
  watch: {},
  methods: {
    // 上传成功事件
    onUploadSuccess({ mode }) {
      if (mode === 'add') {
        this.close()
        // this.flush()
      }
    }
  }
}
</script>

<style scoped>

</style>

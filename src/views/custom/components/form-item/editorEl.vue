<template>
  <div class="editor-box">
    <tinymce
      class="inner-box"
      :height="opt.height"
      v-model="formData[field]"
      :id="field"
      :toolbar="opt.toolbar"
      :menubar="opt.menubar"
      :readonly="opt.readonly"
      :placeholder="col.placeholder"
    >
    </tinymce>
  </div>
</template>

<script>
import formItemMixin from './form-item-mixin'
import Tinymce from '@/components/Tinymce/index'

export default {
  name: 'EditorEl',
  mixins: [formItemMixin],
  alias: '编辑器',
  components: { Tinymce },
  data() {
    return {
      opts: {
        height: 400,
        toolbar: [],
        menubar: 'file edit insert view format table',
        readonly: false
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.editor-box {
  clear: both;

  .inner-box {
    position: relative;
    width: 100% !important;
  }
}
</style>

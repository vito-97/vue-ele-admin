<template>
  <upload-el
    :column="column"
    :detail="detail"
    :form-data="formData"
    :attr="opt"
    :mode="mode"
    @event="eventBubbling"
  >

  </upload-el>
</template>

<script>
import formItemMixin from './form-item-mixin'
import uploadEl from './uploadEl'

export default {
  name: 'UploadZipEl',
  alias: '上传压缩包',
  components: { uploadEl },
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        list_type: 'text',
        accept: '.zip,.rar',
        tip: '只能上传zip/rar'
      }
    }
  }
}
</script>

<style scoped>

</style>

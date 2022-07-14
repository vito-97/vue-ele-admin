<template>
  <upload-el
    :column="column"
    :detail="detail"
    :form-data="formData"
    :attr="{list_type:'picture',accept:'.zip,.rar','tip':'只能上传zip/rar'}"
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
  mixins: [formItemMixin]
}
</script>

<style scoped>

</style>

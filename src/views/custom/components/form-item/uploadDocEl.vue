<template>
  <upload-el
    :column="column"
    :detail="detail"
    :attr="{list_type:'picture',accept:'.doc,.docx',tip:'只能上传Word文档'}"
  >
  </upload-el>
</template>

<script>
import formItemMixin from './form-item-mixin'
import uploadEl from './uploadEl'

export default {
  name: 'UploadDocEl',
  alias: '上传文档',
  components: { uploadEl },
  mixins: [formItemMixin]
}
</script>

<style scoped>

</style>

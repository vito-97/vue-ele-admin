<template>
  <upload-el
    :column="column"
    :detail="detail"
    :attr="opt"
    @event="eventBubbling"
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
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        list_type: 'text',
        accept: '.doc,.docx',
        tip: '只能上传word文档'
      }
    }
  }
}
</script>

<style scoped>

</style>

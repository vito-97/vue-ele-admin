<template>
  <upload-el
    :column="column"
    :detail="detail"
    :form-data="formDataValue"
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
  name: 'UploadPdfEl',
  alias: '上传PDF',
  components: { uploadEl },
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        list_type: 'text',
        accept: '.pdf',
        tip: '只能上传pdf'
      }
    }
  }
}
</script>

<style scoped>

</style>

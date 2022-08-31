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
  name: 'UploadPptEl',
  alias: '上传PPT',
  components: { uploadEl },
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        list_type: 'text',
        accept: '.ppt,.pptx',
        tip: '只能上传ppt'
      }
    }
  }
}
</script>

<style scoped>

</style>

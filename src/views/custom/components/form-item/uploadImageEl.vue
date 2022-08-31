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
  name: 'UploadImageEl',
  alias: '上传图片',
  components: { uploadEl },
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        list_type: 'picture',
        accept: 'image/*',
        tip: '只能上传jpg/png/gif'
      }
    }
  }
}
</script>

<style scoped>

</style>

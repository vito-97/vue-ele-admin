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
  name: 'UploadVideoEl',
  alias: '上传视频',
  components: { uploadEl },
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        list_type: 'text',
        accept: 'video/mp4',
        tip: '只能上传mp4'
      }
    }
  }
}
</script>

<style scoped>

</style>

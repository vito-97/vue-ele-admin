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
  name: 'UploadMp3El',
  alias: '上传MP3',
  components: { uploadEl },
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        list_type: 'text',
        accept: '.mp3,audio/mpeg',
        tip: '只能上传mp3'
      }
    }
  }
}
</script>

<style scoped>

</style>

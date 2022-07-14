<template>
  <upload-el
    :column="column"
    :detail="detail"
    :form-data="formDataValue"
    :attr="{list_type:'picture',accept:'.pdf','tip':'只能上传pdf'}"
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
  mixins: [formItemMixin]
}
</script>

<style scoped>

</style>

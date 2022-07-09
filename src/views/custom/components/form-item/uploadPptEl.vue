<template>
  <upload-el :column="column" :detail="detail" :attr="{list_type:'picture',accept:'.ppt,.pptx','tip':'只能上传ppt'}"></upload-el>
</template>

<script>
import formItemMixin from './form-item-mixin'
import uploadEl from './uploadEl'

export default {
  name: 'UploadPptEl',
  alias: '上传PPT',
  components: { uploadEl },
  mixins: [formItemMixin]
}
</script>

<style scoped>

</style>

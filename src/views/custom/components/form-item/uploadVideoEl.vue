<template>
  <upload-el :column="column" :detail="detail" :attr="{list_type:'picture',accept:'video/mp4','tip':'只能上传mp4'}"></upload-el>
</template>

<script>
import formItemMixin from './form-item-mixin'
import uploadEl from './uploadEl'

export default {
  name: 'UploadVideoEl',
  alias: '上传视频',
  components: { uploadEl },
  mixins: [formItemMixin]
}
</script>

<style scoped>

</style>

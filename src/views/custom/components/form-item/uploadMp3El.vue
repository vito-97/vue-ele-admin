<template>
  <upload-el :column="column" :detail="detail" :attr="{list_type:'picture',accept:'.mp3,audio/mpeg','tip':'只能上传mp3'}"></upload-el>
</template>

<script>
import formItemMixin from './form-item-mixin'
import uploadEl from './uploadEl'

export default {
  name: 'UploadMp3El',
  components: { uploadEl },
  mixins: [formItemMixin]
}
</script>

<style scoped>

</style>

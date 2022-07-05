<template>
  <upload-el :column="column" :detail="detail" :attr="{list_type:'picture',accept:'image/*','tip':'只能上传jpg/png/gif'}"></upload-el>
</template>

<script>
import formItemMixin from './form-item-mixin'
import uploadEl from './uploadEl'

export default {
  name: 'UploadImageEl',
  components: { uploadEl },
  mixins: [formItemMixin]
}
</script>

<style scoped>

</style>

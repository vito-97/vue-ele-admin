<template>
  <upload-el :column="column" :detail="detail" :attr="{list_type:'picture',accept:'.xls,.xlsx','tip':'只能上传xls'}"></upload-el>
</template>

<script>
import formItemMixin from './form-item-mixin'
import uploadEl from './uploadEl'

export default {
  name: 'UploadXlsEl',
  components: { uploadEl },
  mixins: [formItemMixin]
}
</script>

<style scoped>

</style>

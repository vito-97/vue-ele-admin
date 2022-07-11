<template>
  <upload-el :column="column" :detail="detail" :form-data="formData" :attr="{list_type:'picture',accept:'.xls,.xlsx','tip':'只能上传xls'}" :mode="mode"></upload-el>
</template>

<script>
import formItemMixin from './form-item-mixin'
import uploadEl from './uploadEl'

export default {
  name: 'UploadXlsEl',
  alias: '上传表格',
  components: { uploadEl },
  mixins: [formItemMixin]
}
</script>

<style scoped>

</style>

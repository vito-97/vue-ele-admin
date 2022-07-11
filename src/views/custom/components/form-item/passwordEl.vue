<template>
  <input-el :column="col" :detail="detail" :form-data="formData" :attr="attr" :mode="mode"></input-el>
</template>

<script>
import formItemMixin from './form-item-mixin'

import inputEl from '@/views/custom/components/form-item/inputEl'

export default {
  name: 'PasswordEl',
  alias: '密码框',
  components: { inputEl },
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        show_password: true
      }
    }
  }
}
</script>

<style scoped>

</style>

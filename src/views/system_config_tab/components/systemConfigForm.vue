<template>
  <custom-form :columns="columns" :detail.sync="detail" :rules="rules" :dialog="false"></custom-form>
</template>

<script>
import customForm from '@/views/custom/customForm'

export default {
  name: 'SystemConfigForm',
  components: { customForm },
  data() {
    return {
      rules: {}
    }
  },
  props: {
    columns: {
      type: Array
    },
    detail: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>

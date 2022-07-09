<template>
  <custom-form :columns="columns" :detail="detail" :dialog="false"></custom-form>
</template>

<script>
import customForm from '@/views/custom/customForm'

export default {
  name: 'SystemConfigForm',
  components: { customForm },
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

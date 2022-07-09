<template>
  <div>
    <i :class="['icon-el',val]" v-if="val" class="text-primary"></i>
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'
export default {
  name: 'IconEl',
  mixins: [tableColumnMixin],
  data() {
    return {
      opts: {
      }
    }
  },
  filters: {},
  methods: {
  }
}
</script>

<style scoped>
  .icon-el{
    font-size: 30px;
  }
</style>

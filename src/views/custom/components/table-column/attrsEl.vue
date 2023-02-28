<template>
  <div @dbclick.stop>
    <div v-for="(item,index) in val2array" :key="index">
      <template v-if="open || index < opt.preview_length">
        <el-tag type="primary" effect="dark" size="mini" :disable-transitions="opt.disable_transitions">
          {{ item[opt.label] }}
        </el-tag>
        <el-tag
          type="primary"
          size="mini"
          :disable-transitions="opt.disable_transitions"
          v-for="(it,idx) in item[opt.value]"
          :key="idx">{{ it }}
        </el-tag>
      </template>
    </div>
    <el-button
      v-if="val2array.length > opt.preview_length"
      type="text"
      size="small"
      class="toggle-btn"
      @click="open = !open"
      :icon="open ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
    >
      {{ open ? '收起' : '展开' }}
    </el-button>
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'

export default {
  name: 'TagEl',
  mixins: [tableColumnMixin],
  data() {
    return {
      open: false,
      opts: {
        label: 'name',
        value: 'list',
        preview_length: 3,
        disable_transitions: true
      }
    }
  },
  filters: {},
  methods: {}
}
</script>

<style scoped lang="scss">
.toggle-btn {
  width: 100%;
  text-align: center;
  cursor: pointer;
}
</style>

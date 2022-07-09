<template>
  <div class="cover-box">
    <template v-if="val2array.length">
      <el-image
        v-for="(src,index) in val2array"
        :key="index"
        class="cover"
        :style="style"
        :src="src"
        fit="contain"
        :previewSrcList="val2array"
        @click="onClickImg(index,src)"
      >

      </el-image>
    </template>
    <template v-else>
      <div class="tip">暂无图片</div>
    </template>
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'

export default {
  name: 'ImageEl',
  mixins: [tableColumnMixin],
  filters: {},
  data() {
    return {
      opts: {
        size: 100
      }
    }
  },
  computed: {
    style() {
      let size = this.opt.size + 'px'
      return {
        maxHeight: size,
        maxWidth: size
      }
    }
  },
  methods: {
    onClickImg(index, src) {

    },
    onLoadError(e, index, src) {
      console.log('图片加载失败', e, index, src)
    }
  }
}
</script>

<style scoped lang="scss">
.cover-box {
  .cover {
  }

  .tip {
    color: #999;
  }
}
</style>

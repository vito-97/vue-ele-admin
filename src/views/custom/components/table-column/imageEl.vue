<template>
  <div class="cover-box">
    <template v-if="val2array.length">
        <el-image
          v-for="(src,index) in val2array"
:key="index"
          class="cover"
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
    max-height: 100px;
    max-width: 100px;
    width: auto;
    object-fit: cover;
  }

  .tip {
    color: #999;
  }
}
</style>

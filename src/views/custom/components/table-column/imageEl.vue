<template>
  <div class="cover-box">
    <template v-if="images.length">
      <div>
        <el-image
          v-for="(n,index) in (opt.preview ? 1 : images.length)"
          :key="index"
          class="cover"
          :style="style"
          :src="images[index]"
          fit="contain"
          :previewSrcList="images"
          ref="image"
          @click="onClickImg(index,images[index])"
        >
        </el-image>
        <div class="preview-tag" v-if="opt.preview && images.length > 1">
          <el-tag @click="onPreview" size="mini">
            看其余{{ images.length - 1 }}张
          </el-tag>
        </div>
      </div>
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
        size: 100,
        // 是否只预览一张
        preview: false,
        // 对象中的键
        key: null
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
    },
    images() {
      var images = [...this.val2array]

      for (let [index, item] of images.entries()) {
        var src = typeof item === 'string' ? item : item[this.opt.key]

        if (src && src.indexOf('http') !== 0) {
          images[index] = '//' + process.env.VUE_APP_BASE_HOST + src
        }
      }

      return images
    }
  },
  methods: {
    onClickImg(index, src) {

    },
    onPreview() {
      this.$refs.image[0].clickHandler()
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

  .preview-tag{
    cursor: pointer;
  }
}
</style>

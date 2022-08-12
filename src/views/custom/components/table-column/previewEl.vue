<template>
  <div class="cover-box">
    <template v-if="isImg">
      <image-el :col="col" :row="row" :index="index" :val="val" :format-val="formatVal"></image-el>
    </template>
    <template v-else-if="ext">
      <div class="tip">
        <el-link target="_blank" :href="val" :underline="false">
          <div class="other-type">
            <img src="/static/images/file.png" alt="">
            <div class="ext">{{ ext.toUpperCase() }}</div>
          </div>
        </el-link>
      </div>
    </template>
    <template v-else>
      <div class="tip">未知后缀</div>
    </template>
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'
import imageEl from '@/views/custom/components/table-column/imageEl'

export default {
  name: 'PreviewEl',
  mixins: [tableColumnMixin],
  components: { imageEl },
  computed: {
    ext() {
      const index = this.val.lastIndexOf('.')

      if (index === -1) {
        return ''
      }

      return this.val.substr(index + 1)
    },
    isImg() {
      return ['png', 'jpg', 'jpeg', 'gif'].includes(this.ext)
    }
  },
  filters: {},
  methods: {}
}
</script>

<style scoped lang="scss">
.cover-box {
  .cover {
    height: 100%;
    width: auto;
    object-fit: cover;
  }

  .tip {
    color: #999;
  }

  .other-type {
    position: relative;

    .ext {
      position: absolute;
      left: 0;
      top: 40%;
      background: #409EFF;
      color: #fff;
      padding: 0 10px;
      border-radius: 5px;
    }
  }
}
</style>

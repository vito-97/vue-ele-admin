<template>
  <el-upload
    ref="upload"
    class="upload-item"
    :name="field"
    :action="opt.action"
    :data="fileData"
    :headers="headers"
    :show-file-list="opt.show_file_list"
    :accept="opt.accept"
    :multiple="opt.multiple"
    :limit="opt.limit"
    :auto-upload="opt.auto_upload"
    :disabled="opt.disabled"
    :file-list="fileList"
    :list-type="opt.list_type"
    :drag="opt.drag"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :before-remove="onBeforeRemove"
    :on-success="onSuccess"
    :on-error="onError"
    :on-progress="onProgress"
    :on-change="onChange"
    :before-upload="onBeforeUpload"
    :on-exceed="onExceed">
    <div class="upload-box" :class="{drag:opt.drag}">
      <el-button :size="opt.btn_size" :icon="opt.btn_icon" type="primary" :disabled="opt.disabled">{{ opt.btn_text }}
      </el-button>
      <div class="el-upload__tip" v-show="opt.drag">{{ opt.drag_text }}</div>
    </div>
    <div slot="tip" class="el-upload__tip" v-if="opt.tip">{{ opt.tip }}</div>
  </el-upload>
</template>

<script>
import formItemMixin from './form-item-mixin'
import { getToken } from '@/utils/auth'
import CONFIG from '@/utils/config'

export default {
  name: 'UploadEl',
  alias: '上传',
  mixins: [formItemMixin],
  data() {
    return {
      appendData: {
        category: 'un'
      },

      appendHeaders: {
        'Access-Token': getToken(),
        'X-Requested-With': 'XMLHttpRequest'
      },

      opts: {
        action: CONFIG.upload_url,
        headers: {},
        data: {},
        multiple: false,
        // 是否显示已上传文件列表
        show_file_list: true,
        // 是否启用拖拽上传
        drag: false,
        // 接受上传的文件类型
        accept: null,
        // 最大允许上传个数
        limit: 9,
        // 自动上传
        auto_upload: true,
        file_list: [],
        btn_text: '上传',
        btn_size: 'small',
        btn_icon: '',
        tip: '只能上传图片/mp4/mp3/文档/图表/ppt/pdf/zip/rar',
        drag_tip: '点击上传或拖拽到此上传',
        // 是否禁用上传
        disabled: false
      },
      files: {}
    }
  },
  computed: {
    fileData() {
      return Object.assign({}, this.appendData, this.opt.data)
    },
    headers() {
      return Object.assign({}, this.appendHeaders, this.opt.headers)
    },
    /**
     * 组装已有的文件
     * @returns {*[]}
     */
    fileList() {
      let val = this.formDataValue
      let list = []
      val = this.toArray(val)

      val.forEach((it, i) => {
        if (it) {
          const detail = this.files[it] || null
          list.push({
            name: detail ? detail.name : it,
            url: detail ? detail.link : it
          })
        }
      })

      list = list.concat(this.opt.file_list)

      return list
    }
  },
  methods: {
    // 点击文件列表中已上传的文件时的钩子
    onPreview(file) {
      console.log('onPreview', file)
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    onBeforeRemove(file, fileList) {
      console.log('onBeforeRemove', file, fileList)
    },
    // 文件列表移除文件时的钩子
    onRemove(file, fileList) {
      console.log('onRemove', file, fileList)
      const url = file.response?.data?.detail.url || file.url
      let val = this.val
      if (this.opt.multiple) {
        const index = this.toArray(val).indexOf(url)
        val.splice(index, 1)
      } else {
        val = ''
      }

      this.updateValue(val)
    },
    // 文件上传成功时的钩子
    onSuccess(response, file, fileList) {
      console.log('upload success', response, file, fileList)

      // this.$refs.upload.clearFiles()
    },
    // 文件上传失败时的钩子
    onError(err, file, fileList) {
      console.log('upload error', err, file, fileList)
      this.$message({ message: '上传到服务器失败', type: 'error' })
      this.triggerEvent('error', { mode: this.mode })
    },
    // 文件上传时的钩子
    onProgress(event, file, fileList) {
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      console.log('upload change', file, fileList)

      var response = file.response || {}

      const code = response.code

      if (file.status !== 'success') {
        return
      }

      if ([0, 50905].includes(code)) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        const detail = response.data.detail
        let val = this.val
        const url = detail.url

        if (!this.files[url]) {
          this.$set(this.files, url, detail)
        }

        if (this.opt.multiple && !Array.isArray(val)) {
          val = val ? [val] : []
        }
        if (this.opt.multiple) {
          val.push(url)
        } else {
          val = url
        }
        this.triggerEvent('success', { url, mode: this.mode })
        this.updateValue(val)
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: response.msg || '上传失败'
        })
      }
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    onBeforeUpload(file) {
    },
    // 文件超出个数限制时的钩子
    onExceed(files, fileList) {
      this.$message({ message: '上传数量已超出限制', type: 'warning' })
    }
  }
}
</script>

<style scoped lang="scss">
  .upload-box {
    &.drag {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }
  }
</style>

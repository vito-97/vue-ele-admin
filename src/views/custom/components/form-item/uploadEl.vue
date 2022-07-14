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
    :on-preview="onPreview"
    :on-remove="onRemove"
    :before-remove="onBeforeRemove"
    :on-success="onSuccess"
    :on-error="onError"
    :on-progress="onProgress"
    :on-change="onChange"
    :before-upload="onBeforeUpload"
    :on-exceed="onExceed">
    <el-button size="small" type="primary">{{ opt.btn_text }}</el-button>
    <div slot="tip" class="el-upload__tip">{{ opt.tip }}</div>
  </el-upload>
</template>

<script>
import formItemMixin from './form-item-mixin'
import { getToken } from '@/utils/auth'

const base = process.env.VUE_APP_BASE_API
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
        'access-token': getToken()
      },

      opts: {
        action: base + 'v1/attachment',
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
        limit: 1,
        // 自动上传
        auto_upload: true,
        file_list: [],
        btn_text: '点击上传',
        tip: '只能上传图片/mp4/mp3/文档/图表/ppt/pdf/zip/rar'
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
      let val = this.val
      let list = []
      val = Array.isArray(val) ? val : [val]

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
        const index = val.indexOf(url)
        val.splice(index, 1)
      } else {
        val = ''
      }

      this.updateValue(val)
    },
    // 文件上传成功时的钩子
    onSuccess(response, file, fileList) {
      console.log('upload success', response, file, fileList)
      const code = response.code

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
        this.$refs.upload.clearFiles()
        this.$message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: response.msg || '上传失败'
        })
      }
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

<style scoped>

</style>

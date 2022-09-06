<template>
  <div class="upload-container">
    <el-button
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="open">
      上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :width="dialogWidth">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :data="uploadData"
        :headers="uploadHeaders"
        :action="uploadAction"
        list-type="picture-card"
        :accept="uploadAccept"
        :drag="true"
        ref="upload"
      >
        <el-button size="small" type="primary">
          点击上传或拖拽至此
        </el-button>
      </el-upload>
      <el-button @click="close">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import CONFIG from '@/utils/config'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      uploadAction: CONFIG.upload_url,
      uploadData: { category: 'un' },
      uploadAccept: 'image/*',
      uploadHeaders: {
        'access-token': getToken()
      }
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图像成功上传。如果出现网络问题，请刷新页面并再次上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const code = response.code

      if ([0, 50905].includes(code)) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        const uid = file.uid
        const objKeyArr = Object.keys(this.listObj)
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = response.data.detail.link
            this.listObj[objKeyArr[i]].hasSuccess = true
            return
          }
        }
      } else {
        this.$refs.upload.clearFiles()
        this.$message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: response.msg || '上传失败'
        })
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function () {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;

  ::v-deep .el-upload--picture-card {
    width: 100%;
    border: unset;
  }

  ::v-deep .el-upload-dragger {
    width: 100%;
    height: unset;
  }
}
</style>

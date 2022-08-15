<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea"/>
    <div class="editor-custom-btn-container hidden-xs-only" v-show="hasInit">
      <el-button
        v-show="hasOtherImage"
        size="mini"
        class="mr10"
        type="primary"
        :title="`将编辑器里${otherImage.length}张外部图片上传至服务器`"
        icon="el-icon-document-copy"
        @click="onClickTransformImage"
      >
        转换图片
      </el-button>
      <select-table
        :detail="{}"
        :form-data="{}"
        :column="column"
        @event="onEvent"
        class="mr10"
        title="选择附件"
        ref="attachment"
      >
      </select-table>
      <editorImage class="editor-upload-btn" @successCBK="imageSuccessCBK" title="上传图片" ref="editorImage"/>
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import selectTable from '@/views/custom/components/form-item/selectTableEl'
import { base64ToFile, upload, urlToBase64 } from '@/api/upload'
import CONFIG from '@/utils/config'
import { hideLoading, showLoading } from '@/utils'

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
// const tinymceCDN = 'https://cdn.staticfile.org/tinymce/4.9.3/tinymce.min.js'
const tinymceCDN = '/static/tinymce/tinymce.min.js'
const codeHighLight = '/static/tinymce/plugins/becodesample/highlight/highlight.min.js'

export default {
  name: 'Tinymce',
  components: { editorImage, selectTable },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: [String, Boolean]
    },
    height: {
      type: [Number, String],
      required: false,
      default: 500
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    lang: {
      type: String,
      default: 'zh'
    },
    // 只读
    readonly: {
      type: Boolean
    },
    // 内容提示
    placeholder: {
      type: String
    }
  },
  data() {
    // 允许图片存放的域名
    const serverHost = process.env.VUE_APP_BASE_HOST
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      serverHost: serverHost,
      // 匹配外部图片 将外部图片上传到服务器里
      imagePattern: `<img[\\s\\S]*?src=['"]((?!https?://(?:${serverHost}).*?).*?)['"](?:(?!data-mce-(?:object|placeholder))[\\s\\S]*?alt=['"]([\\s\\S]*?)['"])?`,
      column: {
        name: '附件',
        field: 'file',
        opts: {
          required: true,
          control: 'attachment',
          name: 'name',
          key: 'link',
          btn_text: '附件',
          btn_size: 'mini',
          btn_icon: 'el-icon-paperclip',
          multiple: true
        },
        type: 'select_table',
        edit_opts: { disabled: false }
      },
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    },
    // 是否存在外部图片
    hasOtherImage() {
      // img:not([data-mce-object],[data-mce-placeholder])
      let value = this.value
      let reg = new RegExp(this.imagePattern, 'g')

      return reg.test(value)
    },
    // 获取外部图片的资源
    otherImage() {
      let value = this.value
      let reg = new RegExp(this.imagePattern, 'g')
      let source = []
      var res
      while ((res = reg.exec(value))) {
        source.push({
          src: res[1],
          name: res[2] || ''
        })
      }
      return source
    },
    editor() {
      return window.tinymce.get(this.tinymceId)
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          this.editor.setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
      // 加载代码高亮
      load(codeHighLight, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        content_style: 'img {max-width:100%;}',
        language: this.languageTypeList[this.lang] || this.languageTypeList['zh'],
        height: this.height,
        body_class: 'content-body',
        // 开关图片、表格、媒体对象在编辑区内的调整大小工具。拖拽工具可调整对象大小。
        // object_resizing: false,
        // statusbar: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar || 'file edit insert view format table',
        plugins: plugins,
        readonly: this.readonly,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        // 图片跨域
        imagetools_cors_hosts: [process.env.VUE_APP_BASE_HOST],
        default_link_target: '_blank',
        link_title: true,
        // 媒体实时预览开关
        media_live_embeds: true,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        content_css: '/static/tinymce/plugins/becodesample/highlight/styles/atom-one-light.css',
        // 右下角技术支持
        branding: false,
        placeholder: this.placeholder,
        toolbar_mode: 'wrap',
        // custom_elements: 'style,html,head,body,title,meta',
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup: editor => {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })

          editor.on('paste', this.onPaste)

          editor.on('attachment', this.$refs.attachment.open)
          editor.on('upload-image', this.$refs.editorImage.open)
          editor.on('transform-image', this.onClickTransformImage)
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false,
        images_upload_handler(blobInfo, success, failure, progress) {
          console.log(blobInfo)
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      const tinymce = this.editor
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      this.editor.setContent(value)
    },
    getContent() {
      this.editor.getContent()
    },
    imageSuccessCBK(arr) {
      arr.forEach(v => {
        // this.editor.insertContent(`<img class="wscnph" src="${v.url}" />`)
        this.editor.selection.setContent(this.editor.dom.createHTML('img', { src: v.url }))
      })
    },
    onPaste(e) {
      // console.log('paste', e)
      const items = (e.clipboardData || window.clipboardData).items
      const mimes = Object.values(CONFIG.allow_upload_type)
      let len = items.length
      for (let i = 0; i < len; i++) {
        const item = items[i]
        // console.log('item', item)
        if (item.kind === 'file') {
          console.log('file', item)
          if (mimes.includes(item.type)) {
            e.preventDefault()
            let file = item.getAsFile() // 获取⽂件数据
            // let blob = new Blob([file], { type: file.type }) // 实例化⼀个blob 将图⽚⼤⼩以及类型初始化到blob⾥
            this.uploadFile(file)
          } else {
            let file = item.getAsFile() // 获取⽂件数据
            console.log(file)
            this.$message.error(`${file.name}不支持上传`)
          }
        } else if (item.kind === 'string') {
          if (item.type === 'text/html') {
            /* item.getAsString(function (s) {
              console.log(s)
            }) */
          }
        }
      }
      console.log(items)
    },
    /**
     * 上传文件
     * @param file
     * @param append 是否将资源加入进去
     * @returns {Promise<void>}
     */
    uploadFile(file, opts = {}) {
      opts = Object.assign({
        msg: '上传中...',
        append: true
      }, opts)
      showLoading(opts.msg)
      return upload(file).then(res => {
        hideLoading()
        let detail = res.data.detail
        if (opts.append) {
          this.onEvent({
            field: 'file',
            type: 'select',
            payload: {
              row: detail
            }
          })
        }

        return detail
      }).catch((err) => {
        hideLoading()
        // console.log(err)
        // 上传错误可⾃⾏给出提⽰
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    /**
     * 更新外部图片
     * @returns {Promise<void>}
     */
    async onClickTransformImage() {
      console.log('trans')

      let images = this.otherImage

      for (var i in images) {
        let image = images[i]
        var base64
        // 不是base64
        if (!image.src.includes(';base64,')) {
          base64 = await urlToBase64(image.src)
          images[i].base64 = base64
        }

        let file = base64ToFile(base64 || image.src, (image.name || '图片') + '.png')
        let n = Number(i) + 1
        await this.uploadFile(file, {
          msg: `正在上传第${n}张图片`,
          append: false
        }).then(detail => {
          image.url = detail.link
        })
      }
      var value = this.value

      for (var image of images) {
        if (image.url) {
          value = value.replaceAll(`src="${image.src}"`, `src="${image.url}"`)
        }
      }

      // 不会更新编辑器内容
      // this.$emit('input', value)

      this.editor.setContent(value)
    },
    // 监听事件
    onEvent(e) {
      // 选择事件
      if (e.field === 'file') {
        if (e.type === 'select') {
          var row = e.payload.row
          console.log(row)
          var type = row.category
          var html = ''
          // 图片
          if (type === 'image') {
            html = `<p><img src="${row.link}" alt="${row.name}"/></p>`
            // 视频
          } else if (type === 'video') {
            html = `<p><span contenteditable="false" data-mce-object="video" class="mce-preview-object mce-object-video" data-mce-p-controls="controls" data-mce-html="%0A%3Csource%20src%3D%22${encodeURIComponent(row.link)}%22%20type%3D%22video/mp4%22%20/%3E"><video width="300" height="150" controls="controls" src="${row.link}"></video></span></p>`
            // MP3
          } else if (type === 'mp3') {
            html = `<p><span class="mce-preview-object mce-object-audio" contenteditable="false" data-mce-object="audio"
                  data-mce-p-src="${row.link}"
                  data-mce-p-controls="controls"><audio controls="controls" src="${row.link}"></audio></span></p>`
            // 其他内容设置为链接
          } else {
            html = `<p><a href="${row.link}" target="_blank" rel="noopener">${row.name}</a></p>`
          }
          this.editor.selection.setContent(html)
        } else if (e.type === 'select-multiple') {
          var items = e.payload.items

          for (let row of items) {
            this.onEvent({
              field: e.field,
              type: 'select',
              payload: {
                row
              }
            })
          }
        }
      }
    },
    onSelectAttachment() {

    }
  }
}
</script>

<style lang="scss" scoped>
.mr10 {
  margin-right: 10px;
}

.tinymce-container {
  position: relative;
  line-height: normal;
}

/*.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}*/

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  display: flex;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 1;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>

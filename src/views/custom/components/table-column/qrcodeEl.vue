<template>
  <div class="qrcode-box">
    <template v-if="val">
      <div class="qrcode" ref="qrCodeUrl" @click="onClick"></div>
    </template>
    <template v-else>
      <div class="tip"></div>
    </template>
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'
import QRCode from 'qrcodejs2'

export default {
  name: 'QrcodeEl',
  mixins: [tableColumnMixin],
  filters: {},
  data() {
    return {
      opts: {
        size: 150,
        color_dark: '#000000',
        color_light: '#ffffff',
        text: null,
        textSize: 16,
        margin: 10
      },
      qrcode: null
    }
  },
  watch: {
    val: {
      immediate: true,
      handler() {
        // this.creatQrCode()
      }
    }
  },
  mounted() {
    this.creatQrCode()
  },
  methods: {
    creatQrCode(size = 0, ref = 'qrCodeUrl') {
      size = size || this.opt.size

      this.qrcode = new QRCode(this.$refs[ref], {
        text: this.val, // 需要转换为二维码的内容
        width: size,
        height: size,
        colorDark: this.opt.color_dark,
        colorLight: this.opt.color_light,
        correctLevel: QRCode.CorrectLevel.H
      })

      var textOpt = this.opt.text

      if (textOpt) {
        var textSize = this.opt.textSize
        var imageEl = this.qrcode._oDrawing._elImage
        var canvas = this.qrcode._oDrawing._elCanvas
        var margin = this.opt.margin || 0
        var width = size + margin * 2
        var height = size + margin * 2 + textSize + 4
        var text = typeof textOpt === 'function' ? textOpt(this.row) : textOpt

        setTimeout(() => {
          canvas.style.display = 'block'
          canvas.width = width
          canvas.height = height
          var ctx = canvas.getContext('2d')
          ctx.fillStyle = this.opt.color_light
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(imageEl, margin, margin, size, size)
          // 设置字体
          ctx.font = 'bold ' + textSize + 'px Arial'
          let tw = ctx.measureText(text).width // 文字真实宽度
          let ftop = size + margin // 根据字体大小计算文字top
          let fleft = (width - tw) / 2 // 根据字体大小计算文字left
          let tp = textSize / 2 // 字体边距为字体大小的一半
          ctx.textBaseline = 'top' // 绘制文本时的文本基线
          ctx.fillStyle = this.opt.color_dark
          ctx.fillText(text, fleft, ftop + tp / 1.5 + 4)// canvas填充文字
          imageEl.src = canvas.toDataURL('image/png')
          canvas.style.display = 'none'
        }, 50)
      }
    },
    onClick() {

    }
  }
}
</script>

<style lang="scss">
.qrcode-box {
  img, canvas {
    max-width: 100%;
  }
}
</style>

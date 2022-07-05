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
        size: 100,
        color_dark: '#000000',
        color_light: '#ffffff'
      }
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

      new QRCode(this.$refs[ref], {
        text: this.val, // 需要转换为二维码的内容
        width: size,
        height: size,
        colorDark: this.opt.color_dark,
        colorLight: this.opt.color_light,
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    onClick() {

    }
  }
}
</script>

<style scoped lang="scss">
</style>

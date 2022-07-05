const visible = {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Visible: this.visible
    }
  },
  watch: {
    visible(val) {
      if (val !== this.Visible) {
        this.Visible = val
      }
    },
    Visible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    open() {
      this.Visible = true
    },
    close() {
      this.Visible = false
    }
  }
}

export default visible

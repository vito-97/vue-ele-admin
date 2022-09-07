const customFormMixin = {
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    isEdit() {
      return !!this.id
    }
  },
  methods: {
    /**
     * 获取列的插槽名称
     */
    getColSlot(col) {
      return col.slot || col.field
    },
    /**
     * 检测元素是否显示
     * @param col
     * @returns {boolean|*}
     */
    checkColVisible(col, formData = null) {
      formData = formData || this.value
      let status = this.isEdit ? col.editable : col.addable
      if (typeof col.visible === 'boolean') {
        status = status && col.visible
      } else if (typeof col.visible === 'function') {
        status = status && col.visible.call(this, formData, this.detail, col)
      }

      return status
    },
    /**
     * 设置表单内容
     * @param key
     * @param value
     */
    setFormData(key, value = null) {
      if (typeof key === 'object') {
        this.formData = key
      } else {
        this.$set(this.formData, key, value)
      }
    }
  }
}
export default customFormMixin

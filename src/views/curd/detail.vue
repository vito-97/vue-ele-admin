<template>
  <div v-if="detail.id">
    <slot :detail="detail"></slot>
  </div>
</template>

<script>
import curd from '@/api/curd'
import checkPermission from '@/utils/permission'
import { showLoading, hideLoading } from '@/utils'

export default {
  name: 'CurdDetail',
  data() {
    return {
      detail: {}
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
      validator(value) {
        return parseInt(value) == value && value > 0
      }
    },
    control: {
      type: String,
      required: true
    },
    // 出现请求错误路由自动返回上一级
    errorGoBack: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    api() {
      return curd(this.control)
    },
    hasReadAuth() {
      return checkPermission(this.control + '/read')
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(value) {
        if (value) {
          this.getDetail(value)
        }
      }
    },
    detail(value) {
      this.$emit('load', value)
    }
  },
  methods: {
    /**
     * 获取详情
     * @param id
     * @returns {Promise<never>|Promise<unknown>}
     */
    getDetail(id = 0) {
      id = id || this.id

      if (this.hasReadAuth) {
        showLoading('加载中...')
        return this.api.read(id)
          .then(res => {
            var detail = res.data.detail
            return detail
          })
          .then(detail => {
            this.detail = detail
            return detail
          })
          .catch(res => {
            this.triggerError(res.msg || '服务器响应错误')
            return Promise.reject(res)
          })
          .finally(() => {
            hideLoading()
          })
      } else {
        this.triggerError('没有权限')
        return Promise.reject({ msg: '没有权限' })
      }
    },
    /**
     * 触发错误事件
     * @param msg
     */
    triggerError(msg) {
      this.$emit('error', msg)

      if (this.errorGoBack) {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>

</style>

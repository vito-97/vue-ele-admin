<template>
  <div class="content-box">
    <div class="user-form-box">
      <add-form class="add-form" @submit="onSubmit" :detail="detail" :error="error"></add-form>
    </div>
  </div>
</template>

<script>
import addForm from './components/addForm'
import indexMixin from '@/utils/mixin/curd-index'
import curd from '@/api/curd'
import { showLoading, hideLoading } from '@/utils'

export default {
  data() {
    return {
      control: 'profile',
      searchable: true,
      curd: ['*'],
      detail: {},
      error: {}
    }
  },
  mixins: [indexMixin],
  components: { addForm },
  computed: {
    api() {
      return curd(this.control)
    }
  },
  created() {
    this.detail = this.$store.getters.userinfo
  },
  methods: {
    /**
     * 提交更新信息
     * @param data
     */
    onSubmit(data) {
      showLoading()
      this.api.put('', data).then((res) => {
        hideLoading()
        this.$message({
          message: res.msg,
          type: 'success'
        })
        var userinfo = this.$store.getters.userinfo
        var detail = res.data.detail

        for (let index in data) {
          if (!['password'].includes(index)) {
            userinfo[index] = detail[index]
            this.$set(this.detail, index, detail[index])
          }
        }

        // 修改了密码
        if (data.password) {
          // 登出
          this.$set(this.detail, 'password', '')
          this.$store.dispatch('user/logout',{ all: 1 })
          this.$alert('你已修改密码，需要重新登录！', '提示', {
            confirmButtonText: '确定',
            callback: (action) => {
              // 跳转到登录页
              this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }
          })
        } else {
          // 更新vuex里的数据
          this.$store.commit('user/SET_USERINFO', userinfo)
          this.$store.commit('user/SET_NAME', detail.nickname)
          this.$store.commit('user/SET_AVATAR', detail.avatar)
        }
      }, (err) => {
        if (err.code !== 0 && err.data) {
          this.error = err.data
        }
        hideLoading()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.user-form-box {
  .add-form {
    width: 60%;
    margin: 0 auto;
    box-shadow: 0 0 10px #eee;
    padding: 30px;
    border-radius: 10px;
    //min-width: 600px;
  }
}

//媒体查询 宽度适应
@media screen and(max-width: 1000px) {
  .user-form-box {
    .add-form {
      width: 100%;
    }
  }
}
</style>

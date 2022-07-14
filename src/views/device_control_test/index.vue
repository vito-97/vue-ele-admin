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

export default {
  data() {
    return {
      control: 'device_control_test',
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
  },
  methods: {
    /**
     * 提交更新信息
     * @param data
     */
    onSubmit(data) {
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

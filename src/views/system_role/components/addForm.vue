<template>
  <div>
    <custom-form
      :visible.sync="Visible"
      :columns="columns"
      :detail.sync="detail"
      :id="id"
      :list="list"
      :rules="rules"
      :error="error"
      @submit="onSubmit"
    >
      <!--      权限插槽-->
      <template v-slot:auth_ids="{formData,col}">
        <br>
        <el-checkbox-group
          v-model="formData[col.field]"
        >
          <div
            v-for="(item,index) in col.list"
            :key="index"
          >
            <el-divider content-position="left">{{ item.name }}</el-divider>
            <el-checkbox
              :label="item.id"
              :name="col.field"
              @change="onParentChange(index,formData,col,$event)"
            >
              {{ item.name }}
            </el-checkbox>
            <el-checkbox
              :label="it.id"
              :name="col.field"
              v-for="(it,i) in item.children"
              :key="i"
              @change="onChildrenChange(index,formData,col,$event)"
            >
              {{ it.name }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </template>
    </custom-form>
  </div>

</template>

<script>
import visible from '@/utils/mixin/visible'
import customFromMixin from '@/utils/mixin/custom-form'
import { isSuperAdmin } from '@/utils'

export default {
  name: 'AddForm',
  mixins: [visible, customFromMixin],
  data() {
    return {
      rules: {},
      // 列配置
      columns: [
        { field: 'name', name: '名称', opts: { maxlength: 30, required: true } },
        { field: 'key', name: '标识', opts: { maxlength: 15, required: true } },
        {
          field: 'site_id',
          name: '站点',
          list: { 1: '居科乐', 2: '市政' },
          type: 'radio',
          opts: { required: true },
          edit_opts: { disabled: true },
          value: 1,
          visible(formData, detail) {
            return isSuperAdmin(this.$store.getters.role)
          }
        },
        {
          field: 'auth_ids',
          name: '权限',
          label: 'auth',
          opts: { required: true, label_field: 'name', label_value: 'id' },
          type: 'checkbox'
        },
        { field: 'mark', name: '备注', opts: { maxlength: 120, required: false } }
      ]
    }
  },
  watch: {},
  methods: {
    onParentChange(index, formData, col, status) {
      let children = this.getChildrenID(index, formData, col)
      let value = [...formData[col.field]]

      // 父类选中
      if (status) {
        // 选中所有下级
        children.forEach(it => {
          if (!value.includes(it)) {
            value.push(it)
          }
        })
      } else {
        // 父类取消选中
        // 移除所有下级
        children.forEach(it => {
          if (value.includes(it)) {
            let i = value.indexOf(it)
            if (i !== -1) {
              value.splice(i, 1)
            }
          }
        })
      }

      formData[col.field] = value
    },
    onChildrenChange(index, formData, col, status) {
      let value = [...formData[col.field]]
      let pid = col.list[index].id
      let children = this.getChildrenID(index, formData, col)
      if (status) {
        if (!value.includes(pid)) {
          value.push(pid)
        }
      } else {
        let isEmpty = true
        // 判断下级是否为空
        for (let it of children) {
          isEmpty = !value.includes(it)
          if (!isEmpty) {
            break
          }
        }
        // 下级为空
        if (isEmpty) {
          let i = value.indexOf(pid)
          if (i !== -1) {
            value.splice(i, 1)
          }
        }
      }

      formData[col.field] = value
    },
    // 获取所有下级的ID
    getChildrenID(index, formData, col) {
      let children = []

      col.list[index].children.forEach(it => {
        children.push(it.id)
      })

      return children
    }
  }
}
</script>

<style scoped>

</style>

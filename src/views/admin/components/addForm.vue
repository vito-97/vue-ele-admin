<template>
  <div>
    <custom-form
      :columns="columns"
      :rules="rules"
      v-bind="$attrs"
      v-on="listeners"
    >
    </custom-form>
  </div>

</template>

<script>
import customFromMixin from '@/utils/mixin/custom-form'

// required 是否必填  trigger 触发检查的方式 blur 失去焦点时检查 change 值发生改变时触发
// { required: true, message: '请输入活动名称', trigger: 'blur' },
// min  最小值   max 最大值 注意: type默认为string min和max则为最小长度和最大长度  当需要设置成数字的最小值和最大值时 type:'number' 需要在绑定时写  v-model.number='age' 但input的type 不能设置为number否则获取的值会一直被视为是字符串
// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } ,
// type的用法 ,其它的使用请参考文档
// { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
// string: 必须为类型 string， 这是默认的 type。
// number: 必须为类型 number。
// boolean: 必须为类型 boolean。
// method: 必须为类型 function。
// regexp: 必须为 RegExp的实例 或者 一个string，使用它 new RegExp时不能报错。
// integer: 必须为类型 number 并且是一个整数。
// float: 必须为类型 number 并且是一个浮点数。
// array: 必须是一个 array ，由 Array.isArray确定。
// object: 必须为类型 object 并且 Array.isArray返回false。
// enum: 值必须在 enum中存在。
// date: 值必须是有效的，由Date确定。
// url: 必须为类型 url。
// hex: 必须为类型 hex。
// email: 必须为类型 email。
// any: 可以是任意一种类型。
// 使用正则
// {pattern:/^[a-z]+$/,message:'只能输入字母!'},
// 自定义检查方法 check ,参数 rule, value, callback ,检测成功 或不成功都需要手动调用 callback , 验证不成功时 callback(new Error('提示信息')) :注意 当在下面的对象中有message时则验证失败只会显示message的值
// { validator: check, trigger: 'blur' }
export default {
  name: 'AddForm',
  mixins: [customFromMixin],
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        email: [
          { type: 'email' }
        ]
      },
      // 列配置
      columns: [
        { field: 'nickname', name: '昵称', opts: { required: true } },
        { field: 'username', name: '账号', opts: { required: true }, edit_opts: { readonly: true, disabled: true } },
        { field: 'password', name: '密码', add_opts: { required: true }, edit_opts: { required: false } },
        { field: 'tel', name: '手机' },
        { field: 'email', name: '邮箱' },
        {
          field: 'role_id',
          name: '角色',
          label: 'role',
          type: 'select',
          opts: { label_field: 'name', label_value: 'id', required: true }
        },
        { field: 'status', name: '状态', label: true, type: 'radio', opts: { required: true }, value: 1 },
        { field: 'mark', name: '备注', type: 'textarea' },
        { field: 'disabled_mark', name: '禁用备注', type: 'textarea' }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped>

</style>

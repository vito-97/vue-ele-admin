

## 简介
项目基于[vue-element-admin](https://panjiachen.github.io/vue-element-admin)开发，主要封装了表单和列表两大组件，对接现有后端[CrudApi](https://github.com/vito-97/crudapi)接口，实现了一些基础功能<br>
[vue-element-admin](https://panjiachen.github.io/vue-element-admin) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。

- [在线预览](https://panjiachen.github.io/vue-element-admin)

- [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)


----
实现的基础功能
```
- 登录 / 注销
- 附件管理
- 管理员管理
- 用户管理
- 角色管理
- 权限管理
- 文章管理
- 广告管理
- 个人信息
- 系统配置

- 数据列表组件
     -用于显示列表数据，灵活可配置
- 表单数据组件
     -用于添加和更新数据，灵活可配置
```

**实现一个用户管理**

用户管理入口<br>
src/views/user/index.vue
```html
<template>
  <div class="content-box">
    <crud-index
      :form-com="addForm"
      :table-com="tableList"
      :control="control"
      :crud="crud"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </crud-index>
  </div>
</template>

<script>
import tableList from './components/tableList'
import addForm from './components/addForm'
import indexMixin from '@/utils/mixin/crud-index'

export default {
  name: 'UserIndex',
  data() {
    return {
      tableList,
      addForm,
      control: 'user',
      crud: ['*']
    }
  },
  mixins: [indexMixin]
}
</script>
```
表单组件<br>
src/views/user/components/addForm.vue
```html
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

export default {
  name: 'AddForm',
  mixins: [customFromMixin],
  data() {
    return {
      rules: {},
      // 列配置
      columns: [
        { name: '账号', field: 'username', opts: { required: true, maxlength: 20 } },
        { name: '密码', field: 'password', add_opts: { required: true } },
        { name: '昵称', field: 'nickname', opts: { required: true, maxlength: 20 } },
        { name: '备注', field: 'mark', type: 'textarea', opts: { maxlength: 120 } }
      ]
    }
  },
}
</script>

```
列表组件<br>
src/views/user/components/tableList.vue
```html
<template>
  <div>
    <custom-table
      :columns="columns"
      :query="queryParams"
      v-bind="$attrs"
      v-on="listeners"
      @tap-head-btn="onTapHeadBtn"
      @tap-row-btn="onTapRowBtn"
      @row-dblclick="onRowDbClick"
    >
    </custom-table>
  </div>

</template>

<script>
import tableMixin from '@/utils/mixin/custom-table'

export default {
  data() {
    return {
      columns: [
        { name: '账号', field: 'username', width: 150 },
        { name: '昵称', field: 'nickname', width: 150 },
        { name: '最后登录时间', field: 'last_login_time', width: 150 },
        { name: '最后登录IP', field: 'last_login_ip', width: 150 },
        { name: '备注', field: 'mark', type: 'content' },
        { name: '添加时间', field: 'create_time', width: 150 }
      ]
    }
  },
  components: {},
  mixins: [
    tableMixin
  ],
  methods: {}
}
</script>
```
最后注册到路由中<br>
src/router/index.js
```javascript
export const asyncRoutes = [{
  path: '/user',
    component: Layout,
    redirect: '/user/index',
    alwaysShow: true, // will always show the root menu
    name: 'User',
    meta: {
    title: '用户',
      icon: 'peoples',
      auth: ['user']
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/user/index'),
      name: 'UserIndex',
      meta: {
        title: '用户管理',
        auth: ['user/index']
      }
    }
  ]
}]
```
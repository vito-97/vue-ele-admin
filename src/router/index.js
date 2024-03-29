import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
import * as VueConfig from '@/../vue.config'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    auth:['admin','device']      权限
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user role auth
 */
export const asyncRoutes = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    alwaysShow: true, // will always show the root menu
    name: 'Admin',
    meta: {
      title: '管理员',
      icon: 'el-icon-s-custom',
      auth: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/index'),
        name: 'AdminIndex',
        meta: {
          title: '管理员管理',
          auth: ['admin/index']
        }
      }
    ]
  },
  {
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
  },
  {
    path: '/adverts',
    component: Layout,
    redirect: '/adverts/index',
    alwaysShow: true, // will always show the root menu
    name: 'Adverts',
    meta: {
      title: '广告',
      icon: 'el-icon-reading',
      auth: ['adverts']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/adverts/index'),
        name: 'AdvertsIndex',
        meta: {
          title: '广告管理',
          auth: ['adverts/index']
        }
      }
    ]
  },
  {
    path: '/posts',
    component: Layout,
    redirect: '/posts/index',
    alwaysShow: true, // will always show the root menu
    name: 'Posts',
    meta: {
      title: '文章',
      icon: 'el-icon-document',
      auth: ['posts', 'posts_category']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/posts/index'),
        name: 'PostsIndex',
        meta: {
          title: '文章管理',
          auth: ['posts/index']
        }
      },
      {
        path: '/posts/category',
        component: () => import('@/views/posts_category/index'),
        name: 'PostsCategoryIndex',
        meta: {
          title: '分类管理',
          auth: ['posts_category/index']
        }
      }
    ]
  },
  {
    path: '/attachment',
    component: Layout,
    redirect: '/attachment/index',
    alwaysShow: true, // will always show the root menu
    name: 'Attachment',
    meta: {
      title: '附件',
      icon: 'el-icon-paperclip',
      auth: ['attachment']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/attachment/index'),
        name: 'AttachmentIndex',
        meta: {
          title: '附件管理',
          auth: ['attachment/index']
        }
      }
    ]
  },
  {
    path: '/system_role',
    component: Layout,
    redirect: '/system_role/index',
    alwaysShow: true, // will always show the root menu
    name: 'SystemRole',
    meta: {
      title: '角色',
      icon: 'el-icon-s-check',
      auth: ['system_role', 'system_auth']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/system_role/index'),
        name: 'SystemRoleIndex',
        meta: {
          title: '角色管理',
          auth: ['system_role/index']
        }
      },
      {
        path: '/system_auth/index',
        component: () => import('@/views/system_auth/index'),
        name: 'SystemAuthIndex',
        meta: {
          title: '权限管理',
          auth: ['system_auth/index']
        }
      }
    ]
  },
  {
    path: '/system_log',
    component: Layout,
    redirect: '/system_log/index',
    alwaysShow: true, // will always show the root menu
    name: 'SystemLog',
    meta: {
      title: '日志',
      icon: 'el-icon-tickets',
      auth: ['system_log']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/system_log/index'),
        name: 'SystemLogIndex',
        meta: {
          title: '日志管理',
          auth: ['system_log/index']
        }
      }
    ]
  },
  {
    path: '/system_config_tab',
    component: Layout,
    redirect: '/system_config_tab/index',
    alwaysShow: true, // will always show the root menu
    name: 'SystemConfigTab',
    meta: {
      title: '系统配置',
      icon: 'el-icon-s-tools',
      auth: ['system_config_tab', 'system_config', 'profile']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/system_config_tab/index'),
        name: 'SystemConfigTabIndex',
        meta: {
          title: '系统设置',
          auth: ['system_config_tab/index', 'system_config/index']
        }
      },
      {
        path: '/profile/index',
        component: () => import('@/views/profile/index'),
        name: 'ProfileIndex',
        meta: {
          title: '个人信息',
          auth: ['profile/update']
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  base: VueConfig.publicPath,
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

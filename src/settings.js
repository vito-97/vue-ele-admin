const DefaultLang = 'zh-cn'

module.exports = {
  // 默认语言
  defaultLang: DefaultLang,

  langList: { [DefaultLang]: '中文', 'en-us': '英文' },

  title: '后台管理系统',

  avatar: require('@/assets/image/default-avatar.gif'),

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'development',

  /**
   * 权限的前缀
   */
  authPrefix: 'admin/',

  /**
   * 默认的列表获取数
   */
  listLimit: 20,

  /**
   * 可选数量
   */
  pageSizes: [20, 50, 100, 150, 200/*, 300, 500, 1000*/],

  /**
   * CURD操作
   */
  curds: ['index', 'read', 'edit', 'save', 'update', 'change', 'delete'],
  /**
   * 控制器名称
   */
  controlName: {
    agent: '运营商',
    admin: '管理员',
    adverts: '广告',
    posts: '文章',
    posts_category: '文章分类',
    user: '用户',
    attachment: '附件',
    system_log: '日志',
    system_role: '角色',
    user_oauth: '第三方授权',
    system_config_tab: '配置分类',
    system_config: '配置'
  }
}

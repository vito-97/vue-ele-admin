module.exports = {
  title: '后台管理系统',

  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',

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
    cash_coupon: '现金券',
    cash_coupon_card: '现金券领取',
    coupon: '优惠券',
    coupon_card: '优惠券领取',
    user: '用户',
    factory_user: '出厂设置员',
    attachment: '附件',
    service_charge: '服务费',
    all_in_pay: '通联支付',
    card: 'IC卡',
    device: '设备',
    device_control: '设备操作记录',
    system_log: '日志',
    system_role: '角色',
    user_wallet: '用户钱包',
    user_oauth: '第三方授权',
    user_rebate: '用户返利',
    withdrawal: '用户提现',
    system_config_tab: '配置分类',
    system_config: '配置'
  }
}

const getters = {
  sidebar: state => state.app.sidebar,
  scroll: state => state.app.scroll,
  size: state => state.app.size,
  device: state => state.app.device,
  width: state => state.app.width,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  role: state => state.user.role,
  userinfo: state => state.user.userinfo,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  config: state => state.site.config
}
export default getters

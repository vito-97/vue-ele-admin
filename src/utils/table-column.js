const tableColumnCom = {}
const requireComponent = require.context(
  // 其组件目录的相对路径
  '@/views/custom/components/table-column',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /\w+El\.vue$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的命名
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/El\.\w+$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
  const componentLineName = componentName
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()

  /* tableColumnCom[componentName] = */ tableColumnCom[componentLineName] = componentConfig.default || componentConfig
})

export default tableColumnCom

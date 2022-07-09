import formItemCom from './form-item'

// 循环遍历获取组件对应的名称
const formItem = {}
for (let [index, item] of Object.entries(formItemCom)) {
  // 排除掉驼峰的索引
  if (!/[A-Z]/.test(index)) {
    formItem[index] = item.alias
  }
}

const ENUM = {
  // 用户类型
  user: {
    type: {
      normal: 1,
      water_company: 2,
      waterworks: 3,
      customer: 4,
      water_fetcher: 5,
      repair_type: 6,
      coupon_type: 7,
      factory_type: 8,
      agent: 9
    }
  },
  order: {
    status: {
      paid: 1
    }
  },
  // 获取组件对应的名称
  form_item: formItem
  /*  form_item: {
      input: '输入框',
      textarea: '多行文本框',
      number: '计数器',
      radio: '单选框',
      checkbox: '多选框',
      switch: '开关',
      color: '颜色选择器',
      slider: '滑块',
      select: '下拉框',
      date: '日期',
      date_time: '日期时间',
      time: '时间',
      icon: '图标',
      select_table: '数据选择器',
      upload: '上传',
      upload_image: '上传图片',
      upload_video: '上传视频',
      upload_mp3: '上传MP3',
      upload_doc: '上传文档',
      upload_pdf: '上传PDF',
      upload_xls: '上传表格',
      upload_zip: '上传压缩包'
    }*/
}

export default ENUM

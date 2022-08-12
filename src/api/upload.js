import curd from '@/api/curd'

/**
 * 上传附件
 * @param file
 * @returns {Promise<T>}
 */
export function upload(file) {
  let formData = new FormData()
  formData.append('file', file)
  formData.append('category', 'un')
  return curd('attachment').save(formData).then(res => {
    // console.log('upload', res)
    if ([0, 50905].includes(res.code)) {
      return res
    } else {
      return Promise.reject(res)
    }
  })
}

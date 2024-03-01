import crud from '@/api/crud'

/**
 * 上传附件
 * @param file
 * @returns {Promise<T>}
 */
export function upload(file) {
  let formData = new FormData()
  formData.append('file', file)
  formData.append('category', 'un')
  return crud('attachment').save(formData).then(res => {
    // console.log('upload', res)
    if ([0, 50905].includes(res.code)) {
      return res
    } else {
      return Promise.reject(res)
    }
  })
}

// 将base64转换为文件
export function base64ToFile(dataurl, filename) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var str = atob(arr[1])
  var n = str.length
  var u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = str.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// base64转blob
export function base64ToBlob(dataurl) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var str = atob(arr[1])
  var n = str.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = str.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export function urlToBase64(imgUrl) {
  return new Promise((resolve, reject) => {
    window.URL = window.URL || window.webkitURL
    var xhr = new XMLHttpRequest()
    xhr.open('get', imgUrl, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status == 200) {
        // 得到一个blob对象
        var blob = this.response
        // 至关重要
        let oFileReader = new FileReader()
        oFileReader.onloadend = function (e) {
          // 此处拿到的已经是base64的图片了,可以赋值做相应的处理
          resolve(e.target.result)
        }
        oFileReader.readAsDataURL(blob)
      }
    }
    xhr.onerror = function () {
      reject()
    }
    xhr.send()
  })
}

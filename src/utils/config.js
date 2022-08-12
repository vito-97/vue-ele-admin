const CONFIG = {
  upload_url: process.env.VUE_APP_BASE_API + 'v1/attachment',
  // 排除的错误码
  exclude_error_code: [
    // 已上传
    50905
  ],
  // 允许上传的类型
  allow_upload_type: {
    'doc': 'application/msword',
    'word': 'application/msword',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
    'ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'sldx': 'application/vnd.openxmlformats-officedocument.presentationml.slide',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'xlam': 'application/vnd.ms-excel.addin.macroEnabled.12',
    'xlsb': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    'pdf': 'application/pdf',
    'xls': 'application/vnd.ms-excel',
    'ppt': 'application/vnd.ms-powerpoint',
    'tar': 'application/x-tar',
    'tgz': 'application/x-tar',
    'zip': 'application/zip',
    'mp3': 'audio/mpeg',
    'gif': 'image/gif',
    'jpeg': 'image/jpeg',
    'jpe': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'tiff': 'image/tiff',
    'tif': 'image/tiff',
    'webp': 'image/webp',
    'log': 'text/plain',
    'text': 'text/plain',
    'txt': 'text/plain',
    'mp4': 'video/mp4'
  }
}

export default CONFIG

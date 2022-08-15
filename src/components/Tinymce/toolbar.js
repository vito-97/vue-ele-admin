// Here is a list of the toolbar
// Detail list see https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols
import { isMobile } from '@/utils'

const MOBILE = isMobile()

const mobileToolbar = MOBILE ? 'upload-image attachment transform-image' : ''

const toolbar = [
  'code searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript becodesample ' + mobileToolbar,
  'hr bullist numlist link image media charmap anchor pagebreak insertdatetime table emoticons forecolor backcolor preview importword restoredraft help fullscreen'
]

export default toolbar

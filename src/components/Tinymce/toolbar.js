// Here is a list of the toolbar
// Detail list see https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols
import { isMobile } from '@/utils'

const MOBILE = isMobile()

const mobileToolbar = MOBILE ? '| upload-image attachment transform-image' : ''

const toolbar = [
  'code searchreplace undo redo restoredraft | forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify alignnone outdent indent | blockquote subscript superscript removeformat becodesample ' + mobileToolbar,
  'hr pagebreak | styleselect formatselect fontselect fontsizeselect | bullist numlist link unlink anchor',
  'image media | charmap insertdatetime table emoticons importword print preview help fullscreen'
]

export default toolbar

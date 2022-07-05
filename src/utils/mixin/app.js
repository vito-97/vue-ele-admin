import checkPermission from '@/utils/permission'
import permission from '@/directive/permission'
import ENUM from '@/utils/enum'
import { controlName } from '@/utils/index'

const app = {
  directives: { permission },
  data() {
    return {
      ENUM
    }
  },
  methods: {
    checkPermission,
    controlName(name) {
      return controlName(name)
    }
  }
}

export default app

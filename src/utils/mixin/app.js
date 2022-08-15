import checkPermission from '@/utils/permission'
import permission from '@/directive/permission'
import ENUM from '@/utils/enum'
import { controlName } from '@/utils/index'
import { mapGetters } from 'vuex'

const app = {
  directives: { permission },
  data() {
    return {
      ENUM,
      mobileWidth: 992
    }
  },
  computed: {
    ...mapGetters({ screenWidth: 'width' }),

    isMobile() {
      let width = this.screenWidth

      return width <= this.mobileWidth
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

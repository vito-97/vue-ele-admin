import checkPermission from '@/utils/permission'
import permission from '@/directive/permission'
import { controlName } from '@/utils/index'
import { mapGetters } from 'vuex'

const app = {
  directives: { permission },
  data() {
    return {
      mobileWidth: 992
    }
  },
  computed: {
    ...mapGetters({ screenWidth: 'width' }),

    isMobile() {
      let width = this.screenWidth

      return width <= this.mobileWidth
    },
    // 统一dialog宽度
    dialogWidth() {
      return this.isMobile ? '95%' : '60%'
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

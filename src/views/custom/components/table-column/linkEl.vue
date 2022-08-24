<template>
  <div class="link-el-box" :class="type">
    <compoment :is="type" v-bind="linkProp">
      <slot>
        <span class="text">
        {{ val }}
        </span>
      </slot>
    </compoment>
  </div>
</template>

<script>
import tableColumnMixin from './table-column-mixin'
import { isExternal } from '@/utils/validate'

export default {
  name: 'LinkEl',
  data() {
    return {
      opts: {
        type: 'primary',
        link: '',
        target: '_blank',
        query: {},
        params: {}
      }
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.link)
    },
    type() {
      if (this.isExternal) {
        return 'el-link'
      }
      return 'router-link'
    },
    link() {
      let link = this.opt.link || this.formatVal

      if (typeof link === 'function') {
        link = link(this.row)
      }

      return link
    },
    linkProp() {
      let opt = this.opt
      if (this.isExternal) {
        return {
          type: opt.type,
          href: this.link,
          target: opt.target
        }
      } else {
        return {
          to: {
            path: this.link,
            params: opt.params,
            query: opt.query
          }
        }
      }
    }
  },
  mixins: [tableColumnMixin],
  filters: {},
  methods: {}
}
</script>

<style scoped lang="scss">
.link-el-box {
  &.router-link {
    color: $color-primary;

    &:hover {
      .text{
        border-bottom: 1px solid $color-primary;
      }
    }
  }
}
</style>

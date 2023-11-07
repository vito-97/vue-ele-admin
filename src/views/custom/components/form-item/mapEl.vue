<template>
  <div>
    <div class="row">
      <el-input
        size="small"
        type="number"
        placeholder="纬度"
        style="width: 130px;"
        :disabled="col.disabled"
        :min="-90"
        :max="90"
        v-model="lat"
        class="item"
      >
      </el-input>
      <el-input
        size="small"
        type="number"
        placeholder="经度"
        style="width: 130px"
        :disabled="col.disabled"
        :min="-180"
        :max="180"
        v-model="lng"
        class="item"
      >
      </el-input>
      <el-button type="primary" size="small" @click="onOpenMap" class="item">{{ opt.text }}</el-button>
    </div>
    <div class="tip" v-if="col.placeholder">
      {{ col.placeholder }}
    </div>
    <tencent-map
      ref="map"
      @set-map="onSetMap"
      :lat="lat"
      :lng="lng"
      :address="address">
    </tencent-map>
  </div>
</template>

<script>
import formItemMixin from './form-item-mixin'
import TencentMap from '@/components/TencentMap/index.vue'

export default {
  name: 'MapEl',
  mixins: [formItemMixin],
  alias: '坐标拾取',
  components: { TencentMap },
  data() {
    return {
      opts: {
        latKey: 'lat',
        lngKey: 'lng',
        addressKey: 'address',
        text: '坐标拾取'
      }
    }
  },
  computed: {
    lat: {
      get() {
        var k = this.opt.latKey
        return parseFloat(this.formData[k] || this.detail[k]) || ''
      },
      set(v) {
        this.$set(this.formData, this.opt.latKey, v)
      }
    },
    lng: {
      get() {
        var k = this.opt.lngKey
        return parseFloat(this.formData[k] || this.detail[k]) || ''
      },
      set(v) {
        this.$set(this.formData, this.opt.lngKey, v)
      }
    },
    address: {
      get() {
        var k = this.opt.addressKey
        return this.formData[k] || this.detail[k] || ''
      },
      set(v) {
        this.$set(this.formData, this.opt.addressKey, v)
      }
    }
  },
  methods: {
    onOpenMap() {
      this.$refs.map.open()
    },
    onSetMap(e) {
      var formData = this.formData
      var opt = this.opt
      this.$set(formData, opt.latKey, e.lat)
      this.$set(formData, opt.lngKey, e.lng)
      if (opt.addressKey) {
        this.$set(formData, opt.addressKey, e.address)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.row {
  width: 100%;
  display: flex;
  align-items: center;

  .item + .item {
    margin-left: 10px;
  }
}

.tip {
  color: #999;
  font-size: 12px;
  line-height: 1;
  padding-top: 2px;
}
</style>

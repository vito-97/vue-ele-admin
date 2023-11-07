<template>
  <el-dialog
    title="坐标拾取"
    :visible.sync="visible"
    :width="dialogWidth"
    append-to-body
    @close="close"
  >
    <div class="map_search">
      <el-row>
        <el-col :span="12" :xs="24">
          <el-row type="flex" :justify="isMobile ? 'space-between' : 'start'">
            <el-col>
              <el-select
                v-model="mapCity"
                filterable
                placeholder="请选择"
                size="small"
                style="width: 120px"
                @change="handleSearch"
              >
                <el-option-group
                  v-for="area in areaJson"
                  :key="area.name"
                  :label="area.name"
                >
                  <el-option
                    v-for="item in area.citys"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-option-group>
              </el-select>
            </el-col>
            <el-col>
              <el-input
                size="small"
                type="text"
                v-model.trim="searchForm.key"
                @input="handleSearch"
                placeholder="地址"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-row :justify="isMobile ? 'space-between' : 'end'" type="flex">
            <el-col :offset="8" :xs="{offset:0}">
              <el-input
                size="small"
                type="text"
                :value="mapLatLng ? mapLatLng[0] : ''"
                placeholder="纬度"
                :disabled="true"
                style="width: 110px"
              >
              </el-input>
            </el-col>
            <el-col>
              <el-input
                size="small"
                type="text"
                :value="mapLatLng ? mapLatLng[1] : ''"
                placeholder="经度"
                :disabled="true"
                style="width: 110px"
              >
              </el-input>
            </el-col>
            <el-col>
              <el-button type="primary" size="small" @click="handleSubmit">
                确定
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="map_box">
      <div class="map_panel">
        <div class="panel_left">
          <b>{{ mapCity }}</b>，缩放等级：{{ mapLevel }}
        </div>
        <div class="panel_right">{{ mapAddress }}</div>
      </div>
      <div class="map_main">
        <div class="map_left">
          <div v-if="searchForm.key">
            <div class="map_list" v-if="addressList.length > 0">
              <div
                class="map_item"
                :id="item.id"
                :class="{ active: item.active || item.hover }"
                v-for="(item, index) in addressList"
                @click="selectAddress(index)"
                @mouseover="setCurrentMarker(index, true)"
                @mouseout="setCurrentMarker(index, false)"
                :key="index"
              >
                <div class="item_icon">
                  <div class="icon">{{ index + 1 }}</div>
                </div>
                <div class="item_box">
                  <div class="title">{{ item.title }}</div>
                  <div class="row">
                    <div class="name">地址：</div>
                    <div class="val">{{ item.address }}</div>
                  </div>
                  <div class="row" v-if="item.tel">
                    <div class="name">电话：</div>
                    <div class="val">{{ item.tel }}</div>
                  </div>
                  <div class="row">
                    <div class="name">坐标：</div>
                    <div class="val">
                      {{ item.location.lat.toFixed(6) }}，{{ item.location.lng.toFixed(6) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="map_empty" v-else>对不起，没有搜索到你要找的结果</div>
          </div>
          <div class="map_msg" v-else>
            <div class="msg_title">功能简介：</div>
            <p>1、支持地址 精确/模糊 查询；</p>
            <p>2、支持POI点坐标显示；</p>
            <p>3、坐标鼠标跟随显示；</p>
            <div class="msg_title">使用说明：</div>
            <p>
              在搜索框搜索关键词后，地图上会显示相应poi点，同时左侧显示对应该点的信息，点击某点或某信息，右上角会显示相应该点的坐标和地址。
            </p>
          </div>
        </div>
        <div class="map_container" id="mapContainer"></div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import areaJson from './area'
import util from './util'
import { MAP_KEY } from '@/utils/config'
import { loadJs } from '@/utils'

var loadMap = false
var mapFnName = 'initMap' + Date.now()
window[mapFnName] = () => {
  loadMap = true
  delete window[mapFnName]
}
loadJs(`https://map.qq.com/api/js?v=2.exp&key=${MAP_KEY}&callback=${mapFnName}`)

export default {
  name: 'TMap',
  data() {
    return {
      isInit: false,
      visible: false,
      loading: true,
      map: null,
      mapKey: MAP_KEY,
      mapLevel: 14,
      mapLabel: null,
      mapCity: '',
      mapAddress: '',
      mapLatLng: null,
      searchForm: {
        key: ''
      },
      addressList: [],
      markerList: [],
      markerEventList: [],
      areaJson: [],
      adInfo: null,
      // 地图的marker实例
      mapMarker: null,
      // 定位信息
      position: null
    }
  },
  props: {
    lat: {
      type: [Number, String],
      default: ''
    },
    lng: {
      type: [Number, String],
      default: ''
    },
    address: {
      type: String
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(v) {
        if (v && loadMap) {
          if (!(this.lat && this.lng)) {
            this.mapLatLng = null
          }
          this.$nextTick(this.initMap)
        } else if (!v && this.lat && this.lng) {
          this.mapLatLng = [this.lat, this.lng]
          setTimeout(() => {
            this.moveCenter()
          }, 800)
        }
      }
    },
    lat(v) {
      v && (this.mapLatLng = [this.lat, this.lng]) && this.moveCenter()
    },
    lng(v) {
      v && (this.mapLatLng = [this.lat, this.lng]) && this.moveCenter()
    }
  },
  created() {
    if (this.lat && this.lng) {
      this.mapLatLng = [this.lat, this.lng]
    }
    this.mapAddress = this.address
    this.areaJson = areaJson.areas
  },
  methods: {
    initMap() {
      if (this.isInit) {
        if (this.mapLatLng != null) {
          this.locationService()
        } else {
          this.initcityService()
        }
        return
      }
      this.isInit = true
      let me = this
      // 初始化地图
      let mapContainer = document.getElementById('mapContainer')
      this.map = new window.qq.maps.Map(mapContainer, {
        zoom: me.mapLevel
      })
      console.log(mapContainer)
      // 设置Zoom
      window.qq.maps.event.addListener(this.map, 'zoom_changed', function () {
        me.mapLevel = me.map.getZoom()
      })
      // 创建Label
      this.mapLabel = new window.qq.maps.Label({
        map: this.map,
        offset: new window.qq.maps.Size(15, -12),
        draggable: false,
        clickable: false
      })
      this.map.setOptions({
        draggableCursor: 'crosshair'
      })

      mapContainer.addEventListener('mouseenter', function (e) {
        me.mapLabel.setMap(me.map)
      })
      mapContainer.addEventListener('mouseleave', function (e) {
        me.mapLabel.setMap(null)
      })
      window.qq.maps.event.addListener(this.map, 'mousemove', function (e) {
        var latlng = e.latLng
        me.mapLabel.setPosition(latlng)
        me.mapLabel.setContent(
          latlng.getLat().toFixed(6) + ',' + latlng.getLng().toFixed(6)
        )
      })

      if (this.mapLatLng != null) {
        this.locationService()
      } else {
        this.initcityService()
      }

      // 点击获取地址
      window.qq.maps.event.addListener(this.map, 'click', function (e) {
        me.jsonp(
          'http://apis.map.qq.com/ws/geocoder/v1/?location=' +
          e.latLng.getLat() +
          ',' +
          e.latLng.getLng() +
          '&key=' +
          me.mapKey +
          '&output=jsonp&callback=?'
        ).then((res) => {
          console.log(res)
          if (res.status == 0) {
            me.mapAddress = res.result != undefined ? res.result.address : ''
            me.mapLatLng =
              res.result != undefined
                ? [res.result.location.lat, res.result.location.lng]
                : null
            me.adInfo = res.result != undefined ? res.result.ad_info : null

            if (me.mapLatLng) {
              me.moveCenter()
            }
          }
        })
      })
    },
    initcityService() {
      if (this.position) {
        this.map.setCenter(this.position.latLng)
        this.mapCity = this.position.name
        this.mapMarker && this.mapMarker.setVisible(false)
        return
      }
      let me = this
      // 当位定前位置
      let cityService = new window.qq.maps.CityService({
        complete: function (result) {
          console.log(result)
          me.position = result.detail
          me.map.setCenter(result.detail.latLng)
          me.mapCity = result.detail.name
          me.mapMarker && me.mapMarker.setVisible(false)
        }
      })
      cityService.searchLocalCity()
    },
    // 按坐标获取位置信息
    locationService() {
      let me = this
      this.jsonp(
        'http://apis.map.qq.com/ws/geocoder/v1/?location=' +
        this.mapLatLng[0] +
        ',' +
        this.mapLatLng[1] +
        '&key=' +
        this.mapKey +
        '&output=jsonp&callback=?'
      ).then((res) => {
        if (res.status == 0 && res.result) {
          this.moveCenter()
          me.mapAddress = res.result.address
          me.mapCity = res.result.address_component.city
        }
      })
    },
    // 移动到定位的中心点
    moveCenter() {
      if (!this.map) {
        return
      }
      let center = new window.qq.maps.LatLng(
        this.mapLatLng[0],
        this.mapLatLng[1]
      )
      this.map.panTo(center)
      if (this.mapMarker) {
        this.mapMarker.setPosition(center)
        this.mapMarker.setVisible(true)
      } else {
        this.mapMarker = new window.qq.maps.Marker({
          position: center,
          map: this.map
        })
      }
    },
    jsonp(url) {
      return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_callback_' + Date.now() + (Math.random() * 1000).toFixed(0)
        const script = document.createElement('script')

        if (url.includes('=?')) {
          url = url.replace('=?', '=' + callbackName)
        }

        script.src = url
        script.onerror = reject
        document.body.appendChild(script)

        window[callbackName] = function (data) {
          resolve(data)
          document.body.removeChild(script)
          delete window[callbackName]
        }
      })
    },
    // 查询地址信息
    handleSearch() {
      if (!util.isNullEmpty(this.searchForm.key)) {
        this.jsonp(
          'http://apis.map.qq.com/ws/place/v1/search?keyword=' +
          this.searchForm.key +
          '&boundary=region(' +
          this.mapCity +
          ',0)&page_size=9&page_index=1&key=' +
          this.mapKey +
          '&output=jsonp&&callback=?'
        ).then((res) => {
          console.log(res)
          if (res.status == 0) {
            res.data.map((item, index) => {
              item.id = 'mapItem' + index
              item.active = false
              item.hover = false
              return item
            })
            this.addressList = res.data
            this.setMarker(res)
            this.map.setZoom(14)
          }
        })
      } else {
        this.addressList = []
        this.jsonp(
          'http://apis.map.qq.com/ws/geocoder/v1/?region=' +
          this.mapCity +
          '&address=' +
          this.mapCity +
          '&key=' +
          this.mapKey +
          '&output=jsonp&&callback=?'
        ).then((res) => {
          if (res.status == 0) {
            this.map.setCenter(
              new window.qq.maps.LatLng(
                res.result.location.lat,
                res.result.location.lng
              )
            )
            this.map.setZoom(14)
          }
        })
      }
    },
    // 设置Marker
    setMarker(res) {
      let me = this
      let latlngBounds = new window.qq.maps.LatLngBounds()
      // 删除Marker
      this.markerList.forEach((item) => {
        item.setMap(null)
      })
      // 删除Marker事件
      this.markerEventList.forEach((item) => {
        window.qq.maps.event.removeListener(item)
      })

      this.markerEventList = []
      this.markerList = []
      res.data.forEach((item, index) => {
        let latlng = new window.qq.maps.LatLng(
          item.location.lat,
          item.location.lng
        )
        latlngBounds.extend(latlng)
        // 创建Marker
        let marker = new window.qq.maps.Marker({
          map: this.map,
          position: latlng,
          zIndex: 10
        })
        marker.index = index
        marker.isClicked = false
        this.setAnchor(marker, false)
        this.markerList.push(marker)
        // 点击事件
        this.markerEventList.push(
          window.qq.maps.event.addDomListener(marker, 'click', function () {
            me.setFlagClicked(this.index)
          })
        )
        this.markerEventList.push(
          window.qq.maps.event.addDomListener(marker, 'mouseover', function () {
            me.setCurrentMarker(this.index, true)
            me.hoverAddress(this.index, true)
            me.mapLabel.setContent(
              this.position.getLat().toFixed(6) +
              ',' +
              this.position.getLng().toFixed(6)
            )
            me.mapLabel.setPosition(this.position)
            me.mapLabel.setOptions({
              offset: new window.qq.maps.Size(15, -20)
            })
            document
              .getElementById('mapItem' + this.index)
              .scrollIntoView({ behavior: 'smooth' })
          })
        )
        this.markerEventList.push(
          window.qq.maps.event.addDomListener(marker, 'mouseout', function () {
            me.setCurrentMarker(this.index, false)
            me.hoverAddress(this.index, false)
            me.mapLabel.setOptions({
              offset: new window.qq.maps.Size(15, -12)
            })
          })
        )
        this.map.fitBounds(latlngBounds)
      })
      if (this.markerList.length > 0) {
        this.map.setCenter(this.markerList[0].position)
      }
    },
    setAnchor(marker, flag) {
      let left = marker.index * 27
      let anchor = new window.qq.maps.Point(10, 30)
      let origin = new window.qq.maps.Point(left, flag ? 35 : 0)
      let size = new window.qq.maps.Size(27, 33)
      let icon = new window.qq.maps.MarkerImage(
        '/images/marker10.png',
        size,
        origin,
        anchor
      )
      marker.setIcon(icon)
    },
    // 选择地址
    selectAddress(index) {
      this.setCurrentAddress(index)
      this.setFlagClicked(index)
      this.map.setCenter(this.markerList[index].position)
    },
    hoverAddress(mapIndex, flag) {
      this.addressList.map((item, index) => {
        item.hover = flag ? index == mapIndex : flag
        return item
      })
    },
    setCurrentAddress(mapIndex) {
      this.addressList.map((item, index) => {
        item.active = index == mapIndex
        return item
      })
    },
    setCurrentMarker(index, flag) {
      if (flag || (!flag && !this.markerList[index].isClicked)) {
        this.setAnchor(this.markerList[index], flag)
      }
    },
    setFlagClicked(mapIndex) {
      this.markerList.map((item, index) => {
        if (index == mapIndex) {
          item.isClicked = true
          item.setZIndex(10)
          this.setAnchor(item, true)
          this.mapLatLng = [
            item.getPosition().getLat().toFixed(6),
            item.getPosition().getLng().toFixed(6)
          ]
          this.mapAddress = this.addressList[mapIndex].address
          this.adInfo = this.addressList[mapIndex].ad_info
        } else {
          item.isClicked = false
          item.setZIndex(9)
          this.setAnchor(item, false)
        }
        return item
      })
      this.setCurrentAddress(mapIndex)
      document
        .getElementById('mapItem' + mapIndex)
        .scrollIntoView({ behavior: 'smooth' })
    },
    handleSubmit() {
      if (this.mapLatLng == null) {
        this.$message({
          message: '请定位坐标',
          type: 'error',
          offset: 60
        })
        return
      }
      var info = this.adInfo

      var args = {
        lat: this.mapLatLng[0],
        lng: this.mapLatLng[1],
        address: this.mapAddress,
        code: info?.adcode,
        province: info?.province,
        city: info?.city,
        district: info?.district
      }
      this.$emit('set-map', args)
      this.close()
    },
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
}
</script>
<style scoped>
.map_box {
  width: 100%;
  border: 1px solid #dcdfe6;
}

.map_search {
  padding-bottom: 20px;
}

.map_search .el-col-24 {
  width: auto;
}

.map_box .map_panel {
  background: #f9f9f9;
  line-height: 40px;
  height: 40px;
  overflow: hidden;
  border-bottom: 1px solid #dcdfe6;
  font-size: 12px;
  padding: 0 10px;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
}

.map_box .map_panel .panel_left b {
  font-size: 14px;
  font-weight: bold;
  color: #000;
}

.map_box .map_panel .panel_right {
  text-align: right;
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
  font-weight: bold;
}

.map_box .map_container {
  height: 450px;
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
}

.map_box .map_main {
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
}

.map_box .map_main .map_left {
  width: 260px;
  height: 450px;
  overflow: auto;
  overflow-x: hidden;
  border-right: 1px solid #dcdfe6;
}

.map_box .map_main .map_empty {
  text-align: center;
  font-size: 12px;
  padding: 20px;
}

.map_box .map_main .map_list .map_item {
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  padding: 10px;
  cursor: pointer;
}

.map_box .map_main .map_list .map_item:hover,
.map_box .map_main .map_list .map_item.active {
  background: rgb(243, 243, 243);
}

.map_box .map_main .map_list .map_item .icon {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  color: #00ce9b;
  border: 1px solid #99ebd7;
  background: #e6faf5;
  line-height: 17px;
  font-weight: bold;
  text-align: center;
}

.map_box .map_main .map_list .map_item .item_box {
  padding-left: 10px;
  font-size: 12px;
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
}

.map_box .map_main .map_list .map_item .item_box .title {
  font-size: 14px;
  font-weight: bold;
  padding-bottom: 5px;
}

.map_box .map_main .map_list .map_item .item_box .row {
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  padding-bottom: 5px;
}

.map_box .map_main .map_list .map_item .item_box .row .val {
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
}

.map_box .map_main .map_left .map_msg {
  padding: 10px;
  font-size: 12px;
}

.map_box .map_main .map_left .map_msg .msg_title {
  color: #000;
  font-weight: bold;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .map_box .map_main {
    flex-direction: column;
  }

  .map_box .map_main .map_left {
    width: 100%;
    height: auto;
    max-height: 220px;
    border-right: unset;
    overflow-y: scroll;
  }

  .map_box .map_container {
    width: 100%;
    flex: unset;
  }
}
</style>

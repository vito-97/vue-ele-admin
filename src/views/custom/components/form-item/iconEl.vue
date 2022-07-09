<template>
  <div class="icon-box">
    <el-tag v-show="icon" size="medium" :class="[icon]" class="icon-name">
      {{ icon }}
    </el-tag>
    <el-button class="select-btn" type="primary" size="mini" @click="onClickChoose" :disabled="opt.disabled">
      {{ opt.btn_text }}
    </el-button>
    <el-dialog
      :title="opt.title"
      :visible.sync="visible"
      @close="onClose"
      @open="onOpen"
      :modal="true"
      width="60%"
      top="10vh"
      append-to-body
    >
      <template v-for="(icon,index) in icons">
        <div class="icon-list-box" :key="index">
          <div class="item" :class="{ active:icon.prefix+item === formData[field] }" v-for="(item,idx) in icon.list" :key="idx" @click="onClickIcon(icon.prefix,item)">
            <i :class="icon.prefix + item" class="icon"></i>
            <span class="name">{{ icon.prefix + item }}</span>
          </div>
        </div>
      </template>
    </el-dialog>

  </div>

</template>

<script>
import formItemMixin from './form-item-mixin'

/**
 * Element官方获取icon代码
 * var icons = document.getElementsByClassName('icon-name');
 * var arr = [];
 * for(let it of icons){
     arr.push(it.innerText.trim())
   }
 JSON.stringify(arr).replace(/"/g,"'")
 */
export default {
  name: 'IconEl',
  alias: '图标',
  mixins: [formItemMixin],
  data() {
    return {
      opts: {
        title: 'Icon 图标',
        btn_text: '选择图标',
        disabled: false
      },
      visible: false,
      icons: [{
        prefix: 'el-icon-',
        list: ['platform-eleme', 'eleme', 'delete-solid', 'delete', 's-tools', 'setting', 'user-solid', 'user', 'phone', 'phone-outline', 'more', 'more-outline', 'star-on', 'star-off', 's-goods', 'goods', 'warning', 'warning-outline', 'question', 'info', 'remove', 'circle-plus', 'success', 'error', 'zoom-in', 'zoom-out', 'remove-outline', 'circle-plus-outline', 'circle-check', 'circle-close', 's-help', 'help', 'minus', 'plus', 'check', 'close', 'picture', 'picture-outline', 'picture-outline-round', 'upload', 'upload2', 'download', 'camera-solid', 'camera', 'video-camera-solid', 'video-camera', 'message-solid', 'bell', 's-cooperation', 's-order', 's-platform', 's-fold', 's-unfold', 's-operation', 's-promotion', 's-home', 's-release', 's-ticket', 's-management', 's-open', 's-shop', 's-marketing', 's-flag', 's-comment', 's-finance', 's-claim', 's-custom', 's-opportunity', 's-data', 's-check', 's-grid', 'menu', 'share', 'd-caret', 'caret-left', 'caret-right', 'caret-bottom', 'caret-top', 'bottom-left', 'bottom-right', 'back', 'right', 'bottom', 'top', 'top-left', 'top-right', 'arrow-left', 'arrow-right', 'arrow-down', 'arrow-up', 'd-arrow-left', 'd-arrow-right', 'video-pause', 'video-play', 'refresh', 'refresh-right', 'refresh-left', 'finished', 'sort', 'sort-up', 'sort-down', 'rank', 'loading', 'view', 'c-scale-to-original', 'date', 'edit', 'edit-outline', 'folder', 'folder-opened', 'folder-add', 'folder-remove', 'folder-delete', 'folder-checked', 'tickets', 'document-remove', 'document-delete', 'document-copy', 'document-checked', 'document', 'document-add', 'printer', 'paperclip', 'takeaway-box', 'search', 'monitor', 'attract', 'mobile', 'scissors', 'umbrella', 'headset', 'brush', 'mouse', 'coordinate', 'magic-stick', 'reading', 'data-line', 'data-board', 'pie-chart', 'data-analysis', 'collection-tag', 'film', 'suitcase', 'suitcase-1', 'receiving', 'collection', 'files', 'notebook-1', 'notebook-2', 'toilet-paper', 'office-building', 'school', 'table-lamp', 'house', 'no-smoking', 'smoking', 'shopping-cart-full', 'shopping-cart-1', 'shopping-cart-2', 'shopping-bag-1', 'shopping-bag-2', 'sold-out', 'sell', 'present', 'box', 'bank-card', 'money', 'coin', 'wallet', 'discount', 'price-tag', 'news', 'guide', 'male', 'female', 'thumb', 'cpu', 'link', 'connection', 'open', 'turn-off', 'set-up', 'chat-round', 'chat-line-round', 'chat-square', 'chat-dot-round', 'chat-dot-square', 'chat-line-square', 'message', 'postcard', 'position', 'turn-off-microphone', 'microphone', 'close-notification', 'bangzhu', 'time', 'odometer', 'crop', 'aim', 'switch-button', 'full-screen', 'copy-document', 'mic', 'stopwatch', 'medal-1', 'medal', 'trophy', 'trophy-1', 'first-aid-kit', 'discover', 'place', 'location', 'location-outline', 'location-information', 'add-location', 'delete-location', 'map-location', 'alarm-clock', 'timer', 'watch-1', 'watch', 'lock', 'unlock', 'key', 'service', 'mobile-phone', 'bicycle', 'truck', 'ship', 'basketball', 'football', 'soccer', 'baseball', 'wind-power', 'light-rain', 'lightning', 'heavy-rain', 'sunrise', 'sunrise-1', 'sunset', 'sunny', 'cloudy', 'partly-cloudy', 'cloudy-and-sunny', 'moon', 'moon-night', 'dish', 'dish-1', 'food', 'chicken', 'fork-spoon', 'knife-fork', 'burger', 'tableware', 'sugar', 'dessert', 'ice-cream', 'hot-water', 'water-cup', 'coffee-cup', 'cold-drink', 'goblet', 'goblet-full', 'goblet-square', 'goblet-square-full', 'refrigerator', 'grape', 'watermelon', 'cherry', 'apple', 'pear', 'orange', 'coffee', 'ice-tea', 'ice-drink', 'milk-tea', 'potato-strips', 'lollipop', 'ice-cream-square', 'ice-cream-round']
      }]
    }
  },
  computed: {
    icon() {
      return this.formData[this.field] || ''
    }
  },
  methods: {
    onClickIcon(prefix, icon) {
      this.$set(this.formData, this.field, prefix + icon)
      this.visible = false
    },
    onClickChoose() {
      this.visible = true
    },
    onOpen() {

    },
    onClose() {

    }
  }
}
</script>

<style scoped lang="scss">
.icon-box {
  .icon-name {
    margin-right: 10px;
  }
}

.icon-list-box {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid #eee;
  border-right: 0;
  border-bottom: 0;

  .item {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    width: calc(100% / 8);
    cursor: pointer;
    padding: 20px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;

    .icon {
      font-size: 30px;
      margin-bottom: 10px;
    }

    .name {

    }
  }

  .item:hover,.item.active{
    color: $color-primary;
  }

}
</style>

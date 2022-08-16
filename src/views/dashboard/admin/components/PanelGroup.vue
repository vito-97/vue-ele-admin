<template>
  <el-row :gutter="40" class="panel-group">
    <template v-if="isSite(2)">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('users')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              水务公司数
            </div>
            <count-to :start-val="0" :end-val="detail.count_water_company" :duration="2600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('users')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              水厂数
            </div>
            <count-to :start-val="0" :end-val="detail.count_waterworks" :duration="2600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('users')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              取水客户数
            </div>
            <count-to :start-val="0" :end-val="detail.count_customer" :duration="2600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('users')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              取水员数
            </div>
            <count-to :start-val="0" :end-val="detail.count_water_fetcher" :duration="2600" class="card-panel-num"/>
          </div>
        </div>
      </el-col>
    </template>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('users')" v-if="isSite(1)">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description text-primary hidden-xs-only">
          <div class="card-panel-text text-primary">
            运营商数
          </div>
          <count-to :start-val="0" :end-val="detail.count_agent" :duration="2600" class="card-panel-num text-primary"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户数
          </div>
          <count-to :start-val="0" :end-val="detail.count_user" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
      <div class="card-panel" @click="handleSetLineChartData('users')" v-else-if="isSite(2)">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="tree" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description text-danger hidden-xs-only">
          <div class="card-panel-text text-danger">
            今年
          </div>
          <count-to
:start-val="0"
:end-val="detail.total_year_used_flow"
:duration="2600"
                    class="card-panel-num text-danger"/>
        </div>
        <div class="card-panel-description text-danger hidden-xs-only">
          <div class="card-panel-text text-danger">
            当月
          </div>
          <count-to
:start-val="0"
:end-val="detail.total_month_used_flow"
:duration="2600"
                    class="card-panel-num text-danger"/>
        </div>
        <div class="card-panel-description text-primary hidden-xs-only">
          <div class="card-panel-text text-primary">
            今日
          </div>
          <count-to
:start-val="0"
:end-val="detail.total_today_used_flow"
:duration="2600"
                    class="card-panel-num text-primary"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总流量
          </div>
          <count-to :start-val="0" :end-val="detail.total_used_flow" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('devices')">
        <div class="card-panel-icon-wrapper icon-message">
          <!--          <i class="el-icon-cpu card-panel-icon" />-->
          <svg-icon icon-class="component" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description hidden-xs-only">
          <div class="card-panel-text text-danger">
            故障
          </div>
          <count-to
            :start-val="0"
            :end-val="detail.count_fault_device"
            :duration="3000"
            class="card-panel-num text-danger"/>
        </div>
        <div class="card-panel-description hidden-xs-only">
          <div class="card-panel-text text-primary">
            在线
          </div>
          <count-to
            :start-val="0"
            :end-val="detail.count_online_device"
            :duration="3000"
            class="card-panel-num text-primary"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            设备数
          </div>
          <count-to :start-val="0" :end-val="detail.count_device" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('prices')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            销售额
          </div>
          <count-to
            :start-val="0"
            :end-val="detail.sum_order_money"
            :decimals="2"
            :duration="3000"
            prefix="￥"
            class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('orders')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            订单数
          </div>
          <count-to :start-val="0" :end-val="detail.count_order" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    detail: {
      type: Object
    },
    siteId: {
      type: Number
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    isSite(id) {
      return id == this.siteId
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon, [class*=el-icon-] {
      display: flex;
      justify-content: center;
      margin: 0 auto 14px !important;
      float: none !important;
    }

    .card-panel-icon {
      font-size: 30px !important;
    }
  }

  .card-panel-description {
    margin: 0 !important;
    width: 100%;
    float: unset;
    position: absolute;
    bottom: 10px;
    left: 0;
    text-align: center;

    .card-panel-text {
      font-size: 14px !important;
      margin-bottom: 0px !important;
    }

    .card-panel-num {
      font-size: 15px !important;
    }
  }
}
</style>

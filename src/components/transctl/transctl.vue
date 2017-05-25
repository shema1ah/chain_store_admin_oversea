<template>
  <div class="transctl">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>交易管理</span>
      </div>
    </div>
    <div class="panel down">
      <div class="panel-header panel-header__auto">
        <el-form :model="form" :rules="formrules" ref="form">
          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">时间</span>
              <el-form-item prop="dateRangeValue">
                <el-date-picker
                  v-model="form.dateRangeValue"
                  type="daterange"
                  :editable="false"
                  placeholder="选择日期范围"
                  size="small"
                  :clearable="false">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="panel-select__wrapper">
              <el-form-item prop="choosetime">
                <el-radio-group v-model="form.choosetime" @change="changeTime">
                  <el-radio-button v-for="item in choosetimes" :label="item.value">{{ item.name }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">店铺名称</span>
              <el-form-item prop="selectShopUid">
                <el-select v-model="form.selectShopUid" placeholder="全部" size="small" @change="getOperators(form.selectShopUid)">
                  <el-option
                    v-for="shop in shopData.list"
                    :label="shop.shop_name"
                    :value="shop.uid">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">操作员</span>
              <el-form-item>
                <el-select v-model="form.operaValue" placeholder="全部" size="small" @change="operaChange" :disabled="form.selectShopUid === ''">
                  <el-option label="全部" value=""></el-option>
                  <el-option
                          v-for="(label, value) in operaList"
                         :label="label" :value="value" :key="value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">收款方式</span>
              <el-form-item prop="checkAll1">
                <el-checkbox v-model="form.checkAll1" @change="handleCheckAllChange1">不限</el-checkbox>
              </el-form-item>
              <el-form-item prop="type">
                <el-checkbox-group v-model="form.type" @change="handleCheckedCitiesChange1">
                  <el-checkbox v-for="item in typeList" :label="item.value" :key="item.value">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </div>
          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">更多筛选</span>
              <el-form-item prop="checkAll2">
                <el-checkbox v-model="form.checkAll2" @change="handleCheckAllChange2">不限</el-checkbox>
              </el-form-item>
              <el-form-item prop="other">
                <el-checkbox-group v-model="form.other" @change="handleCheckedCitiesChange2">
                  <el-checkbox v-for="item in otherList" :label="item.value" :key="item.value">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </div>

          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">流水号</span>
              <el-form-item prop="orderno">
                <el-input v-model="form.orderno" type="number" placeholder="请输入流水号" size="small" class="panel-select-input__fix panel-select-input-220"></el-input>
              </el-form-item>
            </div>
            <div class="panel-header-btn-group">
              <div class="panel-header-btn panel-header-btn__fill" @click="getTransData">
                <span class="el-icon-loading" v-if="loading"></span>
                <span v-else>查询</span>
              </div>
              <div class="panel-header-btn" @click="reset">重置</div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="panel-body">
        <div class="panel-btn-group__wrapper panel-body-btn-group flex-normal">
          <div class="num_total">
            <div class="num_wrapper">
              <p class="num-title">交易总金额</p>
              <p class="num-desc">{{ transData.sucamt || 0 }} 元</p>
            </div>
            <div class="num_wrapper">
              <p class="num-title">交易实收</p>
              <p class="num-desc">{{ transData.total_txamt || 0 }} 元</p>
            </div>
            <div class="num_wrapper">
              <p class="num-title">红包优惠</p>
              <p class="num-desc">{{ transData.coupon_amt || 0 }} 元</p>
            </div>
            <div class="num_wrapper">
              <p class="num-title">成功交易笔数</p>
              <p class="num-desc">{{ transData.sucnum || 0 }} 笔</p>
            </div>
            <div class="num_wrapper">
              <p class="num-title">撤销笔数</p>
              <p class="num-default">{{ transData.cancelnum || 0 }} 笔</p>
            </div>
          </div>
          <div class="a-wrapper">
            <el-dropdown>
              <span class="el-dropdown-link"><img src="./img/download.png" alt="下载"></span>
              <el-dropdown-menu slot="dropdown">
                <a :href="detailHref" download><el-dropdown-item command=1 class="download_detail">下载交易明细</el-dropdown-item></a>
                <a :href="collectionHref" download><el-dropdown-item command=2 class="download_detail">下载交易汇总</el-dropdown-item></a>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-table
          :data="transData.data"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading">
          <el-table-column
            label="店铺名称/ID">
            <template scope="scope">
              <div>{{ scope.row.username }}</div>
              <div>{{ scope.row.userid }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作员">
            <template scope="scope">{{ scope.row.opuser || '-' }}</template>
          </el-table-column>
          <el-table-column
            prop="busicd_info"
            label="交易类型">
          </el-table-column>
          <el-table-column
            prop="sysdtm"
            min-width="150"
            label="交易时间">
            <template scope="scope">{{ scope.row.sysdtm }}</template>
          </el-table-column>
          <el-table-column
            label="交易金额">
            <template scope="scope">
              <div class="table-title">{{ scope.row.total_amt }}元</div>
              <div class="table-content">实收{{ scope.row.txamt }}元</div>
              <div v-show="scope.row.mchnt_coupon" class="table-content">商家红包{{ scope.row.mchnt_coupon }}元</div>
              <div v-show="scope.row.hj_coupon" class="table-content">平台补贴{{ scope.row.hj_coupon }}元</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status_str"
            label="交易状态">
          </el-table-column>
          <el-table-column
            prop="syssn"
            min-width="210"
            label="流水号">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="transData.num >= 10">
        <el-pagination
          ref="page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          :total="transData.num"
          @current-change="currentChange">
        </el-pagination>
      </div>
      <div class="table_placeholder" v-else></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import qs from 'qs';
  import {formatDate} from 'common/js/util.js';

  const typeLists = ['wxpay', 'alipay', 'jdpay', 'qqpay', 'card'];
  const otherLists = ['prepaid_recharge', 'prepaid', 'coupon', 'cancel'];

  export default {
    data() {
      let start = new Date();
      let defaultDateRange = [start, start];
      let checkOrderNo = (rule, val, cb) => {
        if(val && !/\d+/.test(Number(val))) {
          cb(new Error('流水号必须为数字！'));
        } else if(val && !/\d{14}/.test(val)) {
          cb(new Error('交易流水号需要至少14位'));
        } else {
          cb();
        }
      };
      return {
        pageSize: 10,
        status: false,
        loading: false,
        typeList: [
          {'name': '微信收款', 'value': 'wxpay'},
          {'name': '支付宝收款', 'value': 'alipay'},
          {'name': '京东收款', 'value': 'jdpay'},
          {'name': 'QQ收款', 'value': 'qqpay'},
          {'name': '刷卡收款', 'value': 'card'}
        ],
        otherList: [
          {'name': '储值充值', 'value': 'prepaid_recharge'},
          {'name': '储值消费', 'value': 'prepaid'},
          {'name': '红包优惠', 'value': 'coupon'},
          {'name': '撤销明细', 'value': 'cancel'}
        ],
        choosetimes: [
          {'name': '今天', 'value': '1'},
          {'name': '昨天', 'value': '2'},
          {'name': '近7天', 'value': '7'},
          {'name': '近30天', 'value': '30'}
        ],
        form: {
          selectShopUid: '',
          orderno: '',
          dateRangeValue: defaultDateRange,
          operaValue: '',
          checkAll1: true,
          checkAll2: true,
          choosetime: '1',
          type: [],
          other: []
        },
        currentPage: 1,
        operaList: {},
        transData: {},
        formrules: {
          orderno: [
            { validator: checkOrderNo, trigger: 'change' }
          ]
        }
      };
    },
    computed: {
      detailHref() {
        let detailParmas = Object.assign({}, this.basicParams, {isdownload: true});
        return `${config.host}/merchant/trade/download?${qs.stringify(detailParmas)}`;
      },
      collectionHref() {
        return `${config.host}/merchant/trade/total?${qs.stringify(this.basicParams)}`;
      },

      shopData() {
        return this.$store.state.shopData;
      },
      basicParams() {
        return {
          userid: this.form.selectShopUid,
          opuid: this.form.operaValue,
          endtime: formatDate(this.form.dateRangeValue[1]),
          starttime: formatDate(this.form.dateRangeValue[0]),
          orderno: this.form.orderno,
          charset: 'utf-8',
          isdownload: false,
          page: 1,
          maxnum: this.pageSize,
          paytypes: this.form.type.join(','),
          filters: this.form.other.join(',')
        };
      }
    },
    watch: {
      'form.dateRangeValue': function(val) {
        if(!this.status) {
          this.form.choosetime = '';
        }
        this.status = false;
      }
    },
    created() {
      this.loading = true;
      axios.get(`${config.host}/merchant/trade/info`, {
        params: this.basicParams
      })
      .then((res) => {
        this.loading = false;
        let data = res.data;
        if(data.respcd === config.code.OK) {
          this.transData = data.data;
        } else {
          this.$message.error(data.resperr);
        }
      })
      .catch(() => {
        this.loading = false;
        this.$message.error('首次获取交易列表失败');
      });
    },
    methods: {
      // 选择时间
      changeTime(value) {
        if(value) {
          this.status = true;
          let end = new Date();
          let start = new Date(end.getTime() - 3600 * 1000 * 24 * (value - 1));
          if(value == 2) {
              end = start;
          }
          this.form.dateRangeValue = [start, end];
        }
      },
      // check选择功能
      handleCheckAllChange1(event) {
        this.form.type = event.target.checked ? [] : typeLists;
      },
      handleCheckedCitiesChange1(value) {
        let checkCount = value.length;
        this.form.checkAll1 = !(checkCount > 0);
      },
      handleCheckAllChange2(event) {
        this.form.other = event.target.checked ? [] : otherLists;
      },
      handleCheckedCitiesChange2(value) {
        let checkCount = value.length;
        this.form.checkAll2 = !(checkCount > 0);
      },
      // 点击查询
      getTransData(params) {
        this.downHref = 'javascript:;';
        if(params.which && this.$refs['page']) {
          this.$refs['page'].internalCurrentPage = 1;
        }
        this.$refs['form'].validate((valid) => {
          if(valid) {
            this.loading = true;
            axios.get(`${config.host}/merchant/trade/info`, {
              params: Object.assign({}, this.basicParams, params)
            })
            .then((res) => {
              this.loading = false;
              let data = res.data;
              if(data.respcd === config.code.OK) {
                this.transData = data.data;
              } else {
                this.$message.error(data.resperr);
              }
            })
            .catch(() => {
              this.loading = false;
              this.$message.error('获取交易数据失败');
            });
          } else {
            this.loading = false;
            this.$message.error('请核对流水号!');
          }
        });
      },
      operaChange(opuid) {
        this.basicParams.opuid = opuid;
      },
      getOperators(uid) {
        this.form.operaValue = '';
        axios.get(`${config.host}/merchant/sub/opusers`, {
          params: {
            userid: uid
          }
        })
        .then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            this.operaList = data.data;
          } else {
            this.$message.error(data.resperr);
          }
        })
        .catch(() => {
          this.$message.error('获取操作员信息失败');
        });
      },
      currentChange(current) {
        this.currentPage = current;
        console.log(current);
        this.getTransData({
          page: current
        });
      },
      // 重置表单
      reset() {
        this.status = true;
        this.$refs['form'].resetFields();
      },
      handleSizeChange(size) {
        this.loading = true;
        this.pageSize = size;
        this.basicParams.page = 1;
        this.getTransData({which: 1});
      }
    }
  };
</script>

<style lang="scss">
  // 采用BEM命名规则

  .banner_wrapper {
    display: flex;
    height: 66px;
    padding: 0px 25px;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    background-color: #fff;
    .banner-breadcrumb {
      display: flex;
      align-items: center;
      .icon-right_arrow {
        font-size: 6px;
        margin: 0px 8px;
      }
    }
    @at-root .banner-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 158px;
      height: 40px;
      background-color: #7ED321;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      transition: .3s cubic-bezier(.645,.045,.355,1);
      @at-root .banner-btn__desc {
        margin-left: 8px;
      }
      .icon-create {
        transition: .3s cubic-bezier(.645,.045,.355,1);
        transform: rotateZ(0deg);
      }
      &:hover {
        box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.12);
        .icon-create {
          transform: rotateZ(90deg);
        }
      }
    }
  }

  .panel {
    margin: 23px 25px 23px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
  }
  .panel-header {
    height: 50px;
    padding-left: 15px;
    border-top: 2px solid #FE9B20;
    border-bottom: 1px solid #E7EAEC;
    font-size: 16px;
    @at-root .panel-select__wrapper {
      display: flex;
      align-items: center;
      margin-right: 40px;
      @at-root .panel-select__desc {
        margin-right: 15px;
      }
    }
  }
  .panel-body {
    padding: 10px 10px 0px;
  }

  .el-table__row_fix {
    height: 62px;
    min-height: 62px;
    color: #282A2D;
  }
  .pagination_wrapper {
    display: flex;
    height: 60px;
    padding-right: 20px;
    justify-content: flex-end;
    align-items: center;
  }

  .el-dropdown-menu__fix {
    padding: 0px;
    border: 1px solid #E8E7E6;
    color: #FE9B20;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    @at-root .el-dropdown-item__fix {
      line-height: 32px;
      padding: 0px 8px;
      text-align: center;
      font-size: 15px;
      &:first-of-type {
        border-bottom: 1px solid #E8E7E6;
      }
    }
  }

  .el-button__fix {
    position: relative;
    font-size: 15px;
    border-radius: 0px;
    margin-right: 15px;
    @at-root .el-dropdown-link__fix {
      font-size: 15px;
      color: #FE9B20;
    }
    &::after {
      position: absolute;
      content: '';
      height: 15px;
      right: -10px;
      width: 1px;
      background-color: #FE9B20;
    }
  }

  .panel-header__auto {
    position: relative;
    height: auto !important;
    padding: 25px 0;
  }

  .panel-select-group__fix {
    margin-bottom: 15px;

  }
  .el-form-item__content {
    .el-checkbox-group{
      display: inline-block;
      .el-checkbox{
        margin-left: 15px;
      }
    }
  }
  .panel-select-input__fix {
    width: auto;
  }

  .down{
    .panel-select-group {
      margin-bottom: 10px;
      position: relative;
      .panel-select__desc {
        width: 70px;
        margin: 0;
      }
      .el-input__inner {
        width: 220px;
      }
      .el-checkbox__label {
        color: #090909;
      }
    }
    .panel-header__auto {
      padding-bottom: 0;
    }
    .table-title {
      font-size: 16px;
      font-weight: 500;
    }
    .table-content {
      font-size: 12px;
    }
    .num_total {
      text-align: center;
      display: flex;
      p {
        height: 30px;
        line-height: 30px;
      }
      .num-title {
        font-size: 15px;
      }
      .num-desc {
        font-size: 18px;
        color: #FF8100;
        font-weight: bold;
      }
      .num-default {
        font-size: 18px;
        color: #8A8C92;
        font-weight: bold;
      }
      .num_wrapper {
        margin-left: 30px;
      }
    }
    .a-wrapper {
      margin-right: 30px;
      .el-dropdown-link {
        img {
          padding: 5px;
          border: 1px solid #7ED321;
          cursor: pointer;
        }
      }
    }
    .el-icon-loading{
      margin-right: 0;
    }
  }
  .panel-header-btn-group {
    position: absolute;
    right: 30px;
    bottom: 0;
    @at-root {
      .panel-header-btn {
        float: left;
        box-sizing: border-box;
        width: 100px;
        height: 35px;
        border: 1px solid #FE9B20;
        border-radius: 3px;
        text-align: center;
        line-height: 35px;
        font-size: 17px;
        cursor: pointer;
        &:last-of-type {
           color: #FE9B20;
           background-color: #fff;
            &:link,&:visited,&:hover,&:active{
            background-color: darken(#fff, 10%);
            }
        }
      }
      .panel-header-btn__fill {
        margin-right: 15px;
        color: #fff;
        background-color: #FE9B20;
        &:link,&:visited,&:hover,&:active {
          background-color: darken(#FE9B20, 10%);
        }
      }
    }
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .panel-select-input-220 {
    width: 220px;
  }
  .mr-16 {
    margin-right: 30px !important;
  }
  .flex-normal {
    justify-content: space-between;
  }

  .el-dropdown-menu {
    padding: 0;
    .download_detail {
      background-color: #fff;
      color: #262323;
      &:link,&:visited,&:hover,&:active {
        color: #FFF;
        background-color: darken(#7ED321, 5%);
      }
    }
  }
</style>

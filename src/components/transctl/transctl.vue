<template>
  <div class="transctl">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>交易管理</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__auto">
        <el-form :model="form" :rules="formrules" ref="form">
          <div class="panel-select-group panel-select-group__fix">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc panel-select-time__align">时间</span>
              <el-form-item prop="dateRangeValue">
                <el-date-picker
                  v-model="form.dateRangeValue"
                  type="daterange"
                  placeholder="选择日期范围"
                  size="small"
                  :clearable="false">
                </el-date-picker>
              </el-form-item>
            </div>
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
          </div>
          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">流水号</span>
              <el-form-item prop="orderno">
                <el-input v-model="form.orderno" placeholder="请输入流水号" size="small" class="panel-select-input__fix panel-select-input-220"></el-input>
              </el-form-item>
            </div>
            <div class="panel-select__wrapper">
              <span class="panel-select__desc mr-16">操作员</span>
              <el-form-item prop="operaValue">
                <el-select v-model="form.operaValue" placeholder="全部" size="small" @change="operaChange" :disabled="form.selectShopUid === ''">
                  <el-option
                    v-for="(label, value) in operaList"
                    :label="label"
                    :value="value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

          </div>
          <div class="panel-header-btn-group">
            <div class="panel-header-btn" @click="reset">重置</div>
            <div class="panel-header-btn panel-header-btn__fill" @click="getTransData">查询</div>
          </div>
        </el-form>
      </div>
      <div class="panel-body">
        <div class="panel-btn-group__wrapper panel-body-btn-group flex-normal">
          <div class="num_total">
            <div class="num_wrapper">
              <span class="num-title">成功交易笔数：</span>
              <span class="num-desc">{{ transData.sucnum || 0 }}</span>
            </div>
            <div class="num_wrapper">
              <span class="num-title">交易总金额：</span>
              <span class="num-desc">{{ transData.sucamt || 0 }} 元</span>
            </div>
          </div>
          <div class="a-wrapper">
            <a :href="detailHref" download>
              <div class="panel-btn__download panel-btn__download_detail">
                <i class="icon-download"></i>
                <span>下载交易明细</span>
              </div>
            </a>
            <a :href="collectionHref" download>
              <div class="panel-btn__download panel-btn__download_record">
                <i class="icon-download"></i>
                <span>下载交易汇总</span>
              </div>
            </a>
          </div>
        </div>
        <el-table
          :data="transData.data"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading"
          >
          <el-table-column
            prop="username"
            label="店铺名称">
          </el-table-column>
          <el-table-column
            prop="userid"
            label="店铺ID">
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
            min-width="90"
            label="交易时间">
            <template scope="scope">{{ scope.row.sysdtm | removeHMS }}</template>
          </el-table-column>
          <el-table-column
            label="交易金额"
            min-width="90">
            <template scope="scope">
              <div><span class="scope_cotent_title">实收</span>{{ scope.row.txamt }}元</div>
              <!-- <div><span class="scope_cotent_title">商家优惠</span>{{ scope.row.coupon_amt }}</div> -->
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
  import {isEmptyObject} from 'common/js/util.js';

  export default {
    data() {
      let today = new Date();
      let yesterday = new Date();
      let defaultDateRange = [];
      yesterday.setDate(yesterday.getDate() - 1);
      defaultDateRange.push(yesterday, today);

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
        loading: false,
        form: {
          selectShopUid: '',
          orderno: '',
          dateRangeValue: defaultDateRange,
          operaValue: ''
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
      starttime() {
        return this.form.dateRangeValue && this.format(this.form.dateRangeValue[0]);
      },
      endtime() {
        return this.form.dateRangeValue && this.format(this.form.dateRangeValue[1]);
      },
      basicParams() {
        return {
          userid: this.form.selectShopUid,
          opuid: this.form.operaValue,
          endtime: this.endtime,
          starttime: this.starttime,
          orderno: this.form.orderno,
          charset: 'utf-8',
          isdownload: false,
          page: 1,
          maxnum: this.pageSize
        };
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
      getTransData(params) {
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
        if(uid === '') {
          this.form.operaValue = '';
        }
        axios.get(`${config.host}/merchant/sub/opusers`, {
          params: {
            userid: uid
          }
        })
        .then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            if(!isEmptyObject(data.data)) {
              data.data[''] = '全部';
            } else {
              this.form.operaValue = '';
            }
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
      reset() {
        let today = new Date();
        let yesterday = new Date();
        let defaultDateRange = [];
        yesterday.setDate(yesterday.getDate() - 1);
        defaultDateRange.push(yesterday, today);
        this.form.dateRangeValue = defaultDateRange;
        this.form.selectShopUid = '';
        this.form.orderno = '';
      },
      format(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

        return `${year}-${month}-${day}`;
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
    padding: 25px 0px;
  }

  .panel-select-group__fix {
    margin-bottom: 15px;
  }

  .panel-select-time__align {
    margin-right: 30px !important;
  }
  .panel-select-input__fix {
    width: auto;
  }

  .panel-header-btn-group {
    position: absolute;
    right: 20px;
    top: 25px;
    @at-root {
      .panel-header-btn {
        box-sizing: border-box;
        width: 100px;
        height: 35px;
        border: 1px solid #FE9B20;
        border-radius: 3px;
        text-align: center;
        line-height: 35px;
        font-size: 17px;
        color: #FE9B20;
        cursor: pointer;
        &:first-of-type {
          margin-bottom: 15px;
        }
      }
      .panel-header-btn__fill {
        color: #fff;
        background-color: #FE9B20;
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
  .a-wrapper {
    display: flex;
  }
  .flex-normal {
    justify-content: space-between;
  }
  .num_total {
    display: flex;
    align-items: center;
    margin-left: 10px;
    .num-title {
      font-size: 14px;
    }
    .num-desc {
      font-size: 17px;
      color: #FE9B20;
      font-weight: bold;
    }
    .num_wrapper:last-of-type {
      margin-left: 30px;
    }
  }
</style>

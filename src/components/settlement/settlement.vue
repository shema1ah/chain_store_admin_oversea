<template>
  <div class="settle">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$t('settlement.crumbs.L1')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="panel down">
      <div class="panel-header panel-header__auto">
        <el-form :model="form" ref="form">
          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">{{$t('settlement.panel.time')}}</span>
              <el-form-item prop="dateRangeValue">
                <el-date-picker
                  v-model="form.dateRangeValue"
                  type="datetimerange"
                  :editable="false"
                  :placeholder="$t('tradeMng.panel.range')"
                  size="small"
                  :clearable="false">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="panel-select__wrapper">
              <el-form-item prop="choosetime">
                <el-radio-group v-model="form.choosetime" @change="changeTime">
                  <el-radio-button v-for="item in choosetimes" :label="item.value" :key="item.value">{{ item.name }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="panel-select-group type-special" v-show="typeList.length > 1">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">{{$t('settlement.panel.type')}}</span>
              <el-form-item prop="remit_type">
                <el-radio-group v-model="form.remit_type">
                  <el-radio-button v-for="type in typeList" :label="type.remit_type" :key="type.remit_type">{{ type.code }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <div class="panel-select-group" style="height: 37px">
            <div class="panel-header-btn-group">
              <div class="panel-header-btn panel-header-btn__fill" @click="search">
                <span class="el-icon-loading" v-if="loading"></span>
                <span v-else>{{$t('settlement.panel.btn.query')}}</span>
              </div>
              <div class="panel-header-btn transctl-btn" @click="reset">{{$t('settlement.panel.btn.reset')}}</div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="panel-body">
        <el-table
          :data="settleData.data"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading">
          <el-table-column
            :label="$t('settlement.table.settleTime')" min-width="100">
            <template slot-scope="scope">
              <div>{{ scope.row.settle_date }}</div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('settlement.panel.name')" min-width="120">
            <template slot-scope="scope">{{ scope.row.code }}</template>
          </el-table-column>
          <el-table-column prop="currency" :label="$t('settlement.table.currency')">
          </el-table-column>
          <el-table-column prop="amt" min-width="100" :label="$t('settlement.table.total')">
            <template slot-scope="scope">{{ scope.row.amt | formatCurrency }}</template>
          </el-table-column>
          <el-table-column prop="fee" :label="$t('settlement.table.charge')">
            <template slot-scope="scope">{{ scope.row.fee | formatCurrency }}</template>
          </el-table-column>
          <el-table-column prop="settle_amt" :label="$t('settlement.table.settleAmount')">
            <template slot-scope="scope">{{ scope.row.settle_amt | formatCurrency }}</template>
          </el-table-column>
          <el-table-column :label="$t('settlement.table.op')">
            <template slot-scope="scope">
              <a :href="downUrl" @click="getDownUrl(scope.row.id, $event)">
                  <span id="tr-download">{{ $t('settlement.table.download') }}</span>
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="settleData.total >= 10">
        <el-pagination
          ref="page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          :total="settleData.total"
          @current-change="currentChange"
          :current-page="currentPage">
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
  import {formatDate} from '../../common/js/util';

  export default {
    data() {
      return {
        lang: config.lang,
        downUrl: 'javascript:;',
        pageSize: 10,
        currentPage: 1,
        loading: false,
        typeList: [],
        choosetimes: [
          {'name': this.$t('settlement.panel.today'), 'value': '1'},
          {'name': this.$t('settlement.panel.yestoday'), 'value': '2'},
          {'name': this.$t('settlement.panel.near7'), 'value': '7'},
          {'name': this.$t('settlement.panel.near30'), 'value': '30'}
        ],
        form: {
          remit_type: 1,
          dateRangeValue: '',
          choosetime: '1'
        },
        settleData: {}
      };
    },

    computed: {
      basicParams() {
        return {
          remit_type: this.form.remit_type,
          start_date: formatDate(this.form.dateRangeValue[0], 'yyyy-MM-dd HH:mm:ss'),
          end_date: formatDate(this.form.dateRangeValue[1], 'yyyy-MM-dd HH:mm:ss'),
          charset: 'utf-8',
          page: this.currentPage - 1,
          size: this.pageSize,
          lang: this.lang,
          format: 'cors'
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
      this.changeTime('1');
      this.getType();
    },

    methods: {
      // 获取
      getType() {
        axios.get(`${config.ohost}/fund/v1/check/types?lang=${this.lang}&format=cors`).then(
          (res) => {
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.typeList = data.data || [];
              this.form.remit_type = this.typeList[0].remit_type;

              this.getSettleData();
            } else {
              this.$message.error(data.resperr);
            }
          }
        ).catch(() => {
          this.$message.error(this.$t('common.netError'));
        });
      },

      getDownUrl(id, e) {
        let downParams = {
          biz_sn: id,
          lang: this.lang,
          format: 'cors'
        };
        let url, type = this.form.remit_type;
        if(type === 4 || type === 5) {
          url = 'overseas';
        }else {
          url = 'hkd';
        }
        e.target.parentNode.href = `${config.ohost}/fund/v1/${url}/check/download?${qs.stringify(downParams)}`
      },

      // 选择时间
      changeTime(value) {
        if(value) {
          this.status = true;
          let end = new Date();
          let start = new Date(end.getTime() - 3600 * 1000 * 24 * (value - 1));

          if(value == 2) {
              end = new Date(end.getTime() - 3600 * 1000 * 24);
          }

          start.setHours(0);
          start.setMinutes(0);
          start.setSeconds(0);

          if(value != 1) {
            end.setHours(23);
            end.setMinutes(59);
            end.setSeconds(59);
          }
          this.form.dateRangeValue = [start, end];
        }
      },

      // 点击查询
      search() {
        this.handleSizeChange();
      },

      // 获取数据
      getSettleData() {
        if(!this.loading) {
          this.loading = true;
          let url, type = this.form.remit_type;
          if(type === 4 || type === 5) {
            url = 'overseas';
          }else {
            url = 'hkd';
          }
          axios.get(`${config.ohost}/fund/v1/${url}/check`, {
            params: this.basicParams
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.settleData = data.data;
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('settlement.msg.m1'));
          });
        }
      },

      currentChange(current) {
        if (!current && this.currentPage !== 1) {
          this.currentPage = 1;
          return;
        }
        if (current) {
          this.currentPage = current;
        }

        this.getSettleData();
      },

      // 重置表单
      reset() {
        this.status = true;
        this.$refs['form'].resetFields();
      },

      handleSizeChange(size = 10) {
        this.pageSize = size;
        this.currentChange();
      }
    }
  };
</script>
<style lang="scss">
  .type-special {
    .el-radio-button {
      padding-bottom: 10px;
    }
  }
</style>

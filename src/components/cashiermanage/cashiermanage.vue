<template>
  <div class="cashiermanage">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{ $t('cashMng.crumbs.L1') }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="btn-wrap">
        <div class="banner-btn" :class="{'banner-btn-ja': lang === 'ja'}" @click="addCashier">
          <i class="icon-create"></i>
          <span class="banner-btn__desc">{{ $t('cashMng.crumbs.L3') }}</span>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-select-group">
          <div class="panel-select__wrapper">
            <span class="panel-select__desc">{{ $t('cashMng.common.status') }}</span>
            <el-select v-model="stateValue" :placeholder="$t('common.all')" size="small" @change="stateChange">
              <el-option v-for="item in stateLists" :label="item.name" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="panel-select__wrapper" v-if="!role.haiwai">
            <span class="panel-select__desc">退款权限</span>
            <el-select v-model="rightsValue" :placeholder="$t('common.all')" size="small" @change="rightsChange">
              <el-option v-for="item in rightsLists" :label="item.name" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <el-table :data="cashierData.opusers" style="width: 100%" row-class-name="el-table__row_fix" v-loading="loading" id="memberredcollect">
          <el-table-column prop="opuid" :label="$t('cashMng.common.number')"></el-table-column>
          <el-table-column prop="opname" :label="$t('cashMng.mng.name')"></el-table-column>
          <el-table-column prop="mobile" min-width="80px" :label="$t('cashMng.mng.mobile')"></el-table-column>
          <el-table-column :label="$t('cashMng.common.status')" :min-width="role.haiwai?'140px':'80px'">
            <template scope="scope">
              <el-switch v-model="scope.row.status" on-text="" off-text="" on-color="#FF8100" off-color="#d8d8d8" on-value=1 off-value=0 @change="changeStatus(scope.row.opuid, scope.row.status)"></el-switch>
              <span class="explain">{{ scope.row.status == 1 ? $t('cashMng.mng.status3') : $t('cashMng.mng.status4') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="refund" label="退款权限状态" v-if="!role.haiwai" min-width="80px">
            <template scope="scope">
              <el-switch v-model="scope.row.refund" on-text="" off-text="" on-color="#7ed321" off-color="#d8d8d8" on-value=1 off-value=0 @change="changeRights(scope.row.opuid, scope.row.refund)"></el-switch>
              <span class="explain">{{ scope.row.refund == 1 ? '开启退款' : '关闭退款' }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="120" :label="$t('cashMng.mng.op')">
            <template scope="scope">
              <el-button type="text" size="small" class="el-button__fix" @click="goDetail(scope.row.opuid)">{{ $t('cashMng.mng.detail') }}</el-button>
              <a :href="downHref + scope.row.opuid" download v-if="!role.haiwai" class="el-button__fix el-button--text">下载收款码</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="cashierData.count >= 10">
        <el-pagination
          ref="page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          :total="cashierData.count"
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
  import Store from '../../common/js/store';

  export default {
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        Object.assign(vm, {
          flag: false,
          pageSize: 10,
          rightsValue: '',
          stateValue: '',
          currentPage: 1
        });

        vm.getData();

        // 延时改变
        setTimeout(() => {
          Object.assign(vm, {
            flag: true
          });
        }, 200);
      });
    },

    data() {
      return {
        role: Store.get('role') || {},
        lang: config.lang,
        cashierData: [],
        pageSize: 10,
        rightsValue: '',
        stateValue: '',
        loading: false,
        currentPage: 1,
        stateLists: [
          {
            name: this.$t('common.all'),
            value: ''
          },
          {
            name: this.$t('cashMng.mng.status1'),
            value: 1
          },
          {
            name: this.$t('cashMng.mng.status2'),
            value: 0
          }
        ],
        rightsLists: [
          {
            name: this.$t('common.all'),
            value: ''
          },
          {
            name: '有权限',
            value: 1
          },
          {
            name: '无权限',
            value: 0
          }
        ]
      };
    },

    props: {
      shop: {
        type: Object
      }
    },

    computed: {
      basicParams() {
        return {
          refund: this.rightsValue,
          status: this.stateValue,
          pagesize: this.pageSize,
          page: this.currentPage - 1,
          format: 'cors'
        };
      },
      downHref() {
        return `${config.host}/merchant/qrcode?userid=${this.shop.uid}&opuid=`;
      }
    },

    methods: {
      // 改变活动状态
      stateChange() {
        this.handleSizeChange();
      },

      // 改变店铺名称
      rightsChange() {
        this.handleSizeChange();
      },

      // 请求数据
      getData() {
        this.loading = true;
        axios.get(`${config.host}/merchant/opuser/list`, {
          params: this.basicParams
        }).then((res) => {
          this.loading = false;
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.cashierData = this.formatData(data.data);
          } else {
            this.$message.error(data.respmsg);
          }
        }).catch(() => {
          this.loading = false;
          this.$message.error(this.$t('cashMng.mng.m5'));
        });
      },

      // 格式化数据
      formatData(list) {
        let opusers = list.opusers || [];
        for(let i of opusers) {
          i.status = i.status + '';
          i.refund = i.refund + '';
        }
        return list;
      },

      // 改变size
      handleSizeChange(size = 10) {
        this.pageSize = size;
        this.currentChange();
      },

      // 改变当前页
      currentChange(current) {
        if (!current && this.currentPage !== 1) {
          this.currentPage = 1;
          return;
        }
        if (current) {
          this.currentPage = current;
        }
        if (this.flag) {
          this.getData();
        }
      },

      // 增加收银员
      addCashier() {
        this.$router.push('/main/cashiermanage/addcashier');
      },

      // 详情页
      goDetail(id) {
        this.$router.push({
          path: '/main/cashiermanage/cashierdetail',
          query: {
            'id': id
          }});
      },

      // 修改状态
      changeStatus(id, st) {
        let s, message;
        if(st === '1') {
          s = 0 + '';
          message = this.$t('cashMng.common.m1');
        }else {
          s = 1 + '';
          message = this.$t('cashMng.common.m2');
        }
        if(!this.loading) {
          this.loading = true;
          axios.post(`${config.ohost}/mchnt/opuser/change`, {
            opuid: id,
            status: s,
            format: 'cors'
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.$message({
                type: 'success',
                message: message
              });
            } else {
              this.$message.error(data.resperr);
            }
            st = s;
            // this.getData();
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('common.netError'));
          })
        }
      },

      // 修改权限
      changeRights(id, rg) {
        let s, message;
        if(rg === '1') {
          s = 0 + '';
          message = '权限已关闭';
        } else {
          s = 1 + '';
          message = '权限已开启';
        }
        if(!this.loading) {
          this.loading = true;
          axios.post(`${config.ohost}/mchnt/opuser/perm/change`, {
            opuid: id,
            type: 'refund',
            status: s,
            format: 'cors'
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.$message({
                type: 'success',
                message: message
              });
            } else {
              this.$message.error(data.resperr);
            }
            rg = s;
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('common.netError'));
          })
        }
      }
    }
  };
</script>
<style lang="scss">
  .cashiermanage {
    .explain {
      color: #777A7D;
      font-size: 12px;
    }
  }
  .form-item__detail {
    margin-top: 10px;
    color: #98989E;
    font-size: 14px;
    line-height: 1;
  }

  .form-submit_wrapper {
    display: flex;
    padding: 20px;
    align-items: center;
    .cancel {
      margin-right: 46px;
      text-decoration: underline;
      font-size: 16px;
      color: #FE9B20;
      cursor: pointer;
    }
    .icon-create {
      margin-right: 10px;
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: #E8E7E6;
  }

  .myform_wrapper {
    margin-top: 20px;
    .el-form-item {
      margin-left: 20px;
      margin-bottom: 20px;
      .el-form-item {
        display: inline-block;
        margin: 0px;
      }
    }
    .el-form-item__content {
      margin-left: 110px;
      line-height: 32px;
      font-size: 16px;
    }
    .el-radio__label {
      font-size: 16px;
    }
    .el-form-item__label {
      padding: 8px 0px;
      font-size: 16px;
    }
    .el-input {
      display: inline-block;
    }
  }

  .add_rule {
    display: inline-block;
    width: 100px;
    line-height: 30px;
    margin-top: 2px;
    margin-left: 20px;
    background-color: #7ED321;
    border-radius: 3px;
    color: #fff;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    .icon-create {
      margin-right: 8px;
    }
  }
  .el-form-item.is-required .el-form-item__label:before {
    display: none !important;
  }
  .remark {
    margin-top: 10px;
    color: red !important;
    font-size: 14px !important;
  }
</style>

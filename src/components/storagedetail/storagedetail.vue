<template>
  <div class="storagedetail">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>会员功能</span>
        <i class="icon-right_arrow"></i>
        <span>会员储值</span>
        <i class="icon-right_arrow"></i>
        <span>储值会员</span>
        <i class="icon-right_arrow"></i>
        <span>储值会员详情</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-select-group">
          <span class="panel-header__desc">储值会员资料</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="info_wrapper">
          <div class="info-header">
            <div class="info-left">
              <div class="info-img">
                <img v-if="storeData.avatar" :src="storeData.avatar" alt="图像">
                <img src="./img/default.png" alt="图像" v-else>
              </div>
              <div class="information">
                <p class="info-title">{{ storeData.name || '2233' }}</p>
                <p>
                  <img src="./img/tel.png" alt="图标">
                  <span>{{ storeData.mobile || '13523232323' }}</span>
                </p>
                <p>
                  <img src="./img/birthday.png" alt="图标">
                  <span>{{ storeData.birthday || '1992-02-11' }}</span>
                </p>
              </div>
            </div>
            <div class="info-right">
              <div>
                <p class="right-title">余额</p>
                <p class="right-count">¥ 52800.00</p>
              </div>
              <div>
                <p class="right-title">累计储值</p>
                <p class="right-count">¥ 52800.00</p>
              </div>
              <div>
                <p class="right-title">储值次数</p>
                <p class="right-count">3</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-select-group">
          <span class="panel-header__desc">储值会员资料</span>
        </div>
      </div>
      <div class="panel-body">
        <el-table
          :data="listData.data"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading">
          <el-table-column label="图像">
            <template scope="scope">
              <img v-if="scope.row.c_avatar" :src="scope.row.c_avatar" alt="" width="44" height="44" />
              <img src="./img/default.png" height="44" width="44" v-else/>
            </template>
          </el-table-column>
          <el-table-column label="交易类型">
            <template scope="scope">{{ scope.row.biz_type | formatType }}</template>
          </el-table-column>
          <el-table-column min-width="100" label="时间" prop="sysdtm">
          </el-table-column>
          <el-table-column min-width="100" label="交易金额">
            <template scope="scope">{{ scope.row.txamt | formatCurrency }}</template>
          </el-table-column>
          <el-table-column min-width="100" label="交易门店" prop="shopname">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="listData.count >= 7">
        <el-pagination
          ref="page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          :page-sizes="[7,14,21,28,35]"
          @size-change="handleSizeChange"
          :total="listData.count"
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
  import Store from "../../common/js/store";
  import { getParams } from '../../common/js/util';

  let id = getParams('id');

  export default {
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        Object.assign(vm, {
          pageSize: 7,
          currentpage: 1,
          flag: false
        });

        vm.getData();

        setTimeout(() => {
          Object.assign(vm, {
            flag: true
          });
        }, 200);
      });
    },

    data() {
      return {
        pageSize: 7,
        loading: false,
        currentPage: 1,
        listData: {}
      };
    },

    computed: {
      storeData() {
        return Store.get('storeData') || {};
      },

      basicParams() {
        return {
          curpage: this.currentPage,
          length: this.pageSize,
          cid: id,
          format: 'cors'
        };
      }
    },

    methods: {
      // 获取数据
      getData() {
        if(!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/merchant/prepaid/transactions`, {
            params: this.basicParams
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.listData = data.data;
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.loading = false;
            this.$message.error('获取数据失败');
          });
        }
      },

      // 页数
      currentChange(current) {
        if (!current && this.currentPage !== 1) {
          this.currentPage = 1;
          return;
        }
        if (current) {
          this.currentPage = current;
        }

        this.getData();
      },

      // 每页条数
      handleSizeChange(size = 7) {
        this.pageSize = size;
        this.currentChange();
      }
    }
  };
</script>

<style lang="scss">
  .storagedetail {
    .info-header {
      display: flex;

      .info-left {
        flex: 1;
        display: flex;

        .info-img {
          img {
            border-radius: 50%;
            width: 70px;
            height: 70px;
          }
        }

        .information {
          flex: auto;
          margin-left: 20px;
          p {
            height: 25px;
            line-height: 25px;
            font-size: 15px;
            color: #777A7D;
          }
          .info-title {
            font-size: 20px;
            color: #282b2d;
          }
          img {
            vertical-align: middle;
            width: 12px;
          }
          span {
            vertical-align: middle;
          }

        }
      }
      .info-right {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        div {
          flex: 1;
          text-align: center;
          max-width: 150px;

          &:not(:first-child) {
            border-left: 1px solid #E8E7E6;
          }
          p {
            height: 30px;
            line-height: 30px;
          }
          .right-title {
            font-size: 15px;
            color: #282b2d;
          }
          .right-count {
            font-size: 20px;
            color: #fe9b20;
          }
        }
      }
    }
  }

</style>

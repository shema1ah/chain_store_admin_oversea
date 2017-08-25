<template>
  <div class="storagebill">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>会员功能</span>
        <i class="icon-right_arrow"></i>
        <span>会员储值</span>
        <i class="icon-right_arrow"></i>
        <span>储值账单</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel-body">
        <el-table
          :data="storeData.data"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading">
          <el-table-column label="图像">
            <template scope="scope">
              <img v-if="scope.row.c_avatar" :src="scope.row.c_avatar" alt="" width="44" height="44" />
              <img src="./img/default.png" height="44" width="44" v-else />
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="name">
          </el-table-column>
          <el-table-column min-width="100" label="交易类型">
            <template scope="scope">{{ scope.row.biz_type | formatType }}</template>
          </el-table-column>
          <el-table-column min-width="150" label="交易时间" prop="sysdtm">
          </el-table-column>
          <el-table-column label="金额" min-width="150">
            <template scope="scope">{{ scope.row.txamt | formatCurrency }}元
              {{scope.row.status === 4?'(已撤销)':''}}
            </template>
          </el-table-column>
          <el-table-column min-width="150" label="交易门店" prop="shopname">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="storeData.count >= 10">
        <el-pagination
          ref="page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          :total="storeData.count"
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

  export default {
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        Object.assign(vm, {
          pageSize: 10,
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
        pageSize: 10,
        loading: false,
        currentPage: 1,
        storeData: {}
      };
    },

    computed: {
      basicParams() {
        return {
          curpage: this.currentPage,
          length: this.pageSize,
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
              this.storeData = data.data;
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
      handleSizeChange(size = 10) {
        this.pageSize = size;
        this.currentChange();
      }
    }
  };
</script>

<style lang="scss">

</style>

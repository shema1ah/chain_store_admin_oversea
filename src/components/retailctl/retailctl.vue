<template>
  <div class="redpacket">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>门店管理</span>
      </div>
      <div class="banner-btn" @click="associate">
        <i class="icon-create"></i>
        <span class="banner-btn__desc">关联门店</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-select-group">
            <span class="panel-header__desc">门店列表</span>
        </div>
      </div>
      <div class="panel-body">
        <el-table
          :data="pageShopData.list"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          >
          <el-table-column
            prop="shop_name"
            label="分店名称">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="登录账号">
          </el-table-column>
          <el-table-column
            prop="join_time"
            label="注册时间">
            <template scope="scope">{{ scope.row.join_time }}</template>
          </el-table-column>
          <el-table-column
            width="300"
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small" class="el-button__fix" @click="showDetail(scope)">查看详情</el-button>
              <el-button type="text" size="small" class="el-button__fix" @click="unbind(scope)">解绑此分店</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="pageShopData.count >= 10">
        <el-pagination
          layout="prev, pager, next"
          :total="pageShopData.count"
          @current-change="currentChange">
        </el-pagination>
      </div>
      <div class="table_placeholder" v-else></div>
    </div>
    <el-dialog v-model="isShowDetail" class="detail_dialog" title="门店详情">
      <el-row>
        <el-col :span="8" class="title">登录账号</el-col>
        <el-col :span="12" class="desc">{{ detailData['mobile'] }}</el-col>
      </el-row>
      <el-row class="">
        <el-col :span="8" class="title">店铺名称</el-col>
        <el-col :span="12" class="desc">{{ detailData['shopname'] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">地址</el-col>
        <el-col :span="12" class="desc">{{ detailData['address'] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">手机号</el-col>
        <el-col :span="12" class="desc">{{ detailData['mobile'] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">持卡人</el-col>
        <el-col :span="12" class="desc">{{ detailData['bankuser'] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">银行账户</el-col>
        <el-col :span="12" class="desc">{{ detailData['bankaccount'] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">银行名称</el-col>
        <el-col :span="14" class="desc">
          <div>{{ detailData['headbankname'] }}</div>
          <div>{{ detailData['bankname'] }}</div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';

  export default {
    data() {
      return {
        detailData: {},
        isShowDetail: false,
        loading: false,
        finalData: [],
        count: 0
      };
    },
    computed: {
      pageShopData() {
        return this.$store.state.pageShopData;
      }
    },
    created() {
      this.$store.dispatch('getPageShopData');
    },
    methods: {
      currentChange() {

      },
      associate() {
        this.$emit('associate');
      },
      unbind(scope) {
        this.$emit('unbind', scope.row.uid);
      },
      showDetail(scope) {
        axios.get(`${config.host}/merchant/info`, {
            params: {
              userid: scope.row.uid
            }
          })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.detailData = data.data;
              this.isShowDetail = true;
            } else {
              this.$message.error(data.respmsg);
            }
          })
          .catch(() => {
            this.$message.error('获取详情数据失败');
          });
      }
    }
  };
</script>

<style lang="scss">
  .el-button__fix:last-child {
    &::after {
      background-color: transparent;
    }
  }
</style>

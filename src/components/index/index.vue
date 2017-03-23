<template>
  <div class="index">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>首页概览</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">基本信息</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="info_wrapper">
          <div class="info">
            <div class="info__title">商户名称</div>
            <div class="info__sign">:</div>
            <div class="info__desc">{{ shop.shopname }}</div>
          </div>
          <div class="info">
            <div class="info__title">登录账号</div>
            <div class="info__sign">:</div>
            <div class="info__desc">{{ shop.mobile }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">门店列表</span>
          <div class="panel-header-btn__associate" @click="associate">
            <i class="icon-create"></i>
            <span>关联分店</span>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <el-table
          :data="pageShopData.list"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading.body="loading"
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
          :page-size="10"
          @current-change="currentChange">
        </el-pagination>
      </div>
      <div class="table_placeholder" v-else></div>
    </div>
    <el-dialog v-model="isShowDetail" class="detail_dialog" title="门店详情">
      <el-row>
        <el-col :span="6" class="title">登录账号</el-col>
        <el-col :span="10" class="desc">{{ detailData['mobile'] }}</el-col>
      </el-row>
      <el-row class="">
        <el-col :span="6" class="title">店铺名称</el-col>
        <el-col :span="10" class="desc">{{ detailData['shopname'] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">地址</el-col>
        <el-col :span="10" class="desc">{{ detailData['address'] }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="6" class="title">手机号</el-col>
        <el-col :span="10" class="desc">{{ detailData['mobile'] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">持卡人</el-col>
        <el-col :span="10" class="desc">{{ detailData['bankuser'] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">银行账户</el-col>
        <el-col :span="10" class="desc">{{ detailData['bankaccount'] }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">银行名称</el-col>
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
        loading: false,
        isShowDetail: false,
        detailData: {}
      };
    },
    props: {
      shop: {
        type: Object
      }
    },
    computed: {
      pageShopData() {
        return this.$store.state.pageShopData;
      }
    },
    methods: {
      currentChange(currentPage) {
        this.$store.dispatch({
          type: 'getPageShopData',
          start: currentPage - 1
        });
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
          });
      }
    }
  };
</script>

<style lang="scss">
  @import "../../common/scss/mixin.scss";

  .panel-header__desc {
    font-size: 18px;
    color: #FE9B20;
  }

  .panel-header__fix {
    padding-right: 15px;
  }

  .panel-select-group__justify {
    justify-content: space-between;
  }

  .panel-header-btn__associate{
    display: flex;
    width: 155px;
    height: 35px;
    box-sizing: border-box;
    padding: 0;
    background-color: #7ED321;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 3px;
    font-size: 17px;
    transition: .3s;
    color: #fff;
    cursor: pointer;
    .icon-create {
      margin-right: 10px;
      transition: .3s;
    }
    &:active {
      background-color: darken(#7ED321,10%);
    }
    @include boxShadow();
    &:hover {
      .icon-create {
        transform: rotateZ(90deg);
      }
    }
  }
  .info_wrapper {
    padding: 20px 0px 30px 5px;
    @at-root .info {
      display: flex;
      height: 28px;
      align-items: flex-end;
      &:first-child {
        margin-bottom: 18px;
      }
      @at-root .info__title {
        font-size: 20px;
        color: #262323;
      }
      @at-root .info__sign {
        margin: 0px 15px 0px 10px;
      }
      @at-root .info__desc {
        font-size: 15px;
        color: #98989E;
      }
    }
  }
  .table_placeholder {
    height: 50px;
  }

  .detail_dialog {
    .el-dialog {
      width: 580px;
    }
    .el-dialog__title {
      font-size: 20px;
    }
    .title {
      font-size: 16px;
      color: black;
    }
    .desc {
      color: black;
    }
  }
</style>

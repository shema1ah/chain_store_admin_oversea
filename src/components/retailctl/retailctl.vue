<template class="main">
  <div class="index">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>门店管理</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">基本信息</span>
          <div class="panel-header-btn" @click="changePass">修改密码</div>
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
    <el-dialog title="修改密码" :visible.sync="showChangePass" custom-class="mydialog pass" top="20%" :show-close="false">
      <el-form :model="form" :rules="formrules" ref="form">
        <el-form-item label="登录账号">
          <div>{{ shop.mobile }}</div>
        </el-form-item>
        <div class="yanz">
          <el-form-item label="验证码" prop="code">
            <el-input v-model="form.code" size="small" type="number" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <div v-if="isSendCode" class="panel-header-btn panel-header-btn__fill" @click="getCode">获取验证码</div>
          <div v-else class="panel-header-btn panel-header-btn__fill" style="cursor: not-allowed">{{ buttonCotent }}</div>
        </div>
        <el-form-item label="输入新密码" prop="pass">
          <el-input v-model="form.pass" size="small" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="repass">
          <el-input v-model="form.repass" size="small" type="password" placeholder="请输入确认新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div @click="showChangePass = false" class="cancel">取消</div>
        <div @click="showChangePass = false" class="submit">
          <span class="el-icon-loading" v-if="iconShow"></span>
          <span v-else>确定</span>
        </div>
      </div>
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
        iconShow: false,
        isShowDetail: false,
        showChangePass: false,
        detailData: {},
        isSendCode: true,
        buttonCotent: '',
        form: {
          name: '',
          code: '',
          pass: '',
          repass: ''
        },
        formrules: {
          code: [
            { required: true, message: '请输入验证码' }
          ],
          pass: [
            { required: true, message: '请输入新密码' },
            { max: 20, min: 6, message: '请输入6~20位字符' }
          ],
          repass: [
            { required: true, message: '请输入确认新密码' },
            { max: 20, min: 6, message: '请输入6~20位字符' }
          ]
        }
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
    created() {
      this.$store.dispatch('getPageShopData');
    },
    watch: {
      'showChangePass': function(val) {
        if(!val) {
          setTimeout(() => {
            this.stopTimer();
          }, 200);
        }
      }
    },

    methods: {
      // 修改密码
      changePass() {
        this.showChangePass = true;
      },

      // 获取验证码
      getCode() {
        this.isSendCode = false;
        this.startTimer();
      },

      // 计时
      startTimer() {
        let num = 60;
        this.buttonCotent = num + 's';
        this.st = setInterval(() => {
            num--;
        if (num) {
          this.buttonCotent = num + 's';
        } else {
          this.stopTimer();
        }
      }, 1000);
      },

      // 停止计时
      stopTimer() {
        this.isSendCode = true;
        clearTimeout(this.st);
      },

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
  .main {
    .panel-header-btn {
      width: 155px;
    }
    .pass {
      width: 420px;
      .el-dialog__header {
        text-align: center;
      }
      .el-form-item__label {
        width: 90px;
      }
    }
  }
</style>

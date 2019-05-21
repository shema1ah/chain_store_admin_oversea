<template>
  <div class="surcharge">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$t('setting.crumbs.L1')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('nav.surcharge')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="btn-wrap">
        <div class="banner-btn" @click="addSurcharge()">
          <i class="icon-create"></i>
          <span class="banner-btn__desc">{{ $t('setting.crumbs.L4') }}</span>
        </div>
      </div>
    </div>
    <div class="panel down">
      <div class="panel-header panel-header__auto">
        <el-form :model="form" ref="form">
          <div class="panel-select-group">
            <div class="panel-select__wrapper">
              <span class="panel-desc">{{$t('setting.panel.merchant')}}</span>
              <el-form-item prop="merchant">
                <el-input v-model="form.merchant" type="text" :placeholder="$t('setting.msg.m12')" size="small"></el-input>
              </el-form-item>
            </div>
            <div class="panel-header-btn-group">
              <div class="panel-header-btn panel-header-btn__fill" @click="search">
                <span class="el-icon-loading" v-if="loading"></span>
                <span v-else>{{$t('setting.btn.query')}}</span>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="panel-body">
        <el-table
          :data="surchargeData.list"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading">
          <el-table-column prop="ctime" :label="$t('setting.table.createTime')" min-width="120"></el-table-column>
          <el-table-column prop="shopname" :label="$t('setting.table.subName')"></el-table-column>
          <el-table-column prop="username" :label="$t('setting.panel.merchant')"></el-table-column>
          <el-table-column :label="$t('setting.table.rate')" min-width="120">
            <template slot-scope="scope">
              <div v-for="item in scope.row.rates">{{ `${item.name} / ${item.value}%` }}</div>
            </template>
          </el-table-column>

          <el-table-column :label="$t('tradeMng.table.op')">
            <template slot-scope="scope">
              <el-button type="text" size="small" class="el-button__fix" @click="addSurcharge(scope.row)">{{$t('common.edit')}}</el-button>
              <el-button type="text" size="small" class="el-button__fix" @click="del(scope.row.id)">{{$t('common.del')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="surchargeData.count >= 10">
        <el-pagination
          ref="page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          :total="surchargeData.count"
          @current-change="currentChange"
          :current-page="currentPage">
        </el-pagination>
      </div>
      <div class="table_placeholder" v-else></div>
    </div>

    <el-dialog :title="$t('setting.dialog.d3')" :visible.sync="showConfirm" :custom-class="(lang === 'ja' || lang === 'en')?'mydialog haiwiadialog':'mydialog'" top="20%" @close="handleClose('formpwd')">
      <el-form :model="formpwd" :rules="pwdRules" ref="formpwd" :label-width="(lang === 'ja' || lang === 'en') ? '110px' : '80px'">
        <el-form-item prop="pwd" :label="role.passState ? $t('refundCheck.msg.m1') : $t('tradeMng.dialog.d5')">
          <el-input v-model.trim="formpwd.pwd" :placeholder="role.passState ? $t('refundCheck.msg.m2') :$t('tradeMng.msg.m9') " auto-complete="new-password" type="password" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <div @click="checkPwd" class="submit">
          <span class="el-icon-loading" v-if="iconLoading"></span>
          <span v-else>{{$t('common.confirm')}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import Store from '../../common/js/store';

  export default {
    data() {
      let checkPass = (rule, val, cb) => {
        if(!val) {
          if(this.role.passState) {
            cb(this.$t('refundCheck.msg.m2'));
          }else {
            cb(this.$t('tradeMng.msg.m9'));
          }
        } else {
          cb();
        }
      };

      return {
        role: Store.get('role') || {},
        lang: config.lang,
        pageSize: 10,
        currentPage: 1,
        chargeId: null,
        loading: false,
        iconLoading: false,
        showConfirm: false,
        form: {
          merchant: ''
        },
        surchargeData: {},

        formpwd: {
          pwd: ''
        },

        pwdRules: {
          pwd: [
            { max: 20, min: 6, message: this.$t('cashMng.common.m10') },
            { validator: checkPass }
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
      basicParams() {
        return {
          username: this.form.merchant,
          page: this.currentPage,
          maxnum: this.pageSize,
          format: 'cors'
        };
      }
    },

    created() {
      this.getSurchargeData();
    },

    methods: {
      handleClose(form) {
        this.$refs[form].resetFields();
      },

      // 添加附加费,编辑附加费
      addSurcharge(val) {
        if(val) {
          Store.set('surChange', val);
          this.$router.push({
            name: 'addSurcharge',
            query: {
              id: val.id
            }
          })
        }else {
          this.$router.push({name: 'addSurcharge'});
        }

      },

      onEnter() {
        this.checkPwd();
      },

      // 删除
      del(id) {
        this.chargeId = id;
        this.showConfirm = true;
      },

      // 确认弹框验证密码
      checkPwd() {
        this.$refs['formpwd'].validate((valid) => {
          if (valid && !this.iconLoading) {
            this.iconLoading = true;
            let params = {
              password: this.formpwd.pwd,
              format: 'cors'
            };
            if(this.role.passState) {
              Object.assign(params, {
                mode: 'manage'
              })
            }
            axios.post(`${config.host}/merchant/validate_password`, params).then((res) => {
              let data = res.data;
              if (data.data.result === 'success') {
                this.deleteSurcharge();
              } else {
                this.iconLoading = false;
                this.$message.error(this.$t('tradeMng.msg.m10'));
              }
            }).catch(() => {
              this.showConfirm = false;
              this.iconLoading = false;
              this.$message.error(this.$t('common.netError'));
            })
          }

        })
      },

      // 删除附加费
      deleteSurcharge() {
        axios.post(`${config.host}/merchant/user/remove/surcharge`, {
          id: this.chargeId,
          state: 0,
          format: 'cors'
        }).then((res) => {
          let data = res.data;
          this.showConfirm = false;
          this.iconLoading = false;
          if (data.respcd === config.code.OK) {
            this.$message.success(this.$t('setting.msg.m13'));
            this.handleSizeChange();
          } else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {
          this.showConfirm = false;
          this.iconLoading = false;
          this.$message.error(this.$t('common.netError'));
        })
      },

      // 点击查询
      search() {
        this.handleSizeChange();
      },

      // 获取数据
      getSurchargeData() {
        if(!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/merchant/user/surcharges`, {
            params: this.basicParams
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.surchargeData = data.data;
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('common.netError'));
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

        this.getSurchargeData();
      },

      handleSizeChange(size = 10) {
        this.pageSize = size;
        this.currentChange();
      },

    }
  };
</script>

<style lang="scss">
.surcharge {
  .banner-btn {
    width: auto;
  }
  .panel-desc {
    margin-right: 15px;
  }
}
</style>

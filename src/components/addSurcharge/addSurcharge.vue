<template>
  <div class="addSurcharge">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$t('setting.crumbs.L1')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/main/surchargeSetting' }" replace>{{$t('nav.surcharge')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{id ? $t('setting.crumbs.L5') : $t('setting.crumbs.L4')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">{{id ? $t('setting.crumbs.L5') : $t('setting.crumbs.L4')}}</span>
          <el-button type="text" @click="backList"><i class="el-icon-close"></i>{{ $t('common.close') }}</el-button>
        </div>
      </div>

      <div class="panel-body" v-loading="loading">
        <!--新建第一步-->
        <el-form v-if="first" label-position="left" class="down-sub-shop" :model="surcharge" ref="surcharge">
          <div class="desc" v-if="shopData.count > 0">
          {{ $t('setting.tip.m4') }}
          </div>
          <div class="desc explain-desc" v-if="shopData.count === 0">
            {{ $t('setting.tip.m3') }}
          </div>
          <el-form-item prop="shop" v-if="shopData.count > 0">
            <el-checkbox-group v-model="surcharge.shop" @change="handleCheckedShopChange">
              <el-checkbox v-for="item in shopData.list" :label="item.uid" :key="item.uid">{{ item.shop_name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>

        <!--编辑或下一步-->
        <el-form v-if="!first" label-position="left" class="down-sub-shop" :model="rates" :rules="ratesRules" ref="rates">
          <div class="desc">
            {{ $t('setting.tip.m2') }}
          </div>
          <div>
            <el-form-item v-for="item in role.trade_type" :prop="item.value" :label="item.name" :key="item.value">
              <el-input v-model="rates[item.value]" type="text" size="small">
              </el-input>
              <span>%</span>
            </el-form-item>
          </div>
        </el-form>

        <div class="btn-group" v-if="shopData.count > 0 || id">
          <el-checkbox v-if="first" v-model="surcharge.checkAll" @change="handleCheckAllChange">{{$t('setting.tip.all')}}</el-checkbox>
          <div class="panel-btn__download panel-header-btn" @click="previous">
            <span>{{ (first || id) ? $t('common.cancel') : $t('common.previous') }}</span>
          </div>
          <div class="panel-btn__download panel-btn__download_detail" @click="next">
            <span>{{ first ? $t('common.next') : $t('common.submit') }}</span>
          </div>
        </div>
      </div>
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
        id: null,
        first: true,
        loading: false,
        shopData: {},
        allType: [],
        iconLoading: false,
        showConfirm: false,
        surcharge: {
          shop: [],
          checkAll: false,
        },
        rates: {},
        formpwd: {
          pwd: ''
        },
        ratesRules: {

        },
        pwdRules: {
          pwd: [
            { max: 20, min: 6, message: this.$t('cashMng.common.m10') },
            { validator: checkPass }
          ]
        }
      };
    },

    created() {
      this.id = this.$route.query.id;
      if(!this.id) {
        this.getShopList();
      }else {
        this.first = false;
      }
    },

    mounted() {
      // 动态添加表单规则
      this.addRyles();
    },

    methods: {
      // 动态添加表单规则
      addRyles() {
        let [list, lists, rules] = [[], {}, {}];
        let checkValue = (rule, val, cb) => {
          if(/^([1-9]{1}[0-9]?|0|100(\.[0]{1,2})?|([0-9]{1}[0-9]?\.\d{1,2}))$/.test(val)) {
            cb();
          }else {
            cb(this.$t('setting.msg.m14'));
          }
        };

        // 编辑
        if(this.id) {
          list = (Store.get('surChange') || {}).rates || [];
          for(let item of list) {
            lists[item.key] = item.value;
            rules[item.key] = [
              { validator: checkValue }
            ]
          }
        }else {
          // 新建
          list = this.role.trade_type;
          for(let item of list) {
            lists[item.value] = 0;
            rules[item.value] = [
              { validator: checkValue }
            ]
          }
        }

        this.rates = lists;
        this.ratesRules = rules;
      },

      // 上一步
      previous() {
        if(this.id || this.first) {
          this.$router.replace({name: 'surchargeSetting'});
        }else {
          this.first = true;
        }
      },

      // 下一步
      next() {
        if(this.first) {
          this.checkShop();
        }else {
          this.$refs['rates'].validate((valid) => {
            if(valid) {
              this.showConfirm = true;
            }
          })
        }
      },

      // 返回到列表
      backList() {
        this.$router.replace({name: 'surchargeSetting'});
      },

      // 门店至少选择一个
      checkShop() {
        if(this.surcharge.shop.length > 0) {
          this.first = false;
        }else {
          this.$message.error(this.$t('setting.tip.nullTip'));
        }
      },

      // 获取未设置费率商户
      getShopList() {
        if(!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/merchant/user/list?format=cors`).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.shopData = data.data;

              this.allType = this.getAllType();
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('common.netError'));
          });
        }
      },

      // 获取全部
      getAllType() {
        let type = this.shopData.list || [];
        let list = [];
        if(type.length > 0) {
          for(let val of type) {
            val.uid && list.push(val.uid);
          }
        }
        return list;
      },

      // 选择门店
      handleCheckedShopChange(value) {
        let checkCount = value.length;
        this.surcharge.checkAll = checkCount === this.allType.length;
      },

      // 选择全部
      handleCheckAllChange(event) {
        this.surcharge.shop = event.target.checked ? this.allType : [];
      },

      handleClose(form) {
        this.$refs[form].resetFields();
      },

      onEnter() {
        this.checkPwd();
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
                this.submitSurcharge();
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

      // 提交附加费
      submitSurcharge() {
        let params = {
          rates: JSON.stringify(this.rates),
          format: 'cors',
        }
        if(this.id) {
          Object.assign(params, {
            type: 'edit',
            id: this.id
          })
        }else {
          Object.assign(params, {
            type: 'add',
            uids: this.surcharge.shop.join(',')
          })
        }
        axios.post(`${config.host}/merchant/user/edit/surcharge`, params).then((res) => {
          let data = res.data;
          this.showConfirm = false;
          this.iconLoading = false;
          if (data.respcd === config.code.OK) {
            this.$message.success(this.$t('refundCheck.msg.m3'));

            // 跳转列表页
            this.$router.replace({name: 'surchargeSetting'});
          } else {
            this.$message.error(data.resperr);
          }
        }).catch(() => {
          this.showConfirm = false;
          this.iconLoading = false;
          this.$message.error(this.$t('common.netError'));
        })
      },
    }
  };
</script>

<style lang="scss">
.addSurcharge {
  .el-button--text {
    font-size: 16px;
    i {
      font-size: 14px;
      padding-right: 10px;
    }
  }
  .desc {
    color: #262424;
    font-size: 20px;
  }
  .btn-group {
    display: flex;
    align-items: center;
    padding: 20px 0;
    .el-checkbox {
      padding-right: 26px;
    }
    .panel-header-btn {
      margin-right: 20px;
    }
  }
  .desc {
    text-align: left;
    padding: 10px 0;
    margin-bottom: 30px;
  }
  .explain-desc {
    color: #ff4949;
  }
  .panel-body {
    padding-left: 15px;
    .el-form-item {
      margin-bottom: 26px;
    }
    .el-form-item__label {
      width: 150px;
      color: #262424;
      font-size: 16px;
    }
    .el-form-item__content {
      display: inline-block;
      width: 220px;
    }
    .el-input {
      display: inline-block;
      width: 200px;
      font-size: 16px;
    }
  }
}
</style>

<template>
 <div class="transPreAuth">

    <!-- 面包屑start -->
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$t('preAuth.message.m5')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑end -->

    <!-- 主体内容start -->
    <div class="panel down">

      <!-- 查询条件start -->
      <div class="panel-header panel-header__auto">
        <el-form :model="form" :rules="formrules" ref="form">
          <!-- 时间start -->
          <div class="panel-select-group">
          <!-- 时间组件start -->
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">{{$t('tradeMng.panel.time')}}</span>
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
          <!-- 时间组件end -->
          <!-- 时间区间按钮start -->
            <div class="panel-select__wrapper">
              <el-form-item prop="choosetime">
                <el-radio-group v-model="form.choosetime" @change="changeTime">
                  <el-radio-button v-for="item in choosetimes" :label="item.value" :key="item.value">{{ item.name }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
          <!-- 时间区间按钮end -->
          </div>
          <!-- 时间end -->


          <!-- 店铺名称和收银员start -->
          <div class="panel-select-group">
            <div class="panel-select__wrapper" v-if="!role.single">
              <span class="panel-select__desc">{{$t('tradeMng.panel.shopName')}}</span>
              <el-form-item prop="selectShopUid">
                <el-select v-model="form.selectShopUid" :placeholder="$t('common.all')" size="small" @change="getOperators(form.selectShopUid)">
                  <el-option v-for="shop in shopData.list" :label="shop.shop_name" :value="shop.uid" :key="shop.uid">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="panel-select__wrapper" v-if="!role.isCashier">
              <span class="panel-select__desc">{{$t('tradeMng.panel.operator')}}</span>
              <el-form-item prop="operaValue">
                <el-select v-model="form.operaValue" :placeholder="$t('tradeMng.table.all')" size="small" @change="operaChange" :disabled="form.selectShopUid === ''">
                  <el-option :label="$t('tradeMng.table.all')" value=""></el-option>
                  <el-option :label="$t('tradeMng.table.main')" value="vl"></el-option>
                  <el-option v-for="(label, value) in operaList" :label="label" :value="value" :key="value"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <!-- 店铺名称和收银员end -->

          <!-- 收款方式start -->
          <div class="panel-select-group" v-if="typeList.length > 0">
            <div class="panel-select__wrapper">
              <span class="panel-select__desc">{{$t('tradeMng.table.colWay')}}</span>
              <!-- <el-form-item prop="checkAll1">
                <el-checkbox v-model="form.checkAll1" @change="handleCheckAllChange1">{{$t('tradeMng.panel.noLimit')}}</el-checkbox>
              </el-form-item>
              <el-form-item prop="type">
                <el-checkbox-group v-model="form.type" @change="handleCheckedCitiesChange1">
                  <el-checkbox v-for="item in typeList" :label="item.value" :key="item.value">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item> -->
              <el-form-item prop="checkAll1">
                  <el-checkbox v-model="form.checkAll1" @change="handleCheck">{{ $t('preAuth.message.m32') }}</el-checkbox>
              </el-form-item>
            </div>
          </div>
          <!-- 收款方式end -->


          <!-- 订单号和查询按钮start -->
          <div class="panel-select-group">
            <div class="panel-select__wrapper orderno_nowrap">
              <span class="panel-select__desc">{{$t('tradeMng.panel.sNum')}}</span>
              <el-form-item prop="orderno">
                <el-input v-model="form.orderno" type="number" :placeholder="$t('tradeMng.msg.m8')" size="small" class="panel-select-input__fix panel-select-input-220"></el-input>
              </el-form-item>
            </div>
            <div class="panel-header-btn-group">
              <div class="panel-header-btn panel-header-btn__fill" @click="search">
                <span class="el-icon-loading" v-if="loading"></span>
                <span v-else>{{$t('tradeMng.panel.btn.query')}}</span>
              </div>
              <div class="panel-header-btn transctl-btn" @click="reset('form')">{{$t('tradeMng.panel.btn.reset')}}</div>
            </div>
          </div>
          <!-- 订单号和查询按钮end -->
        </el-form>
      </div>
      <!-- 查询条件end -->

      <!-- 数据统计和table start -->
      <div class="panel-body">
        <!-- 数据统计和下载start -->
        <div class="panel-btn-group__wrapper panel-body-btn-group flex-normal">
          <div class="num_total">
            <div class="num_wrapper">
              <p class="num-title">{{$t('preAuth.message.m11')}}</p>
              <p class="num-desc">{{ transData.froze_amt | formatNumber }} {{ role.currency }}</p>
            </div>
            <div class="num_wrapper">
              <p class="num-title">{{$t('preAuth.message.m12')}}</p>
              <p class="num-desc">{{ transData.froze_num || 0 }}</p>
            </div>
            <div class="num_wrapper">
              <p class="num-title">{{$t('preAuth.message.m3')}}</p>
              <p class="num-desc">{{ transData.sucamt | formatNumber }} {{ role.currency }}</p>
            </div>
            <div class="num_wrapper">
              <p class="num-title">{{$t('preAuth.message.m4')}}</p>
              <p class="num-default">{{ transData.sucnum || 0 }}</p>
            </div>
          </div>
          <div class="a-wrapper">
            <el-dropdown>
              <span class="el-dropdown-link"><img src="./img/download.png" alt="download"></span>
              <el-dropdown-menu slot="dropdown">
                <a :href="detailHref" download><el-dropdown-item command=1>{{$t('preAuth.message.m31')}}</el-dropdown-item></a>
                <!-- <a :href="separateHref" download><el-dropdown-item command=2>{{$t('tradeMng.table.btn.downTrade')}}</el-dropdown-item></a> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <!-- 数据统计和下载end -->


        <!-- 表格start -->
        <el-table
          :data="transData.data"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading">


          <!-- 创建时间 -->
          <el-table-column
          :label="$t('preAuth.message.m13')" min-width="130">
            <template slot-scope="scope">
              <div>{{ scope.row.sysdtm }}</div>
            </template>
          </el-table-column>

          <!-- 店铺名称 -->
          <el-table-column
            :label="$t('tradeMng.table.shopName')" width="110">
            <template slot-scope="scope">
              <div>{{ scope.row.username }}</div>
            </template>
          </el-table-column>

          <!-- 收银员 -->
          <el-table-column
            :label="$t('tradeMng.table.operator')" width="100">
            <template slot-scope="scope">
              <div>{{ scope.row.opuser || '-' }}</div>
            </template>
          </el-table-column>


          <!-- 订单类型 -->
          <el-table-column
          :label="$t('preAuth.message.m14')" width="120">
            <template slot-scope="scope">
              <div>{{ scope.row.busicd_info}}</div>
            </template>
          </el-table-column>

          <!-- 业务订单号 -->
          <el-table-column
          :label="$t('preAuth.message.m15')" min-width="180">
            <template slot-scope="scope">
              <div>{{ scope.row.chnlsn}}</div>
            </template>
          </el-table-column>

          <!-- 订单金额 -->
          <el-table-column
          :label="$t('preAuth.message.m16')" min-width="100">
            <template slot-scope="scope">
              <div>{{ scope.row.total_amt | formatNumber}}</div>
            </template>
          </el-table-column>


          <!-- 订单状态 -->
          <el-table-column
          :label="$t('preAuth.message.m17')" min-width="80">
            <template slot-scope="scope">
              <div>{{ scope.row.status_str }}</div>
            </template>
          </el-table-column>

          <!-- 订单流水号 -->
          <el-table-column
          :label="$t('preAuth.message.m18')" min-width="180">
            <template slot-scope="scope">
              <div>{{ scope.row.origssn ? scope.row.syssn + '(' + $t('tradeMng.detail.syssn2') + ':' + scope.row.origssn + ')' : scope.row.syssn }}</div>
            </template>
          </el-table-column>

          <!-- 扣款金额 -->
          <el-table-column
            :label="$t('preAuth.message.m19')" width="110">
            <template slot-scope="scope">
              <div>{{ scope.row.trade_txamt | formatNumber}}</div>
            </template>
          </el-table-column>


          <!-- 操作 -->
          <el-table-column
          :label="$t('tradeMng.table.op')" fixed="right" min-width="200" >
            <template slot-scope="scope">
              <el-button type="text" size="small" class="el-button__fix" @click.native="detail(scope.row)">{{$t('tradeMng.table.detail')}}</el-button>
              <el-button type="text" size="small" class="el-button__fix" :disabled="!scope.row.allow_refund_amt"  @click="confirm(scope.row)">{{$t('preAuth.message.m7')}}</el-button>
              <el-button type="text" size="small" class="el-button__fix" :disabled="!scope.row.allow_refund_amt"  @click="confirmA(scope.row)">{{$t('preAuth.message.m8')}}</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 表格end -->

      </div>
      <!-- 数据统计和table end -->

      <!-- 分页start -->
      <div class="pagination_wrapper" v-if="transData.num >= 10">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          :total="transData.num"
          @current-change="currentChange"
          :current-page="currentPage">
        </el-pagination>
      </div>
      <div class="table_placeholder" v-else></div>
      <!-- 分页end -->
    </div>
    <!-- 主体内容end -->

    <!-- 扣款对话框start -->
    <el-dialog :title="$t('preAuth.message.m10')" :visible.sync="showConfirm" custom-class="mydialog" top="20%" @close="handleClose('formpwd')">
      <div style="margin-bottom: 20px;">{{$t('tradeMng.dialog.d1')}}</div>
      <el-form :model="formpwd" :rules="pwdrules" ref="formpwd" :label-width="(lang === 'ja' || lang === 'en') ? '110px' : '80px'" autocomplete="off">
        <el-form-item :label="$t('tradeMng.panel.sNum')">
          <span>{{ refundData.syssn }}</span>
        </el-form-item>
        <el-form-item prop="amount" :label="$t('preAuth.message.m3')" class="amount">
          <span>{{ role.currency }}</span>
          <el-input name="amount" class="showAmount" v-model="formpwd.amount" :placeholder="$t('preAuth.message.m20') + ' ' + refundAmount" type="number" @keyup.enter.native="onEnter"></el-input>
        </el-form-item>
        <el-form-item prop="pwd" :label="$t('tradeMng.dialog.d5')">
          <el-input v-model="formpwd.pwd" :placeholder="$t('tradeMng.msg.m9')" auto-complete="new-password" type="password" @keyup.enter.native="onEnter"></el-input>
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
    <!-- 扣款对话框end -->


    <!-- 解冻对话框start -->
    <el-dialog :title="$t('preAuth.message.m28')" :visible.sync="showConfirmA" custom-class="mydialog" top="20%" @close="handleClose('formpwdA')">
      <div style="margin-bottom: 20px;">{{$t('tradeMng.dialog.d1')}}</div>
      <el-form :model="formpwdA" :rules="pwdrulesA" ref="formpwdA" :label-width="(lang === 'ja' || lang === 'en') ? '110px' : '80px'" autocomplete="off">
        <el-form-item prop="pwdA" :label="$t('tradeMng.dialog.d5')">
          <el-input v-model="formpwdA.pwdA" :placeholder="$t('tradeMng.msg.m9')" auto-complete="new-password" type="password" @keyup.enter.native="onEnterA"></el-input>
        </el-form-item>
      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <div @click="checkPwdA" class="submit">
          <span class="el-icon-loading" v-if="iconLoadingA"></span>
          <span v-else>{{$t('common.confirm')}}</span>
        </div>
      </div>
    </el-dialog>
    <!-- 扣款对话框end -->





 </div>
</template>

<script>
 import axios from 'axios';
 import config from 'config';
 import qs from 'qs';
 import {formatDate, formatData} from '../../common/js/util';
 import Store from '../../common/js/store';
 export default {
   props: {
      shop: {
        type: Object
      }
    },
   data () {
      let checkOrderNo = (rule, val, cb) => {
        if(val && !/^\d+$/.test(val)) {
          cb(this.$t('tradeMng.msg.m1'));
        } else if(val && !/\d{14}/.test(val)) {
          cb(this.$t('tradeMng.msg.m2'));
        } else {
          cb();
        }
      };
      let checkAmount = (rule, val, cb) => {
        if(+val === 0) {
          cb(this.$t('preAuth.message.m21'));
        }else if(+val > +this.refundAmount) {
          cb(this.$t('preAuth.message.m22'));
        } else {
          cb();
        }
      };
     return {
        lang: config.lang,
        role: Store.get('role') || {},
        operaList: {},
        refundData: {},
        refundDataA: {},
        showConfirm: false,
        showConfirmA: false,
        refundAmount: 0,
        formpwd: {
          amount: null,
          pwd: ''
        },
        formpwdA: {
          pwdA: ''
        },
        loading: false,
        iconLoading: false,
        iconLoadingA: false,
        status: false,
        form: {
          selectShopUid: '',
          orderno: null,
          dateRangeValue: '',
          operaValue: '',
          checkAll1: true,
          checkAll2: true,
          choosetime: '1',
          type: []
        },
        choosetimes: [
          {'name': this.$t('tradeMng.panel.today'), 'value': '1'},
          {'name': this.$t('tradeMng.panel.yestoday'), 'value': '2'},
          {'name': this.$t('tradeMng.panel.near7'), 'value': '7'},
          {'name': this.$t('tradeMng.panel.near30'), 'value': '30'}
        ],
        formrules: {
          orderno: [
            { validator: checkOrderNo, trigger: 'change,blur' }
          ]
        },
        pwdrules: {
            pwd: [
              { required: true, message: this.$t('tradeMng.msg.m9') }
            ],
          amount: [
            { required: true, message: this.$t('preAuth.message.m21') },
            { validator: checkAmount, trigger: 'change,blur' }
          ]
        },
        pwdrulesA: {
            pwdA: [
              { required: true, message: this.$t('tradeMng.msg.m9') }
            ]
        },
        transData: {},
        currentPage: 1,
        pageSize: 10
     }
   },
   mounted() {

   },
   watch: {
     'form.dateRangeValue': function(val) {
        if(!this.status) {
          this.form.choosetime = '';
        }
        this.status = false;
      },
      'formpwd.amount': function(val, old) {
        if(val) {
          if(this.role.point) {
            if(!/^\d+(\.\d{0,2})?$/.test(val)) {
              setTimeout(() => {
                this.formpwd.amount = old;
              }, 10);
            }
          }else {
            if(!/^\d+$/.test(val)) {
              setTimeout(() => {
                this.formpwd.amount = old;
              }, 10);
            }
          }
        }
      }
   },
   created() {
     this.changeTime('1');
     if(this.role.single) {
        this.form.selectShopUid = this.shop.uid;
        this.getOperators(this.shop.uid);
     };
     this.getTransData();
   },
   methods: {
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
      // 查询收银员列表
      getOperators(uid) {
        this.form.operaValue = '';
        axios.get(`${config.host}/merchant/sub/opusers`, {
            params: {
              userid: uid,
              format: 'cors'
            }
          }).then((res) => {
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.operaList = data.data;
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.$message.error(this.$t('tradeMng.msg.m5'));
          });
      },
      operaChange(opuid) {
        this.basicParams.opuid = opuid;
      },
      handleCheck(event) {
        this.form.checkAll1 = true;
      },
      handleCheckAllChange1(event) {
        console.log(event.target.checked);
        this.form.type = event.target.checked ? [] : this.allType;
      },
      handleCheckedCitiesChange1(value) {
        console.log(value);
        let checkCount = value.length;
        this.form.checkAll1 = !(checkCount > 0);
      },
      // 重置表单
      reset(formName) {
        this.status = true;
        this.$refs[formName].resetFields();
      },
      // 获取数据
      getTransData() {
        if(!this.loading) {
          this.loading = true;
          axios.get(`${config.host}/merchant/trade/preauth/info`, {
            params: this.basicParams
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.transData = data.data;
            } else {
              this.$message.error(data.resperr);
            }
          }).catch(() => {
            this.loading = false;
            this.$message.error(this.$t('tradeMng.msg.m4'));
          });
        }
      },
      // 行样式
      getStyle(row, index) {
        if(row.allow_refund_amt === 0 && !row.is_refund) {
          return 'trans-refund';
        }
        return '';
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

        this.getTransData();
      },
      // 改变页面展示条数
      handleSizeChange(size = 10) {
        this.pageSize = size;
        this.currentChange();
      },
      // 点击查询
      search() {
        this.handleSizeChange();
      },
      // 跳转详情
      detail(item) {
        this.$router.push({ path: '/main/preAuth/preAuthDetail',
        query: {
          sysdtm: encodeURI(item.sysdtm),
          username: encodeURI(item.username),
          opuser: encodeURI(item.opuser),
          busicdInfo: encodeURI(item.busicd_info),
          chnlsn: encodeURI(item.chnlsn),
          totalAmt: encodeURI(item.total_amt),
          statusStr: encodeURI(item.status_str),
          origssn: encodeURI(item.origssn),
          syssn: encodeURI(item.syssn),
          tradeTxamt: encodeURI(item.trade_txamt)
        }});
      },
      // 扣款
      confirm(val) {
        // 如果有小数点，就显示小数点
        if(this.role.point) {
          this.formpwd.amount = formatData(val.total_amt, 1 / this.role.rate);
          let v = this.formpwd.amount + '';
          if(v.includes('.')) {
            let p = v.split('.')[1].padEnd(2, 0);
            this.refundAmount = v.split('.')[0] + '.' + p;
          }else {
            let arr = '0';
            arr = arr.padEnd(2, 0);
            this.refundAmount = v + '.' + arr;
          }

        }else {
          this.refundAmount = this.formpwd.amount = formatData(val.total_amt, 1 / this.role.rate);
        }
        this.refundData = val;
        if(this.role.isCashier) {
          this.showConfirm = false;
        }else {
          this.showConfirm = true;
        }
      },
      // 关闭弹出层
      handleClose(form) {
        this.$refs[form] && this.$refs[form].resetFields();
      },
      // 点击enter键提交
      onEnter() {
        this.checkPwd();
      },
      // 扣款验证二次输入密码
      checkPwd() {
        this.$refs['formpwd'].validate((valid) => {
          if (valid && !this.iconLoading) {
            this.iconLoading = true;
            axios.post(`${config.host}/merchant/validate_password`, {
              password: this.formpwd.pwd,
              format: 'cors'
            }).then((res) => {
              let data = res.data;
              if (data.data.result === 'success') {
                this.deduction();
              } else {
                this.iconLoading = false;
                this.$message.error(this.$t('tradeMng.msg.m10'));
              }
            }).catch(() => {
              this.iconLoading = false;
              this.$message.error(this.$t('common.netError'));
            })
          }

        })
      },
      // 调用扣款接口
      deduction() {
        let val = this.refundData;
        let params = {
          format: 'cors',
          txamt: formatData(this.formpwd.amount, this.role.rate),
          txdtm: formatDate(val.sysdtm, 'yyyy-MM-dd HH:mm:ss'),
          syssn: val.syssn,
          out_trade_no: Date.now(),
          udid: 'bigmerchant'
        };
        axios.post(`${config.payHost}/trade/v1/authtrade`, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.iconLoading = false;
          this.showConfirm = false;
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.$message({
              type: 'success',
              message: this.$t('preAuth.message.m23')
            });
            this.getTransData();
          }
        }).catch((res) => {
          this.iconLoading = false;
          this.$message.error(this.$t('preAuth.message.m27'));
        });
      },
      // 点击enter键提交
      onEnterA() {
        this.checkPwdA();
      },
      // 解冻验证二次输入密码
      checkPwdA() {
            this.iconLoadingA = true;
            axios.post(`${config.host}/merchant/validate_password`, {
              password: this.formpwdA.pwdA,
              format: 'cors'
            }).then((res) => {
              let data = res.data;
              if (data.data.result === 'success') {
                this.unfreeze();
              } else {
                this.iconLoadingA = false;
                this.$message.error(this.$t('tradeMng.msg.m10'));
              }
            }).catch(() => {
              this.iconLoadingA = false;
              this.$message.error(this.$t('common.netError'));
            })
      },
      // 调用解冻接口
      unfreeze() {
        let val = this.refundDataA;
        let params = {
          format: 'cors',
          txamt: val.total_amt,
          txdtm: formatDate(val.sysdtm, 'yyyy-MM-dd HH:mm:ss'),
          syssn: val.syssn,
          out_trade_no: Date.now(),
          udid: 'bigmerchant'
        };
        axios.post(`${config.payHost}/trade/v1/refund`, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((res) => {
          this.iconLoadingA = false;
          this.showConfirmA = false;
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.$message({
              type: 'success',
              message: this.$t('preAuth.message.m29')
            });
            this.getTransData();
          }
        }).catch((res) => {
          this.iconLoadingA = false;
          this.$message.error(this.$t('preAuth.message.m30'));
        });
      },
      // 解冻按钮
      confirmA(val) {
        this.refundDataA = val;
        this.showConfirmA = true;
      }
   },
   computed: {
      detailHref() {
        let detailParmas = Object.assign({}, this.basicParams, {isdownload: true});
        return `${config.host}/merchant/trade/preauth/info?${qs.stringify(detailParmas)}`;
      },
      shopData() {
        return this.$store.state.shopData;
      },
      allType() {
        let type = this.shop.preauth_trade_type || [];
        let list = [];
        if(type.length > 0) {
          for(let val of type) {
            list.push(val.value);
          }
        }
        return list;
      },
      basicParams() {
        let str = '';
        if(!this.form.choosetime) {
          str = 'yyyy-MM-dd HH:mm:ss';
        }
        return {
          userid: this.form.selectShopUid,
          opuid: this.form.operaValue,
          // starttime: '2019-06-05',
          starttime: formatDate(this.form.dateRangeValue[0], str),
          endtime: formatDate(this.form.dateRangeValue[1], str),
          orderno: this.form.orderno,
          charset: 'utf-8',
          isdownload: false,
          page: this.currentPage,
          maxnum: this.pageSize,
          paytypes: this.form.type.join(','),
          // filters: this.form.other.join(','),
          lang: this.lang,
          format: 'cors'
        };
      },
      typeList() {
        return this.shop.preauth_trade_type || []
      },
   },
   components: {

   }
 }
</script>

<style lang="scss">
  .el-date-table td {
    vertical-align: middle;
  }

  .panel-select-group {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
  }

  .panel-header__auto {
    height: auto !important;
    padding: 25px 0 20px 15px;
  }

  .panel-btn-group__wrapper {
    display: flex;
    margin-top: 25px;
  }

  .panel-body__fix {
    padding: 5px 15px !important;
  }

  .panel-body-btn-group {
    margin: 10px 0px 20px;
  }
  .trans-refund {
    color: #afafaf;
  }

  .el-table__row_fix {
    height: 62px;
    min-height: 62px;
    color: #282A2D;
  }
  #tr-download {
    color: #FF8100;
  }
  /*.panel-header__auto {*/
    /*position: relative;*/
    /*height: auto !important;*/
    /*padding: 25px 0;*/
  /*}*/

  .panel-select-group__fix {
    margin-bottom: 15px;

  }
  .el-form-item__content {
    .el-checkbox-group{
      display: inline-block;
      .el-checkbox{
        margin-left: 15px;
      }
    }
  }
  .panel-select-input__fix {
    width: auto;
  }

  .down{
    .panel-header {
      background-color: #fff;
    }
    .panel-select-group {
      margin-bottom: 10px;
      position: relative;

      .orderno_nowrap .el-form-item__error {
        overflow: visible;
        white-space: nowrap;
      }
      .panel-select__desc {
        width: 120px;
        margin: 0;
        display: inline-block;
      }
      .el-input__inner {
        width: 220px;
        display:inline-block;
      }
      .el-checkbox__label {
        color: #090909;
      }
    }
    .panel-header__auto {
      padding-bottom: 10px;
    }
    .table-title {
      font-size: 16px;
      font-weight: 500;
    }
    .table-content {
      font-size: 14px;
      text-decoration: line-through;
    }
    .num_total {
      text-align: center;
      display: flex;
      p {
        height: 30px;
        line-height: 30px;
      }
      .num-title {
        font-size: 15px;
      }
      .num-desc {
        font-size: 18px;
        color: #FF8100;
        font-weight: bold;
      }
      .num-default {
        font-size: 18px;
        color: #8A8C92;
        font-weight: bold;
      }
      .num_wrapper {
        margin-left: 30px;
      }
    }
    .a-wrapper {
      margin-right: 30px;
      .el-dropdown-link {
        img {
          padding: 5px;
          border: 1px solid #7ED321;
          cursor: pointer;
        }
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
  .flex-normal {
    justify-content: space-between;
  }

  .transPreAuth {
    .amount {
      span {
        position: absolute;
        left: 5px;
        color: #282B2D;
        z-index: 100;
        width: 30px;
        text-align: center;
      }
      .el-input__inner {
        padding-left: 35px;
        line-height: 36px;
      }
    }
    .success, .wait {
      .el-form-item__content {
        text-align: right;
        color: #2F323A;
      }
    }

    .success .el-dialog__header{
      background: url("img/success.png") top center no-repeat;
    }
    .wait .el-dialog__header{
      background: url("img/wait.png") top center no-repeat;
    }
    .fail .el-dialog__header{
      background: url("img/fail.png") top center no-repeat;
    }
    .refund .el-dialog__header {
        margin-top: 20px;
        padding-top: 48px;
        background-size: 45px 45px;
    }
    .refundfail {
      text-align: center;
      color: #262424;
      font-size: 16px;
      padding: 10px 0;
    }
  }
</style>

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
          <div class="panel-header-btn" @click="changePass('chain', shop.mobile)">修改密码</div>
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
          <!-- <div class="panel-header-btn__associate" @click="associate">
            <i class="icon-create"></i>
            <span>关联分店</span>
          </div> -->
          <el-button type="primary" class="panel-edit-btn__subshopnum" @click.native="editSubShopNum">编辑分店编号</el-button>
          <el-dropdown :hide-on-click="true">
            <div class="panel-header-btn__associate">
              <i class="icon-create"></i>
              <span>创建分店</span>
            </div>

            <el-dropdown-menu slot="dropdown" style="width:155px;">
              <el-dropdown-item @click.native="createShop">直接创建</el-dropdown-item>
              <el-dropdown-item @click.native="associate">关联已有</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </div>
      <div class="panel-body">
        <el-table
          :data="pageShopData.list"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading.body="loading">
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
              <!--<el-button type="text" size="small" class="el-button__fix" @click="unbind(scope)">解绑此分店</el-button>-->
              <el-dropdown>
                <span class="el-dropdown-link el-dropdown-link__fix">
                  更多<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="el-dropdown-menu__fix collect">
                  <el-dropdown-item class="el-dropdown-item__fix"  @click.native="changePass('single', scope.row.mobile)">修改密码</el-dropdown-item>
                  <el-dropdown-item class="el-dropdown-item__fix"  @click.native="confirmDeleteShop(scope.row.uid)">删除分店</el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>
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
    <el-dialog title="修改密码" :visible.sync="showChangePass" @close="handleClose('form')" custom-class="mydialog pass" top="20%" :show-close="false">
      <el-form :model="form" :rules="formrules" ref="form">
        <el-form-item label="登录账号">
          <div>{{ userName }}</div>
        </el-form-item>
        <el-form-item label="输入新密码" prop="pass">
          <el-input v-model="form.pass" size="small" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="repass">
          <el-input v-model="form.repass" size="small" type="password" placeholder="请输入确认新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div @click="showChangePass = false" class="cancel">取消</div>
        <div @click="submit" class="submit">
          <span class="el-icon-loading" v-if="iconShow"></span>
          <span v-else>确定</span>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="编辑分店编号" :visible.sync="showEditSubShopNum" class="mydialog" custom-class="edit-sub-tag">
      <el-form :rules="checkTagRules" ref="form-edit-subshop-num" label-position="left">

          <el-form-item v-for="(shop, index) in shopData.list" v-if="index !== 0" prop="shop.tag">
            <el-tooltip placement="bottom" :content="shop.shop_name" class="subshoptip">
              <label>{{shop.shop_name}}</label>
            </el-tooltip>
            <el-input v-model="shop.tag" size="small" placeholder="请输入二十位以内的文字或字母" style="width:72%"></el-input>
          </el-form-item>

      </el-form>
      <div class="divider"></div>
      <div slot="footer" class="dialog-footer">
        <div @click="showEditSubShopNum = false" class="cancel">关闭</div>
        <div @click="submitEditSubShopTag" class="submit"><i class="el-icon-loading" v-show="iconShow"></i>确认</div>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="showDeleteShopConfirm" custom-class="mydialog pass" top="20%" :show-close="false" @close="handleClose('pwdform')">
        <div style="margin-bottom: 20px;">若要删除分店，请输入总账户登录密码以确认操作</div>
        <el-form :model="formpwd" :rules="formrules" ref="pwdform">
          <el-form-item prop="primeaccountpwd">
            <el-input v-model="formpwd.primeaccountpwd" placeholder="请输入总账户登录密码" type="password"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <div @click="checkPrimeShopPwd('pwdform')" class="submit"><i class="el-icon-loading" v-show="iconShow"></i>确认</div>
        </div>
    </el-dialog>
  </div>

</template>

<script>
  import axios from 'axios';
  import config from 'config';
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  export default {
    components: {
      ElForm,
      ElButton},
    data() {
      let passValid = (rule, val, cb) => {
        if(val === '') {
          cb('请输入新密码');
        } else {
          if(this.form.repass !== '') {
            this.$refs['form'].validateField('repass');
          }
          cb();
        }
      };
      let repassValid = (rule, val, cb) => {
        if(val === '') {
          cb('请输入确认新密码');
        } else if(this.form.pass && this.form.pass !== val) {
          cb('新密码与确认密码不一致');
        } else {
          console.log(val);
          cb();
        }
      };
      let tagValid = (rule, val, cb) => {
//          alert(val);
          console.log(val)
      };
      let primeAccountPwdValid = (rule, val, cb) => {
          if(val === '') {
              cb('请输入总账户密码');
          } else {
            console.log(val);
            cb();
          }
      }
      return {
        loading: false,
        iconShow: false,
        isShowDetail: false,
        showChangePass: false,
        showEditSubShopNum: false,
        showDeleteShopConfirm: false,
        detailData: {},
        userName: '',
        type: '',
        shouldDeleteUid: '',
        formpwd: {
          primeaccountpwd: ''
        },
        form: {
          pass: '',
          repass: '',
          tag: ''
        },
        checkTagRules: {
          tag: [
            { validator: tagValid },
            { max: 20, min: 0, message: '请输入二十以内的文字或字母' }
          ]
        },
        formrules: {
          pass: [
            { validator: passValid },
            { max: 20, min: 6, message: '请输入6~20位数字或字母', trigger: 'blur' }
          ],
          repass: [
            { validator: repassValid },
            { max: 20, min: 6, message: '请输入6~20位数字或字母', trigger: 'blur' }
          ],
          primeaccountpwd: [
            { validator: primeAccountPwdValid },
            { required: true, message: '请输入总账户密码', trigger: 'blur' }
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
      },
      shopData() {
        return this.$store.state.shopData;
      }
    },
    created() {
      this.$store.dispatch('getPageShopData');
      this.$store.dispatch('getShopList');
    },
    methods: {
        // 检查提交主账户密码
      checkPrimeShopPwd(formName) {
          this.$refs[formName].validate((valid) => {
            if(valid) {
                // 发验证主账户密码请求
              console.log('验证密码通过')
            } else {
              console.log("validate doesn't passed!!");
              return false;
            }
          })
      },
      submitEditSubShopTag() {

      },
      // 编辑子商户
      editSubShopNum() {
        this.showEditSubShopNum = true;
      },
      // 确认是否删除分店
      confirmDeleteShop(uid) {
          console.log('deleteing uid:', uid);
        this.shouldDeleteUid = uid;
        this.showDeleteShopConfirm = true;
      },
        // 创建子门店
      createShop() {
          this.$router.push('/main/chainmanage/createsubshop');
      },
      // 修改密码
      changePass(type, name) {
        this.type = type;
        this.userName = name;
        this.showChangePass = true;
      },

      // 关闭弹出层,清除表单
      handleClose(formName) {
        this.$refs[formName].resetFields();
      },

      // 修改密码提交
      submit() {
        this.$refs['form'].validate((valid) => {
          if(!this.iconShow && valid) {
            this.iconShow = true;

            let src;
            if(this.type === 'chain') {
              src = 'big-submchnt';
            }else {
              src = 'mchnt';
            }
            axios.post(`${config.ohost}/mchnt/user/reset_pwd`, {
              mobile: this.shop.mobile,
              password: this.form.pass,
              mode: 'change',
              username: this.userName,
              src: src,
              format: 'cors'
            }).then((res) => {
              let data = res.data;
              if (data.respcd === config.code.OK) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.showChangePass = false;

                if(this.type === 'chain') {
                  this.$router.push('/login');
                }
              } else {
                this.$message.error(data.respmsg);
              }
              this.iconShow = false;
            }).catch(() => {
              this.$message.error('请求失败!');
              this.iconShow = false;
            });
          }
        });
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

      unbind(uid) {
        this.$confirm('是否要删除此分店?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭'
        })
          .then(() => {
            axios.get(`${config.host}/merchant/sub/remove`, {
              params: {
                sub_uid: uid
              }
            })
              .then((res) => {
                let data = res.data;
                if(data.respcd === config.code.OK) {
                  this.$message({
                    type: 'success',
                    message: '解绑成功!'
                  });
                  this.$store.dispatch('getPageShopData');
                  this.$store.dispatch('getShopList');
                } else {
                  this.$message.error(data.resperr);
                }
              })
              .catch(() => {
                this.$message.error('解绑失败!');
              });
          }).catch(() => {
          console.log("取消");
        });
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

<style lang="scss" scoped>
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
    .panel-edit-btn__subshopnum {
      width: 155px;
      margin-left: 674px;
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
    .el-tooltip.subshoptip {
      display: inline-block;
      width: 100px;
      overflow: hidden;
      height: 16px;
      line-height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

  }
</style>

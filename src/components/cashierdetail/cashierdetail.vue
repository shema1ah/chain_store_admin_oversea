<template>
  <div class="cashierdetail" v-loading="loading">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>收银员管理</span>
        <i class="icon-right_arrow"></i>
        <span>查看详情</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">收银员资料</span>
        </div>
      </div>
      <div class="panel-body" >
        <div class="info_wrapper">
          <div class="info">
            <div class="info__title">账户状态</div>
            <div class="info__desc">
              <el-switch v-model="opinfo.status" on-text="" off-text="" on-color="#7ed321" off-color="#FF8100" on-value=1 off-value=0 @change="changeStatus"></el-switch>
            </div>
          </div>
          <div class="info">
            <div class="info__title">姓名</div>
            <div class="info__desc">{{ opinfo.opname }}</div>
          </div>
          <div class="info">
            <div class="info__title">电话</div>
            <div class="info__desc">{{ opinfo.mobile }}</div>
          </div>
          <div class="info">
            <div class="info__title">门店</div>
            <div class="info__desc">{{ shop.shopname }}</div>
          </div>
          <div class="info">
            <div class="info__title">主账号</div>
            <div class="info__desc">{{ shop.mobile }}</div>
          </div>
          <div class="info">
            <div class="info__title">收银员编号</div>
            <div class="info__desc">{{ opinfo.opuid }}</div>
          </div>
          <div class="info next-bottom">
            <div class="info__title">密码</div>
            <div class="info__desc">******</div>
          </div>
          <div class="info">
            <div class="info__title"></div>
            <div class="gray-explain">* 收银员登录方式为主账号+编号+收银员密码</div>
          </div>
          <div class="info next-bottom">
            <div class="info__title">退款权限</div>
            <div class="info__desc">
              <el-switch v-model="opinfo.refund" on-text="" off-text="" on-color="#7ed321" off-color="#FF8100" on-value=1 off-value=0 @change="changeRights"></el-switch>
            </div>
          </div>
          <div class="info">
            <div class="info__title"></div>
            <div class="gray-explain">* 目前收银员仅支持查看活动信息，不支持对红包、集点、储值活动、特卖、店铺公告、会员特权的增删改</div>
          </div>
          <div class="panel-btn-group__wrapper">
            <a :href="downHref" download v-if="!role.haiwai || role.country === 'HK'">
              <div class="panel-btn__download panel-btn__download_detail">
                <i class="icon-download"></i>
                <span>下载店铺收款码</span>
              </div>
            </a>
            <div class="panel-btn__download panel-btn__download_record" @click="changeInfo">
              <span>编辑收银员资料</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="编辑收银员资料" :visible.sync="showChangeInfo" @close="handleClose" custom-class="mydialog" top="20%" :show-close="false">
      <el-form :model="form" :rules="formrules" ref="form" label-width="80px">
        <el-form-item label="姓名" prop="opname">
          <el-input v-model.trim="form.opname" size="small" type="text" placeholder="请输入收银员姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model.trim="form.mobile" size="small" type="text" placeholder="请输入收银员电话"></el-input>
        </el-form-item>
        <el-form-item label="门店">
          <div>{{ shop.shopname }}</div>
        </el-form-item>

        <el-form-item label="主账号">
          <div>{{ shop.mobile }}</div>
        </el-form-item>
        <el-form-item label="收银员编号">
          <div>{{ opuid }}</div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" size="small" type="password" placeholder="请输入收银员密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div @click="showChangeInfo = false" class="cancel">关闭</div>
        <div @click="submit" class="submit">
          <span class="el-icon-loading" v-if="iconShow"></span>
          <span v-else>确认</span>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Store from '../../common/js/store';
  import axios from 'axios';
  import config from 'config';

  export default {
    data() {
      return {
        lang: config.lang,
        role: Store.get('role') || {},
        opinfo: {},
        opuid: '',
        loading: false,
        iconShow: false,
        showChangeInfo: false,
        userName: '',
        form: {
          opname: '',
          mobile: null,
          password: ''
        },
        formrules: {
          opname: [
            { required: true, message: '请输入收银员姓名' },
            { max: 20, min: 2, message: '请输入2~20位字符' }
          ],
          mobile: [
            { required: true, message: '请输入收银员电话' },
            { pattern: /^1[34578]\d{9}$/, message: '请输入正确的收银员电话' }
          ],
          password: [
            { required: true, message: '请输入收银员密码' },
            { max: 20, min: 6, message: '请输入6~20位字符' }
          ]
        }
      };
    },

    computed: {
      downHref() {
        return `${config.host}/merchant/qrcode?userid=${this.shop.uid}&opuid=${this.opuid}`;
      }
    },

    props: {
      shop: {
        type: Object
      }
    },

    created() {
      this.opuid = this.$route.query.id || '';
      this.getInfo();
    },

    methods: {
      // 获取收银员信息
      getInfo() {
        this.loading = true;
        axios.get(`${config.host}/merchant/opuser/info`, {
          params: {
            opuid: this.opuid
          }
        }).then((res) => {
          this.loading = false;
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.opinfo = data.data || {};
            this.opinfo.status = this.opinfo.status + '';
            this.opinfo.refund = this.opinfo.refund + '';
          } else {
            this.$message.error(data.respmsg);
          }
        }).catch(() => {
          this.loading = false;
          this.$message.error('请求失败');
        });
      },

      // 改变状态
      changeStatus(st) {
        if(!this.loading) {
          this.loading = true;
          axios.post(`${config.ohost}/mchnt/opuser/change`, {
            opuid: this.opuid,
            status: st,
            format: 'cors'
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            } else {
              this.$message.error(data.resperr);
            }
            // 页面重新请求数据
            this.getInfo();
          }).catch(() => {
            this.loading = false;
            this.$message.error('请求失败');
            // 页面重新请求数据
            this.getInfo();
          })
        }
      },

      // 改变权限
      changeRights(rg) {
        if(!this.loading) {
          this.loading = true;
          axios.post(`${config.ohost}/mchnt/opuser/perm/change`, {
            opuid: this.opuid,
            type: 'refund',
            status: rg,
            format: 'cors'
          }).then((res) => {
            this.loading = false;
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            } else {
              this.$message.error(data.resperr);
            }
            // 页面重新请求数据
            this.getInfo();
          }).catch(() => {
            this.loading = false;
            this.$message.error('请求失败');
            // 页面重新请求数据
            this.getInfo();
          })
        }
      },

      changeInfo() {
        this.showChangeInfo = true;
      },

      // 提交修改
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid && !this.iconShow) {
            this.iconShow = true;
            axios.post(`${config.ohost}/mchnt/opuser/change`, Object.assign({}, this.form, {
              opuid: this.opuid,
              format: 'cors'
            })).then((res) => {
              this.iconShow = false;
              let data = res.data;
              if (data.respcd === config.code.OK) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
                // 路由重新渲染
                this.$router.go(0);
              } else {
                this.$message.error(data.resperr);
              }
            }).catch(() => {
              this.iconShow = false;
              this.$message.error('请求失败');
            })
          }
        });
      },

      // 关闭弹出层,清除表单
      handleClose() {
        this.$refs['form'].resetFields();
      }
    }

  };
</script>

<style lang="scss">

</style>

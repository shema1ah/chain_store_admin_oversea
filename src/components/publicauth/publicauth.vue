<template>
  <!-- 未绑定总账户公众号 -->
  <div class="warpper" v-if="wechatNotAuth">
    <div class="banner_wrapper">
      <p>您还没有关联您的微信账号，请关联您的微信账号以便我们能为您提供更多服务。</p>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-select-group">
          <span class="panel-header__desc">绑定微信公众号</span>
        </div>
      </div>
      <div class="panel-body" style="padding-bottom:25px">
        <ul class="steps">
          <li>
            <strong><span>Step</span>1</strong>
            <img src="./img/step1.jpeg" alt="step1">
            <p>使用绑定的个人微信号扫描</p>
          </li>
          <li>
            <strong><span>Step</span>2</strong>
            <img src="./img/step2.jpeg" alt="step1">
            <p>公众号管理员授权确认</p>
          </li>
          <li>
            <strong><span>Step</span>3</strong>
            <img src="./img/step3.jpeg" alt="step1">
            <p>授权成功，运营公众号！</p>
          </li>
        </ul>
        <button @click="goWechatAuth" class="el-button el-button--primary btn-add" type="button">免费添加微信公众号</button>
      </div>
    </div>
  </div>
  <!-- 已绑定总账户公众号 -->
  <div class="warpper" v-else>
    <div class="banner_wrapper">
      <div class="banner-breadcrumb"><span>已授权公众号</span></div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-select-group">
          <span class="panel-header__desc">公众号基本信息</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="public-info">
          <img :src="publicAvatar" alt="头像" />
          <span>名称
            <strong>{{publicInfo.nick_name}}</strong>
          </span>
          <span>ID（微信号）
            <strong>{{publicInfo.appid}}</strong>
          </span>
          <span>公众号类型
            <strong>{{publicInfo.service_type_str}}</strong>
          </span>
          <span>认证类型
            <strong>{{publicInfo.verify_type_str}}</strong>
          </span>
        </div>
        <div class="operation">
          <button type="button" @click="showDialog" v-if="!role.single" class="el-button el-button--primary">分店授权管理</button>
          <button type="button" @click="confirm"  class="el-button el-button--default">
            {{role.single ? '解除账户授权' : '解除总账户授权'}}
          </button>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">微信菜单链接</span>
        </div>
      </div>
      <div class="panel-body">
        <ul class="copy-list" id="copy-list">
          <li v-if="role.single">
            <span @click="selectext($event)">点餐链接</span>
            <p>https://o.qfpay.com/dc/?/#!/merchant/{{uid}}</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li v-if="role.single">
            <span @click="selectext($event)">外卖链接</span>
            <p>https://o.qfpay.com/dc/take-out.html?/#!/merchant/{{uid}}</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li v-else>
            <span @click="selectext($event)">外卖链接</span>
            <p>https://o.qfpay.com/dc/store-list.html?/#!/merchant/{{uid}}</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li>
            <span @click="selectext($event)">订单链接</span>
            <p>https://o.qfpay.com/dc/order-list.html?mchnt_id={{uid}}</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li>
            <span @click="selectext($event)">集点链接</span>
            <p>http://m.haojin.in/v2/app.html?mchnt_id={{uid}}#!/card</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li>
            <span @click="selectext($event)">红包链接</span>
            <p>http://m.haojin.in/v2/app.html?mchnt_id={{uid}}#!/coupon</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li>
            <span @click="selectext($event)">储值链接</span>
            <p>https://o2.qfpay.com/prepaid/v1/page/c/usercenter/merchant.html?h={{hashid}}</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li>
            <span @click="selectext($event)">会员中心</span>
            <p>http://m.haojin.in/v2/app.html#!/member</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog title="请勾选需要授权的分店" v-model="dialogVisible" size="tiny">
      <el-form>
        <el-checkbox-group v-model="checkedStores" @change="handleCheckedStoresChange">
          <el-checkbox v-for="store in stores" :label="store.userid">
            {{store.shop_name}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="check-all">全选</el-checkbox>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="authPublics">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from 'config'
  import Store from '../../common/js/store'
  import avatar from './img/avatar.png'

  export default {
    data() {
      return {
        role: Store.get("role") || {},
        wechatNotAuth: false,
        publicInfo: {},
        publicAvatar: avatar,
        hashid: '',
        uid: '',
        stores: [],
        dialogVisible: false,
        checkAll: true,
        checkedStores: [],
        storeUids: [],
        isIndeterminate: true
      }
    },
    created() {
      this.fetchMerchantIds()
      this.fetchPublicInfo()
    },
    methods: {
      fetchPublicInfo () {
        axios.post(`${config.host}/wxofficial/setting`)
          .then((res) => {
            let data = res.data
            if (data.respcd === config.code.OK) {
              if (data.data.offical_status === false) {
                this.wechatNotAuth = true
              } else {
                this.wechatNotAuth = false
                if (!this.role.single) {
                  this.fetchSubMerchants()
                }
                this.publicInfo = data.data.applist[0]
                this.publicAvatar = data.data.applist[0].head_img
              }
            } else {
              this.$message.error(data.respmsg)
            }
          })
          .catch(() => {
            this.$message.error('获取公众号信息失败')
          })
      },
      goWechatAuth () {
        if (process.env.NODE_ENV === 'production') {
          window.location.href = 'https://wxmp.qfpay.com/v1/wxthird/auth_url?userid=' + this.uid + '&redirect_url=' + window.location.href
        } else {
          window.location.href = 'https://wxmp.qa.qfpay.net/v1/wxthird/auth_url?userid=' + this.uid + '&redirect_url=' + window.location.href
        }
      },
      fetchMerchantIds () {
        axios.get(`${config.host}/merchant/ids`)
          .then((res) => {
            let data = res.data
            if (data.respcd === config.code.OK) {
              this.hashid = data.data.hashid
              this.uid = data.data.uid
            } else {
              this.$message.error(data.respmsg)
            }
          })
          .catch(() => {
            this.$message.error('获取商户id信息失败')
          })
      },
      fetchSubMerchants() {
        axios.get(`${config.host}/submerchant/auth/info`)
          .then((res) => {
            let data = res.data
            if (data.respcd === config.code.OK) {
              let stores = data.data
              this.stores = stores
              for (let i = 0; i < stores.length; i++) {
                this.storeUids.push(stores[i].userid)
                if (stores[i].is_bind === 1) {
                  this.checkedStores.push(stores[i].userid)
                }
              }
            } else {
              this.$message.error(data.respmsg)
            }
          })
          .catch(() => {
            this.$message.error('获取连锁店铺失败')
          })
      },
      authPublics() {
        let storeUids = this.storeUids
        let checkedUids = this.checkedStores
        let uncheckedUids = []
        for (let i = 0; i < storeUids.length; i++) {
          if (checkedUids.indexOf(storeUids[i]) === -1) {
            uncheckedUids.push(storeUids[i])
          }
        }

        axios.post(`${config.host}/submerchant/auth/operator`, {
          bind_userids: checkedUids.toString(),
          unbind_userids: uncheckedUids.toString()
        }).then((res) => {
            let data = res.data
            if (data.respcd === config.code.OK) {
              this.dialogVisible = false
            } else {
              this.$message.error(data.respmsg)
            }
          })
          .catch(() => {
            this.$message.error('授权失败')
          })
      },
      unbindPublic() {
        axios.post(`${config.host}/merchant/auth/unbind`)
        .then((res) => {
          let data = res.data
          if (data.respcd === config.code.OK) {
            this.wechatNotAuth = true
            this.$message({
              type: 'success',
              message: '解除成功'
            })
          } else {
            this.$message.error(data.respmsg)
          }
        })
        .catch(() => {
          this.$message.error('解除失败')
        })
      },
      handleCheckAllChange(event) {
        this.checkedStores = event.target.checked ? this.storeUids : []
        this.isIndeterminate = false;
      },
      handleCheckedStoresChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.stores.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.stores.length
      },
      showDialog() {
        this.dialogVisible = true;
      },
      confirm() {
        let tipText = this.role.single ? '请确认是否要解除账户授权?' : '请确认是否要解除总账户公众号?'
        this.$confirm(tipText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.unbindPublic()
        }).catch(() => {
        })
      },
      selectext(e) {
        window.getSelection().selectAllChildren(e.target.nextElementSibling)
      },
      copylink(e) {
        window.getSelection().selectAllChildren(e.target.previousElementSibling)
        document.execCommand('copy')
      }
    }
  };
</script>

<style lang="scss">
  // 未绑定
  .steps {
    padding-left: 60px;
    li {
      padding-top: 30px;
      display: inline-block;
      width: 32%;
      padding-right:60px;
      box-sizing: border-box;
      strong {
        font-size: 34px;
        span {
          margin-right: 6px;
          color: #a7a9ae;
          font-size: 17px;
        }
      }
      img {
        width: 100%;
        margin: 20px 0;
        vertical-align: bottom;
      }
      p {
        text-align: center;
        font-size: 17px;
      }
    }
  }
  .btn-add{
    display: block;
    width: 369px;
    height: 60px;
    margin: 64px auto 0 auto;
    font-size: 20px;
  }
  // 已绑定
  .public-info {
    display: flex;
    padding:20px 10% 0 5%;
    max-width: 1000px;
    justify-content: space-between;
    align-items: center;
    img {
      width: 15%;
      max-width: 180px;
      border-radius: 100%;
    }
    span {
      color: #98989E;
      font-size: 15px;
      strong {
        color: #262424;
        font-size: 20px;
        display: block;
        margin-top: 8px;
      }
    }
  }
  .operation {
    padding-left: 22%;
    padding-bottom: 30px;
    button {
      margin-right: 20px;
    }
  }
  .copy-list {
    padding-left: 30px;
    padding-bottom: 30px;
    li {
      line-height: 50px;
    }
    span {
      color: #98989E;
      margin-right: 10px;
      cursor: pointer;
    }
    p {
      color: #262424;
      font-size: 18px;
      display: inline-block;
    }
    button {
      border: 1px solid #FE9B20;
      padding: 4px 10px;
      margin-left: 15px;
      img {
        width: 14px;
        margin-right: 6px;
        vertical-align: text-bottom;
      }
    }
  }
  .el-checkbox {
    margin:0 15px 10px 0;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0;
  }
  .el-dialog__footer{
    border-top: 1px solid #E7EAEC;
    padding-top: 15px;
  }
  .check-all {
    float: left;
    margin-top: 9px;
  }
</style>

<template>
  <div class="warpper">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb"><span>已授权公众号</span></div>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">公众号基本信息</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="public-info">
          <img src="http://near.m1img.com/op_upload/155/14943204650.png" alt="头像">
          <span>名称
            <strong>李宗哲</strong>
          </span>
          <span>ID（微信号）
            <strong>zongzhele</strong>
          </span>
          <span>公众号类型
            <strong>服务号</strong>
          </span>
          <span>认证类型
            <strong>已认证</strong>
          </span>
        </div>
        <div class="operation">
          <button type="button" @click="showDialog" class="el-button el-button--primary">分店授权管理</button>
          <button type="button" @click="confirm" class="el-button el-button--default">解除总账户授权</button>
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
          <li>
            <span @click="selectext($event)">点餐链接</span>
            <p>https://o.qfpay.com/dc/?/#!/merchant/12031/</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li>
            <span @click="selectext($event)">外卖链接</span>
            <p>https://o.qfpay.com/dc/?/#!/merchant/12032/</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li>
            <span @click="selectext($event)">订单链接</span>
            <p>https://o.qfpay.com/dc/?/#!/merchant/12033/</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li>
            <span @click="selectext($event)">集点链接</span>
            <p>https://o.qfpay.com/dc/?/#!/merchant/12034/</p>
            <button @click="copylink($event)" type="button" class="el-button el-button--text">
              <img src="./img/ic_copy.png" alt="icon">复制链接
            </button>
          </li>
          <li>
            <span @click="selectext($event)">红包链接</span>
            <p>https://o.qfpay.com/dc/?/#!/merchant/12035/</p>
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
          <el-checkbox v-for="store in stores" :label="store" :key="store">{{store}}</el-checkbox>
        </el-checkbox-group>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="check-all">全选</el-checkbox>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  const storeOptions = ['三里屯店', '望京店', '大屯店', '北苑店'];
  export default {
    data() {
      return {
        dialogVisible: false,
        checkAll: true,
        checkedStores: ['三里屯店', '大屯店'],
        stores: storeOptions,
        isIndeterminate: true
      };
    },
    methods: {
      confirm() {
        this.$confirm('请确认是否要解除总账户公众号?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '解除成功!'
          });
        }).catch(() => {
        });
      },
      showDialog() {
        console.log('showDialog');
        this.dialogVisible = true;
      },
      selectext(e) {
        console.log(e);
        console.log(e.target.nextElementSibling);
        window.getSelection().selectAllChildren(e.target.nextElementSibling);
      },
      copylink(e) {
        console.log('copylink');
        console.log(e);
        console.log(e.target.previousElementSibling);
        window.getSelection().selectAllChildren(e.target.previousElementSibling);
        document.execCommand('copy');
      },
      handleCheckAllChange(event) {
        this.checkedStores = event.target.checked ? storeOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedStoresChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.stores.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.stores.length;
      }
    }
  };
</script>

<style lang="scss">
  .public-info {
    display: flex;
    padding:0 10% 0 5%;
    justify-content: space-between;
    align-items: center;
    img {
      width: 15%;
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
    padding-left: 18%;
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
  .el-dialog__footer{
    border-top: 1px solid #E7EAEC;
    padding-top: 15px;
  }
  .check-all {
    float: left;
    margin-top: 9px;
  }
</style>

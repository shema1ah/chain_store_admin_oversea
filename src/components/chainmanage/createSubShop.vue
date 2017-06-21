
<template class="main">
  <div class="index">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>门店管理</span>
        <i class="icon-right_arrow"></i>
        <span>创建分店</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">分店账户信息设置</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="sub_info_wrapper" >
          <el-form :model="shopInfo" label-width="96px" label-position="left">
            <el-form-item label="分店登录密码" prop="">
              <el-input v-model="shopInfo.password" size="small" type="password" placeholder="请输入新密码" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <div class="panel-select-group">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">店铺基本信息</span>
            </div>

            <el-form-item label="分店名称" prop="">
              <el-input v-model="shopInfo.shopname" size="small" type="text" placeholder="请输入" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="经营类型" prop="">
              <el-input id="op_type" icon="caret-bottom" v-model="shopInfo.shoptype_name" size="small" type="text" placeholder="请选择经营类型" auto-complete="off" class="sub-account-item-info"
                        @click="showTreeComponent" readonly></el-input>
              <el-tree id="op-type-tree" :data="shop_types" :props="defaultProps" @node-click="handleNodeClick" v-show="shopInfo.isShowTree" style="position:absolute;top:32px;z-index:9;width:238px;"></el-tree>
            </el-form-item>

            <el-input v-model="shopInfo.longitude"  type="hidden" placeholder="请输入新密码" auto-complete="off" class="hidden" ref="longitude"></el-input>

            <el-input v-model="shopInfo.latitude"  type="hidden" placeholder="请输入新密码" auto-complete="off" class="hidden" ref="latitude"></el-input>

            <el-input v-model="shopInfo.city_no"  type="hidden" placeholder="请输入新密码" auto-complete="off" class="hidden" ref="city_no"></el-input>

            <el-form-item label="店铺地址" prop="">
              <el-input v-model="shopInfo.location" icon="caret-bottom" size="small" type="text" placeholder="请输入新密码" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="详细门牌号" prop="" style="margin-bottom: 0;">
              <el-input v-model="shopInfo.address" size="small" type="text" placeholder="" auto-complete="off" class="sub-account-item-info-long"></el-input>
            </el-form-item>

            <el-form-item label="" class="sub-item-tip">
              <div  class="sub-account-item-info-long" style="line-height: 16px;">
                * 例：A座 底商1002号（如定位地址不够精确，请将店铺的地址一 并填写在详细地址栏中）
              </div>
            </el-form-item>

            <div class="panel-select-group">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">商户基础信息</span>
            </div>

            <el-form-item label="店主姓名" prop="">
              <el-input v-model="shopInfo.username" size="small" type="text" placeholder="请与收款卡号开户名一致" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="身份证号" prop="">
              <el-input v-model="shopInfo.idnumber" size="small" type="text" placeholder="请输入" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="证件有效期" prop="">

            </el-form-item>

            <div class="panel-select-group">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">绑定银行卡信息</span>
            </div>

            <el-form-item label="开户名" prop="">
              <el-input v-model="shopInfo.bankuser" size="small" type="text" placeholder="请与店主姓名一致" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="银行卡号" prop="">
              <el-input v-model="shopInfo.bankaccount" size="small" type="text" placeholder="请输入" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="预留手机号" prop="">
              <el-input v-model="shopInfo.bankmobile" size="small" type="text" placeholder="请输入" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="开户地" prop="">
              <el-input v-model="shopInfo.bankcity" icon="caret-bottom" size="small" type="text" placeholder="请选择" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="开户行" prop="" style="margin-bottom: 0;">
              <el-input v-model="shopInfo.headbankname" icon="caret-bottom" size="small" type="text" placeholder="请选择" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>
            <el-form-item label="" class="sub-item-tip">
              <div  class="sub-account-item-info-long">
                * 查询此银行卡的开户行请拨打：95588
              </div>
            </el-form-item>

            <div class="divider"></div>

            <el-form-item>
              <el-col :span="2">
                <el-button type="text">放弃创建</el-button>
              </el-col>
              <el-col :span="6">
                <el-button>下一步</el-button>
              </el-col>
            </el-form-item>
            <div style="width:100%;padding-bottom:2px;"></div>
          </el-form>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
//  import axios from 'axios';
//  import config from 'config';
export default {
  components: {
    ElButton,
    ElInput,
    ElForm},
  data() {
      return {
         shopInfo: {
           password: '', // 密码
           shopname: '', // 商户名
           shoptype_id: '', // 经营类型（商户类型）id
           shoptype_name: '', // 经营类型（商户类型）
           isShowTree: false, // 是否显示经营类型树状结构
           longitude: -1, // 经度
           latitude: -1, // 纬度
           city_no: 0, //  城市代号
           location: '', // 店铺地址
           address: '', // 详细门牌号
           username: '', // 店主名
           idnumber: '', // 店主身份证号
           bankuser: '', // 开户名
           bankaccount: '', // 银行卡号
           bankmobile: '', // 预留手机号
           bankcity: '', // 开户地
           headbankname: '' // 开户行名称
         },
        shop_types: [{
          "parent_id": 0,
          "id": 1,
          "weight": 1,
          "name": "饮料",
          "shoptypes": [
              {
            "parent_id": 1,
                "id": 10,
            "weight": 1,
                "name": "酸奶"
          },
            {
              "parent_id": 1,
              "id": 5,
              "weight": 2,
              "name": "果汁",
              shoptypes: [
                {"parent_id": 5,
                  "id": 51,
                  "weight": 3,
                  "name": "汇源果汁"
                }
              ]
            }
          ]
        }],
        defaultProps: {
          children: 'shoptypes',
          label: 'name',
          value: 'id'
        }
      }
    },
  created() {
      this.getOperationType();

  },
  update() {
      console.log(2);
      console.log(this.shopInfo);
  },
  methods: {
    getOperationType() { // 获取经营类型 传0

    },
    showTreeComponent(e) {
        this.shopInfo.isShowTree = true;
        e.stopPropagation();
    },
    handleNodeClick(node) {
      console.log(node);
      this.shopInfo.shoptype_id = node.id;
      this.shopInfo.shoptype_name = node.name;
    }
  },
  mounted() {
      var _self = this;
      document.addEventListener('click', (e) => {
          if('el-tree-node'.indexOf(e.target.className) == -1) {
            if(_self.shopInfo.isShowTree) this.shopInfo.isShowTree = false;
          }
      }, false)
  }
}
</script>
<style lang="scss" scoped>
  .panel-body {
    padding:0;
    .sub_info_wrapper {
      padding: 20px 0 0 0px;
      .divider-icon {
        width: 6px;
        height: 28px;
        background-color: #fe9b20;
        display: inline-block;
        border-radius: 0 30px 30px 0;
      }
      .panel-header__desc {
         padding-left: 14px;
      }
      .el-form {
        .hidden {
          display: none;
        }
        .el-form-item {
          margin: 20px 0 20px 30px;
          .sub-account-item-info {
            width: 240px;
          }
          .sub-account-item-info-long {
            width: 410px;
          }
          .el-form-item__content {
            line-height:16px !important;
            .sub-account-item-info-long {
              font-size: 14px;
              color: #8a8c92;
            }
          }
        }
        .el-form-item.sub-item-tip {
          margin-top: 0;
        }

      }
    }
  }
</style>

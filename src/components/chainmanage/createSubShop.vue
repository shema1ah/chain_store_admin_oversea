
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
          <el-form :model="shopInfo" label-width="96px" label-position="left" :rules="page1_rules">
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
              <el-tree id="op-type-tree" :data="shop_types" :props="defaultProps" @node-click="handleNodeClick" v-show="shopInfo.isShowTree" style="position:absolute;top:32px;z-index:9;width:238px;overflow-y:auto;height:320px;"></el-tree>
            </el-form-item>

            <el-input v-model="shopInfo.longitude"  type="hidden"  auto-complete="off" class="hidden" ref="longitude"></el-input>

            <el-input v-model="shopInfo.latitude"  type="hidden"  auto-complete="off" class="hidden" ref="latitude"></el-input>

            <el-input v-model="shopInfo.provinceid"  type="hidden"  auto-complete="off" class="hidden" ref="provinceid"></el-input>

            <el-input v-model="shopInfo.province"  type="hidden"  auto-complete="off" class="hidden" ref="province"></el-input>

            <el-input v-model="shopInfo.city"  type="hidden"  auto-complete="off" class="hidden" ref="city"></el-input>

            <el-input v-model="shopInfo.city_no"  type="hidden"  auto-complete="off" class="hidden" ref="city_no"></el-input>

            <el-form-item label="店铺地址" prop="">
              <el-input v-model="shopInfo.location" icon="caret-bottom" size="small" type="text" placeholder="点击右侧按钮打开地图" auto-complete="off" class="sub-account-item-info"></el-input>
              <el-button @click="showMap" type="primary" size="small">地图定位</el-button>
            </el-form-item>

            <el-form-item label="详细门牌号" prop="" style="margin-bottom: 0;">
              <el-input v-model="shopInfo.address" size="small" type="text" placeholder="" auto-complete="off" class="sub-account-item-info-long"></el-input>
            </el-form-item>

            <el-form-item label="" class="sub-item-tip">
              <div  class="sub-account-item-info-long" style="line-height: 16px;">
                * 例：A座 底商1002号（如定位地址不够精确，请将店铺的地址一 并填写在详细地址栏中）
              </div>
            </el-form-item>

            <el-form-item label="店内联系电话" prop="">
              <el-input v-model="shopInfo.landline" size="small" type="text" placeholder="请输入顾客可联系的电话" auto-complete="off" class="sub-account-item-info"></el-input><span style="color:#8a8c92;">（选填）</span>
            </el-form-item>

            <div class="panel-select-group">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">商户基础信息</span>
            </div>

            <el-form-item label="店主姓名" prop="">
              <el-input v-model="shopInfo.bankuser" size="small" type="text" placeholder="请与收款卡号开户名一致" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="身份证号" prop="">
              <el-input v-model="shopInfo.idnumber" size="small" type="text" placeholder="请输入" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="证件有效期" prop="">
              <el-col :span="5">
                <el-date-picker
                  v-model="shopInfo.idstatdate"
                  type="date"
                  placeholder="生效年月日"
                  align="center"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="1" align="center">至</el-col>
              <el-col :span="5">
                <el-date-picker
                  v-model="shopInfo.idenddate"
                  type="date"
                  placeholder="失效年月日"
                  align="center"
                >
                </el-date-picker>
              </el-col>
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
              <el-input v-model="shopInfo.banklocation" icon="caret-bottom" size="small" type="text" placeholder="请选择" auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-input v-model="shopInfo.bankprovince"  type="hidden"  auto-complete="off" class="hidden" ref="bankprovince"></el-input>
            <el-input v-model="shopInfo.bankcity"  type="hidden"  auto-complete="off" class="hidden" ref="bankcity"></el-input>

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
              <el-col :span="5">
                <el-button type="primary" style="width:155px;">下一步</el-button>
              </el-col>
              <el-col :span="10">
                注：会员在集点满额兑换礼品后，将自动重新集点
              </el-col>
            </el-form-item>
            <div style="width:100%;padding-bottom:2px;"></div>
          </el-form>
          </div>
        </div>

      </div>
    <el-dialog class="map-dialog" id="geolocation" :visible.sync="isShowMap" style="width:660px;height:420px">
    </el-dialog>
  </div>

</template>

<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import {cardValid} from "../../common/js/util";
  import axios from 'axios';
  import config from 'config';
  const AMap = window.AMap;
export default {
  components: {
    ElButton,
    ElInput,
    ElForm},
  data() {
      let idValid = (rule, val, cb) => {
          if(!cardValid(val)) {
              console.log('身份证验证成功');
              cb();
          }
      };
      return {
         isShowMap: false,
         shopInfo: {
           password: '', // 密码
           shopname: '', // 分店名称
           landline: '', // 顾客可联系的电话
           shoptype_id: '', // 经营类型（商户类型）id
           shoptype_name: '', // 经营类型（商户类型）
           isShowTree: false, // 是否显示经营类型树状结构
           longitude: -1, // 经度
           latitude: -1, // 纬度
           city_no: 0, //  城市代号
           location: '', // 店铺地址
           address: '', // 详细门牌号
           idnumber: '', // 店主身份证号
           idstatdate: '', // 身份证有效开始日期(格式：2016-01-05)
           idenddate: '', // 身份证有效截止日期(格式：2017-01-05)
           bankuser: '', // 开户名
           bankaccount: '', // 银行卡号
           bankmobile: '', // 预留手机号
           bankprovince: '', // 支行所属省份
           bankcode: '', // 联行号
           bankcity: '', // 支行所属城市
           banklocation: '',
           provinceid: '', // 高德地图返回的六位区位码
           province: '', // 所在省
           city: '', // 所在市
           headbankname: '', // 开户行总行名称
           bankname: '', // 开户行支行名称
           bank: '', // 开户行 （headbankname+bankname）
           userid: '', // 预注册时返回 用于上传图片用
           username: '' // 预注册时返回 用于上传图片用
         },
        shop_types: [], // 树状结构数据 异步返回，初始为空数组
        defaultProps: {
          children: 'shoptypes',
          label: 'name',
          value: 'id'
        },
        page1_rules: {
          password: [
            { required: true, message: '请输入分店登录密码', trigger: 'blur' }
          ],
          shopname: [
            { required: true, message: '请输入分店名称', trigger: 'blur' }
          ],
          shoptype_name: [
            { required: true, message: '请选择经营类型' }
          ],
          location: [
            { required: true, message: '请从地图中定位店铺地址' }
          ],
          username: [
            { required: true, message: '请输入店主姓名', trigger: 'blur' }
          ],
          idnumber: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { validator: idValid }
          ],
          idstatdate: [
            { required: true, message: '请选择生效年月日' }
          ],
          idenddate: [
            { required: true, message: '请选择失效年月日' }
          ],
          bankuser: [
            { required: true, message: '请输入开户名', trigger: 'blur' }
          ],
          bankaccount: [
            { required: true, message: '请输入银行卡号', trigger: 'blur' }
          ],
          bankmobile: [
            { required: true, message: '请输入开户银行预留手机号', trigger: 'blur' }
          ],
          banklocation: [
            { required: true, message: '请选择开户地' }
          ]
        }
      }
    },
  created() {
      this.getOperationType();
  },
  methods: {
    showMap(e) {
      if(this.isShowMap) return;
      this.isShowMap = true;
      e.stopPropagation();
      let map = new AMap.Map('geolocation');
      map.setZoom(10);
      map.setCenter([116.39, 39.9]);
      map.plugin(["AMap.ToolBar", "AMap.Autocomplete", "AMap.PlaceSearch"], function() {
          let tool = new AMap.ToolBar();
          AMap.Autocomplete({
            datatype: 'all'
          });
          AMap.PlaceSearch();
          map.addControl(tool);
      });
      let marker = new AMap.Marker({
        position: [116.480983, 39.989628], // marker所在的位置
        map: map // 创建时直接赋予map属性
      });
      marker.setMap(map);

    },
    getOperationType() { // 获取经营类型 传0
      axios.get(`${config.ohost}/mchnt/tool/shoptypes`, {
        params: {
          pid: 0
        }
      })
        .then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            console.log('获取商户类型列表成功')
            console.log('$$$$$$$$$$$$$$', data);
            this.shop_types = data.data.shop_types;
          } else {
            this.$message.error(data.resperr);
          }
        })
        .catch((e) => {
          this.$message.error(e);
        });
    },
    showTreeComponent(e) {
        this.shopInfo.isShowTree = true;
        e.stopPropagation();
    },
    handleNodeClick(node) {
      console.log(node);
      this.shopInfo.shoptype_id = node.id;
      this.shopInfo.shoptype_name = node.name;
      console.log(this.shopInfo);
    }
  },
  mounted() {
      var _self = this;
      document.addEventListener('click', (e) => {
          if('el-tree-node'.indexOf(e.target.className) == -1) {
            if(_self.shopInfo.isShowTree) this.shopInfo.isShowTree = false;
          }
          if(_self.isShowMap) {
            _self.isShowMap = false;
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
  .map-dialog.el-dialog__wrapper {
    width: 660px;
    height: 420px;
    top: 50% !important;
    left: 50% !important;
    margin-left: -330px !important;
    margin-top: -210px !important;
    overflow: hidden !important;
    position: fixed !important;
  }
</style>

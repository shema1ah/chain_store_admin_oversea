<template class="main">
  <div class="index">
    <div class="mydialog" v-show="isShowMap" id="geolocation_mask" @click="hideMapDialog"></div>
    <!--sandbox="allow-scripts allow-popups allow-forms allow-same-origin"-->
    <iframe sandbox="allow-scripts allow-same-origin" id="miframe" v-if="isShowMap" :src="mapComponentURL"
            frameborder="0" scrolling="no" width="100%" height="100%"></iframe>
    <!-- 地图弹窗-->
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>门店管理</span>
        <i class="icon-right_arrow"></i>
        <span>创建分店</span>
      </div>
    </div>
    <!-- 信息填写页-->

    <div class="panel" v-show="infoPage">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">分店账户信息设置</span>
        </div>
      </div>
      <div class="csup-panel-body">
        <div class="sub_info_wrapper">
          <el-form :model="shopInfo" label-width="96px" label-position="left" :rules="page1_rules" ref="shop_info">
            <el-form-item label="分店登录密码" prop="password">
              <el-input v-model.trim="shopInfo.password" size="small" type="password" placeholder="请输入新密码"
                        auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <div class="panel-select-group fix-unique">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">店铺基本信息</span>
            </div>

            <el-form-item label="分店名称" prop="shopname">
              <el-input v-model.trim="shopInfo.shopname" size="small" type="text" placeholder="请输入" auto-complete="off"
                        class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="经营类型" prop="shoptype_name">
              <el-input id="op_type" icon="caret-bottom" v-model="shopInfo.shoptype_name" size="small" type="select"
                        placeholder="请选择经营类型"
                        @click="showTreeComponent"
                        readonly
                        class="sub-account-item-info"></el-input>
              <el-tree id="op-type-tree" :data="shopInfo.shop_types" :props="defaultProps" @node-click="handleNodeClick"
                       v-show="shopInfo.isShowTree"
                       style="position:absolute;top:32px;z-index:9;width:238px;overflow-y:auto;height:320px;"></el-tree>
            </el-form-item>

            <el-input v-model="shopInfo.longitude" type="hidden" auto-complete="off" class="hidden"
                      ref="longitude"></el-input>

            <el-input v-model="shopInfo.latitude" type="hidden" auto-complete="off" class="hidden"
                      ref="latitude"></el-input>

            <el-input v-model="shopInfo.provinceid" type="hidden" auto-complete="off" class="hidden"
                      ref="provinceid"></el-input>

            <el-input v-model="shopInfo.province" type="hidden" auto-complete="off" class="hidden"
                      ref="province"></el-input>

            <el-input v-model="shopInfo.city" type="hidden" auto-complete="off" class="hidden" ref="city"></el-input>

            <el-input v-model="shopInfo.city_id" type="hidden" auto-complete="off" class="hidden"
                      ref="city_id"></el-input>

            <el-form-item label="店铺地址" prop="location">
              <el-input v-model.trim="shopInfo.location" size="small" type="textarea" :rows="2" resize="none"
                        placeholder="点击右侧按钮打开地图"
                        auto-complete="off" class="sub-account-item-info" readonly></el-input>
              <span @click="showMap" type="primary" size="small" class="btn-map">地图定位店铺地址</span>
            </el-form-item>

            <el-form-item label="详细门牌号" prop="address" style="margin-bottom: 0;">
              <el-input v-model.trim="shopInfo.address" size="small" type="text" placeholder="" auto-complete="off"
                        class="sub-account-item-info-long"></el-input>
            </el-form-item>

            <el-form-item label="" class="sub-item-tip">
              <div class="sub-account-item-info-long" style="line-height: 16px;padding-top:15px;">
                * 例：A座 底商1002号（如定位地址不够精确，请将店铺的地址一 并填写在详细地址栏中）
              </div>
            </el-form-item>

            <el-form-item label="店内联系电话">
              <el-input v-model.trim="shopInfo.landline" size="small" type="text" placeholder="请输入顾客可联系的电话"
                        auto-complete="off" class="sub-account-item-info"></el-input>
              <span style="color:#8a8c92;">（选填）</span>
            </el-form-item>

            <div class="panel-select-group fix-unique">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">商户基础信息</span>
            </div>

            <el-form-item label="店主姓名" prop="bankuser">
              <el-input v-model.trim="shopInfo.bankuser" size="small" type="text" placeholder="请与收款卡号开户名一致"
                        auto-complete="off" class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="身份证号" prop="idnumber">
              <el-input v-model.trim="shopInfo.idnumber" size="small" type="text" placeholder="请输入" auto-complete="off"
                        class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="证件有效期" prop="idstatdate" style="display:inline-block;width:200px;">
              <el-date-picker
                :editable="false"
                :clearable="false"
                v-model="shopInfo.idstatdate"
                type="date"
                placeholder="生效年月日"
                align="center"
                popper-class="adjustPoper">
              </el-date-picker>
            </el-form-item>
            <el-form-item style="width:20px;display:inline-block;color:#262424;">至</el-form-item>

            <el-form-item style="display:inline-block;width:300px;" prop="idenddate">
              <el-date-picker
                :editable="false"
                :clearable="false"
                v-model="shopInfo.idenddate"
                type="date"
                placeholder="失效年月日"
                align="center"
                popper-class="adjustPoper">
              </el-date-picker>
            </el-form-item>

            <div class="panel-select-group fix-unique">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">绑定银行卡信息</span>
            </div>

            <el-form-item label="银行卡类型" prop="banktype">
              <el-select v-model="shopInfo.banktype" placeholder="请选择" icon="caret-bottom"
                         class="sub-account-item-info">
                <el-option :key=1 label="对私账户" :value=1></el-option>
                <el-option :key=2 label="对公账户" :value=2></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开户名" prop="bankuser">
              <el-input v-model.trim="shopInfo.bankuser" size="small" type="text" placeholder="请与店主姓名一致"
                        auto-complete="off"
                        class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="银行卡号" prop="bankaccount">
              <el-input v-model.trim="shopInfo.bankaccount" size="small" type="text" placeholder="请输入"
                        auto-complete="off"
                        class="sub-account-item-info" @blur="getCardsInfo"></el-input>
            </el-form-item><!-- @blur="getCardsInfo"-->

            <el-form-item label="预留手机号" prop="bankmobile">
              <el-input v-model.trim="shopInfo.bankmobile" size="small" type="text" placeholder="请输入"
                        auto-complete="off"
                        class="sub-account-item-info"></el-input>
            </el-form-item>

            <el-form-item label="开户地" prop="city_id">
              <!--<el-input v-model="shopInfo.banklocation" icon="caret-bottom" size="small" type="text" placeholder="请选择" auto-complete="off" class="sub-account-item-info"></el-input>-->
              <el-select v-model="shopInfo.city_id" placeholder="请选择" icon="caret-bottom" class="sub-account-item-info"
                         @change="switchBankLocation">
                <el-option
                  v-for="city in shopInfo.bankCitys"
                  :key="city.city_no"
                  :label="city.city_name"
                  :value="city.city_no">
                </el-option>
              </el-select>
            </el-form-item>

            <el-input v-model="shopInfo.bankprovince" type="hidden" auto-complete="off" class="hidden"
                      ref="bankprovince"></el-input>
            <!--<el-input v-model="shopInfo.bankcity" type="hidden" auto-complete="off" class="hidden"-->
            <!--ref="bankcity"></el-input>-->
            <el-input v-model="shopInfo.adcode" type="hidden" auto-complete="off" class="hidden"
                      ref="adcode"></el-input>

            <el-form-item label="开户总行" prop="headbankid">
              <el-select v-model="shopInfo.headbankid" placeholder="请选择" icon="caret-bottom"
                         class="sub-account-item-info" @change="switchHeadBank" filterable>
                <el-option
                  v-for="(hbank, index) in shopInfo.headbanks"
                  :key="hbank.headbankid + '@' + index"
                  :label="hbank.headbankname"
                  :value="hbank.headbankid"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开户支行" prop="bankcode" style="margin-bottom: 0;">
              <el-select v-model="shopInfo.bankcode" placeholder="请选择" icon="caret-bottom" ref="branch_bank_select"
                         class="sub-account-item-info"
                         @change="switchBranchBank" filterable>
                <el-option
                  v-for="bbank in shopInfo.branchBanks"
                  :key="bbank.code"
                  :label="bbank.name"
                  :value="bbank.code">
                </el-option>
              </el-select>
            </el-form-item>

            <!--<el-input v-model="shopInfo.area_id"  type="hidden"  auto-complete="off" class="hidden" ref="headbankname"></el-input>-->

            <el-form-item label="" class="sub-item-tip">
              <div class="sub-account-item-info-long">
                <span v-if="!!shopInfo.csphone">* 查询此银行卡的开户行请拨打：{{shopInfo.csphone}}</span>
              </div>
            </el-form-item>

            <div class="divider"></div>

            <el-form-item style="margin-left:-64px !important;">
              <el-col :span="2">
                <el-button type="text" @click="cancelCreateSubShop('shop_info')" style="text-decoration: underline">
                  放弃创建
                </el-button>
              </el-col>
              <el-col :span="5">
                <el-button type="primary" style="width:155px;" @click="preSignUp" :disabled="btnLocked">下一步</el-button>
              </el-col>
            </el-form-item>
            <div style="width:100%;padding-bottom:2px;"></div>
          </el-form>
        </div>
      </div>
    </div>


    <!-- 上传图片页-->
    <div class="panel" v-show="!infoPage">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">图片凭证信息</span>
        </div>
      </div>
      <div class="csup-panel-body">
        <div class="sub_info_wrapper">
          <el-form :model="shopInfo" label-position="left" :rules="page2_rules" ref="upload_info">
            <el-form-item label=""></el-form-item>
            <div class="panel-select-group fix-unique">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">店铺门头图片</span>
            </div>

            <el-form-item style="margin-bottom:0">
              <el-col :span="8">
                <el-upload ref="shopphoto"
                           v-loading="shopphotoloading"
                           :on-progress="startAvatarUpload"
                           class="avatar-uploader"
                           :action="uploadInterface"
                           :show-file-list="false"
                           :before-upload="beforeAvatarUpload"
                           :on-success="avatarSuccess"
                           :on-error="avatarFailed"
                           :data="{
                    category: 1,
                    source: 1,
                    tag: 'shopphoto',
                    format: 'cors',
                    userid: shopInfo.userid
                }">
                  <div v-if="shopInfo.shopphoto_url" class="avatar-wrap">
                    <img :src="shopInfo.shopphoto_url" class="avatar"> <!-- /static/img/example3.jpg   -->
                    <i class="img-tip">重新上传</i>
                  </div>
                  <div v-else class="avatar-uploader-wrap">
                    <i class="avatar-uploader-icon el-icon-plus"></i>
                    <div class="avatar-desc">点击添加图片</div>
                    <div class="avatar-tip">支持jpg／png格式</div>
                  </div>
                </el-upload>
              </el-col>
              <el-col :span="6">
                <img src="./image/example1.jpg" class="" width="240" height="180" class="example_img"/>
              </el-col>
            </el-form-item>

            <div class="image_info">* 请上传真实的店铺照片，请保证画面清晰，完整拍摄到店铺门头名称及店内陈设情况店铺门头图片。</div>

            <div class="panel-select-group fix-unique">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">店内陈设图片</span>
            </div>

            <el-form-item style="margin-bottom:0">
              <el-col :span="8">
                <el-upload
                  v-loading="goodsphotoloading"
                  :on-progress="startAvatarUpload"
                  class="avatar-uploader"
                  :action="uploadInterface"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-success="avatarSuccess"
                  :on-error="avatarFailed"
                  :data="{
                    category: 1,
                    source: 1,
                    tag: 'goodsphoto',
                    format: 'cors',
                    userid: shopInfo.userid
                }">
                  <div v-if="shopInfo.goodsphoto_url" class="avatar-wrap">
                    <img :src="shopInfo.goodsphoto_url" class="avatar">
                    <i class="img-tip">重新上传</i>
                  </div>
                  <div v-else class="avatar-uploader-wrap">
                    <i class="avatar-uploader-icon el-icon-plus"></i>
                    <div class="avatar-desc">点击添加图片</div>
                    <div class="avatar-tip">支持jpg／png格式</div>
                  </div>
                </el-upload>
              </el-col>
              <el-col :span="6">
                <img src="./image/example2.jpg" class="" width="240" height="180" class="example_img"/>
              </el-col>
            </el-form-item>
            <div class="image_info">* 需露出门店环境的全景，如：服务时的场景、超市货架全景、餐厅全景等。</div>

            <div class="panel-select-group fix-unique">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">身份证图片</span>
            </div>

            <el-form-item style="margin-bottom:0">
              <el-col :span="8">
                <el-upload
                  v-loading="idcardfrontloading"
                  :on-progress="startAvatarUpload"
                  class="avatar-uploader"
                  :action="uploadInterface"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-success="avatarSuccess"
                  :on-error="avatarFailed"
                  :data="{
                    category: 1,
                    source: 1,
                    tag: 'idcardfront',
                    userid: shopInfo.userid,
                    format: 'cors'
                }">
                  <div v-if="shopInfo.idcardfront_url" class="avatar-wrap">
                    <img :src="shopInfo.idcardfront_url" class="avatar">
                    <i class="img-tip">重新上传></i>
                  </div>
                  <div v-else class="avatar-uploader-wrap">
                    <i class="avatar-uploader-icon el-icon-plus"></i>
                    <div class="avatar-desc">点击添加图片</div>
                    <div class="avatar-tip">支持jpg／png格式</div>
                  </div>
                </el-upload>
              </el-col>
              <el-col :span="6">
                <img src="./image/example4.jpg" class="" width="240" height="180" class="example_img"/>
              </el-col>
            </el-form-item>
            <div class="image_info">* 必须使用有效期内的二代身份证，身份证号码及头像清晰可见，完整身份证正面照。</div>

            <el-form-item style="margin-bottom:0">
              <el-col :span="8">
                <el-upload
                  v-loading="idcardbackloading"
                  :on-progress="startAvatarUpload"
                  class="avatar-uploader"
                  :action="uploadInterface"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-success="avatarSuccess"
                  :on-error="avatarFailed"
                  :data="{
                    category: 1,
                    source: 1,
                    tag: 'idcardback',
                    format: 'cors',
                    userid: shopInfo.userid
                }">
                  <div v-if="shopInfo.idcardback_url" class="avatar-wrap">
                    <img :src="shopInfo.idcardback_url" class="avatar">
                    <i class="img-tip">重新上传></i>
                  </div>
                  <div v-else class="avatar-uploader-wrap">
                    <i class="avatar-uploader-icon el-icon-plus"></i>
                    <div class="avatar-desc">点击添加图片</div>
                    <div class="avatar-tip">支持jpg／png格式</div>
                  </div>
                </el-upload>
              </el-col>
              <el-col :span="6">
                <img src="./image/example3.jpg" class="" width="240" height="180" class="example_img"/>
              </el-col>
            </el-form-item>
            <div class="image_info">* 必须使用有效期内的二代身份证，有效期清晰可见，完整身份证反面照。</div>

            <el-form-item style="margin-bottom:0">
              <el-col :span="8">
                <el-upload
                  v-loading="idcardinhandloading"
                  :on-progress="startAvatarUpload"
                  class="avatar-uploader"
                  :action="uploadInterface"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-success="avatarSuccess"
                  :on-error="avatarFailed"
                  :data="{
                    category: 1,
                    source: 1,
                    tag: 'idcardinhand',
                    format: 'cors',
                    userid: shopInfo.userid
                }">
                  <div v-if="shopInfo.idcardinhand_url" class="avatar-wrap">
                    <img :src="shopInfo.idcardinhand_url" class="avatar">
                    <i class="img-tip">重新上传</i>
                  </div>
                  <div v-else class="avatar-uploader-wrap">
                    <i class="avatar-uploader-icon el-icon-plus"></i>
                    <div class="avatar-desc">点击添加图片</div>
                    <div class="avatar-tip">支持jpg／png格式</div>
                  </div>
                </el-upload>
              </el-col>
              <el-col :span="6">
                <img src="./image/example5.jpg" class="" width="240" height="180" class="example_img"/>
              </el-col>
            </el-form-item>
            <div class="image_info">* 必须使用有效期内的二代身份证，身份证本人手持证件，正面展示。</div>
            <div class="divider"></div>

            <el-form-item>
              <el-col :span="2">
                <el-button type="text" @click="cancelCreateSubShop('upload_info')">放弃创建</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" style="width:155px;" @click="backToPrePage">返回上一页</el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="success" style="width:155px;" @click="signUp" :disabled="btnLocked">确认提交</el-button>
              </el-col>
            </el-form-item>
            <div style="width:100%;padding-bottom:2px;"></div>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 最后提交后的跳转弹窗-->
    <el-dialog :visible.sync="isShowCommitDone"
               :modal="true"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               class="mydialog">
      <el-form :model="shopInfo">
        <el-form-item class="done-icon">
          <i class="el-icon-check OK"></i>
          <span class="done-text">分店创建成功！</span>
        </el-form-item>
        <el-form-item class="done-desc">分店帐号：{{shopInfo.shopAccout}}</el-form-item>
        <div class="divider" style="margin-bottom:20px"></div>
        <el-form-item class="dialog-footer">
          <el-button @click="backToShopManagement" class="backToSMBtn">门店管理</el-button>
          <el-button @click="continueToCreateSubShop" type="success">继续创建分店</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable */
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import {cardValid, formatDate} from "../../common/js/util";
  import axios from 'axios';
  import config from 'config';
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component";
  import ElSlPanel from "../../../node_modules/element-ui/packages/color-picker/src/components/sv-panel";
  import ElIcon from "../../../node_modules/element-ui/packages/icon/src/icon";
  import qs from 'qs';
  import Vue from 'vue';
  import Store from '../../common/js/store';
//  const AMap = window.AMap;
  var map = null;
  var geocoder = null;

  export default {
    components: {
      ElIcon,
      ElSlPanel,
      ElDialog,
      ElFormItem,
      ElButton,
      ElInput,
      ElForm
    },
    data() {
      let idValid = (rule, val, cb) => {
        if (!cardValid(val.trim())) {
          console.log('身份证验证成功');
          cb();
        } else {
          cb('请输入合法身份证号')
        }
      };

      let expireValid = (rule, val, cb) => {
        if (val === '') {
          cb('请选择失效年月日');
        } else if (this.shopInfo.idstatdate && val.getTime() < this.shopInfo.idstatdate.getTime()) {
          cb('生效期不能晚于失效期');
        } else {
          cb();
        }
      };

      let startValid = (rule, val, cb) => {
        if (val === '') {
          cb('请选择生效年月日');
        } else {
          if (this.shopInfo.idenddate !== '') {
            this.$refs['shop_info'].validateField('idenddate');
          }
          cb();
        }
      };

      let nameValid = (rule, val, cb) => {
        if (!/^[\u4e00-\u9fa5A-Za-z\s]*$/.test(val)) {
          cb('请输入汉字或字母');
        } else {
          cb();
        }
      };

      let shopValid = (rule, val, cb) => {
        if (!/^[\u4e00-\u9fa5A-Za-z\s\d]*$/.test(val)) {
          cb('请不要输入特殊字符');
        } else {
          cb();
        }
      };

      return {
        role: Store.get('role') || {},
        shopphotoloading: false,
        goodsphotoloading: false,
        idcardfrontloading: false,
        idcardbackloading: false,
        idcardinhandloading: false,
        mapComponentURL: '',
        isShowCommitDone: false,
        btnLocked: false,
        isShowMap: false,
        infoPage: true, // 子商户信息填写页
        uploadInterface: `${config.imgUpload}/util/v1/uploadfile`, // 上传接口
        shopInfo: {
          shopAccout: '',
          password: '', // 密码
          shopname: '', // 分店名称
          landline: '', // 顾客可联系的电话
          shoptype_id: '', // 经营类型（商户类型）id
          shoptype_name: '', // 经营类型（商户类型）
          isShowTree: false, // 是否显示经营类型树状结构
          longitude: -1, // 经度
          latitude: -1, // 纬度
          initlng: -1,  //初始经度
          initlat: -1,  //初始纬度
          city_id: '', //  城市代号
          location: '', // 店铺地址
          address: '', // 详细门牌号
          idnumber: '', // 店主身份证号
          idstatdate: '', // 身份证有效开始日期(格式：2016-01-05)
          idenddate: '', // 身份证有效截止日期(格式：2017-01-05)
          banktype: 1, // 账户类型，1，为对私，2为对公 ，默认为对私
          bankuser: '', // 开户名
          bankaccount: '', // 银行卡号
          bankmobile: '', // 预留手机号
          bankprovince: '', // 支行所属省份
          bankcode: '', // 支行联行号
          bankcity: '', // 支行所属城市
          provinceid: '', // 高德地图返回的六位区位码
          province: '', // 所在省
          area_id: '',  // 所在省id
          city: '', // 所在市
          adcode: '',
          csphone: '', // 客服电话
          headbankid: '', // 开户行总行名称
          headbankname: '', // 开户行总行名称
          bankname: '', // 开户行支行名称
          userid: '', // 预注册时返回 用于上传图片用
          username: '', // 预注册时返回 用于上传图片用
          shopphoto_url: '', // 经营场所/经营场所外景照片url
          shopphoto_name: '', // 经营场所/经营场所外景照片名
          goodsphoto_url: '', // 所售商品/经营场所内景照片url
          goodsphoto_name: '',
          idcardfront_url: '', // 身份证正面/法人身份证正面url
          idcardfront_name: '',
          idcardback_url: '', // 身份证背面/法人身份证背面url
          idcardback_name: '',
          idcardinhand_url: '', // 手持身份证合照url
          idcardinhand_name: '',
          shop_types: [], // 树状结构数据 异步返回
          bankCitys: [],
          headbanks: [], // 开户行总行数据
          branchBanks: [] // 开户行支行数据
        },
        defaultProps: {
          children: 'shoptypes',
          label: 'name',
          value: 'id'
        },
        page1_rules: {
          password: [
            {required: true, message: '请输入分店登录密码', trigger: 'blur'},
            {max: 20, min: 6, message: '请输入6~20位数字或字母', trigger: 'blur'}
          ],
          shopname: [
            {required: true, message: '请输入分店名称', trigger: 'blur'},
            {validator: shopValid}
          ],
          shoptype_name: [
            {required: true, message: '请选择经营类型'}
          ],
          location: [
            {required: true, message: '请从地图中定位店铺地址'}
          ],
          address: [
            {required: true, message: '请输入详细门牌号'}
          ],
          idnumber: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
            {validator: idValid}
          ],
          idstatdate: [
            {validator: startValid}
          ],
          idenddate: [
            {validator: expireValid}
          ],
          bankuser: [
            {required: true, message: '请输入开户名', trigger: 'blur'},
            {validator: nameValid}
          ],
          bankaccount: [
            {required: true, message: '请输入银行卡号', trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (/\d/g.test(+val)) {
                  cb();
                } else {
                  cb('银行卡号必须是数字')
                }
              }
            }
          ],
          bankmobile: [
            {required: true, message: '请输入开户银行预留手机号', trigger: 'blur'},
            {
              validator: (rule, val, cb) => {
                if (/!\d/g.test(+val)) {
                  cb('手机号必须是数字');
                } else if (!/^1[3578][01379]\d{8}$|^1[34578][01256]\d{8}$|^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/.test(val)) {
                  cb('必须输入合法手机号')
                } else {
                  cb();
                }
              }
            }
          ],
          bankcity: [
            {required: true, message: '请选择开户地'}
          ],
          headbankid: [
            {required: true, message: '请选择开户总行'}
          ],
          bankcode: [
            {required: true, message: '请选择开户支行'}
          ]

        },
        page2_rules: {
          shopphoto_url: [
            {required: true, message: '请上传经营场所外景照片'}
          ],
          goodsphoto_url: [
            {required: true, message: '请上传经营场所内景照片'}
          ],
          idcardfront_url: [
            {required: true, message: '请上传法人身份证正面照片'}
          ],
          idcardback_url: [
            {required: true, message: '请上传法人身份证背面照片'}
          ],
          idcardinhand_url: [
            {required: true, message: '请上传手持身份证合照'}
          ]
        }

      }
    },
    created() {
      this.getOperationType();
//      this.initMapAPI();
    },
    methods: {
      startAvatarUpload(event, file, fileList) {
        this[file['__ob__'].dep.subs[0].vm.data.tag + 'loading'] = true;
      },
      initMapAPI() {
        if (this.isShowMap) return;
        var AMap = window.AMap;
        try {
          map = new AMap.Map('geolocation');
        }catch(e) {
           console.log(e);
           this.$message.error('地图定位失败，请刷新页面以便重新获取定位信息...');
           return;
        }
        map.plugin(['AMap.Geolocation', 'AMap.Geocoder'], () => {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
            convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,         // 显示定位按钮，默认：true
            buttonPosition: 'LB',     // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', this.onLocationComplete); // 返回定位信息
          AMap.event.addListener(geolocation, 'error', this.onLocationError);       // 返回定位出错信息
          geocoder = new AMap.Geocoder({
            city: '全国',
            extensions: 'base'
          })
        });
      },
      hideMapDialog() {
        this.isShowMap = false;
        this.mapComponentURL = '';
        window.removeEventListener('message', this.getMessageFromRemote);
      },
      showMap(e) {
        if (this.isShowMap) return;
        this.isShowMap = true;
        this.mapComponentURL = `${config.mapURL}?center=${this.shopInfo.initlng},${this.shopInfo.initlat}&key=${config.mapKey}`;
        Vue.nextTick(() => {
          this.initIframe();
        })
      },
      initIframe() {
        var iframe = null;
        iframe = document.getElementById('miframe');
        var cw = iframe.contentWindow;
        iframe.onload = null;
        iframe.onload = function () {
          iframe.style.display = 'block';
          iframe.style.zIndex = 10;
          cw.postMessage('hello', config.mapURL);
        };
        window.addEventListener('message', this.getMessageFromRemote, false);
      },
      getMessageFromRemote(e) {
        var _this = this;
        if (e.data.name) {
          console.log(e.data);
          let lng = +e.data.location.split(',')[0];
          let lat = +e.data.location.split(',')[1];
//          this.shopInfo.location = e.data.address + e.data.name;
          geocoder && geocoder.getAddress([lng, lat], (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              _this.shopInfo.headbanks.length = 0;
              _this.shopInfo.branchBanks.length = 0;
              _this.onLocationComplete({
                addressComponent: result.regeocode.addressComponent,
                formattedAddress: e.data.address + ' ' + e.data.name,
                position: {
                  lng: lng,
                  lat: lat
                }
              }, 'reLocation');
              _this.$message({
                type: 'success',
                message: '您选择了新的店铺地址：' + result.regeocode.formattedAddress
              });
            } else {
              console.log('选取定位后获取有效地址信息失败');
            }
          })
          this.hideMapDialog();
        }
      },
      backToShopManagement() {
        this.$refs['upload_info'].resetFields();
        this.$refs['shop_info'].resetFields();
        this.$router.push('/main/chainmanage');
      },
      continueToCreateSubShop() {
          this.$refs['upload_info'].resetFields();
          this.$refs['shop_info'].resetFields();
          this.shopInfo.shopphoto_url = ''; // 经营场所/经营场所外景照片url
          this.shopInfo.shopphoto_name = ''; // 经营场所/经营场所外景照片名
          this.shopInfo.goodsphoto_url = ''; // 所售商品/经营场所内景照片url
          this.shopInfo.goodsphoto_name = '';
          this.shopInfo.idcardfront_url = ''; // 身份证正面/法人身份证正面url
          this.shopInfo.idcardfront_name = '';
          this.shopInfo.idcardback_url =  ''; // 身份证背面/法人身份证背面url
          this.shopInfo.idcardback_name = '';
          this.shopInfo.idcardinhand_url = ''; // 手持身份证合照url
          this.shopInfo.idcardinhand_name = '';
          this.shopInfo.userid = '';
          this.shopInfo.username = '';
          this.backToPrePage();
          this.isShowCommitDone = false;
      },

      beforeAvatarUpload(file) {
        const isRightImgType = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isRightImgType) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        return isRightImgType;
      },
      avatarSuccess(res, file) {
        let data = res.data;
        if (res.respcd === config.code.OK) {
          this.shopInfo[data.tag + '_url'] = data.url;
          this.shopInfo[data.tag + '_name'] = data.name;
        } else {
          this.$message.error(res.resperr);
        }
        this[file['__ob__'].dep.subs[0].vm.data.tag + 'loading'] = false;
      },
      avatarFailed(err, file) {
        this.$message.error(err);
        console.log(file);
      },
      cancelCreateSubShop(formName) { // 放弃创建
        var _this = this;
        this.$confirm('放弃创建将清空所有您输入的分店账户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$refs[formName].resetFields();
          _this.shopInfo.userid = '';
          _this.shopInfo.username = '';
          _this.$router.push('/main/chainmanage');
        }).catch(() => {
          console.log('就不放弃，哈哈~')
        });
      },
      backToPrePage() {
        this.infoPage = !this.infoPage;
        // 自动滚动到顶部
        document.body.scrollTop = 0;
      },
      preSignUp() { // 预注册
        this.$refs['shop_info'].validate((valid) => {
          if (valid) {
            if (this.shopInfo.userid) {
              this.infoPage = !this.infoPage;
              Vue.nextTick(function () {
                document.querySelectorAll('.user_name')[0].scrollIntoView();
              })
            } else {
              this.btnLocked = true;
              axios.post(`${config.ohost}/mchnt/user/pre_signup`, {
                mode: 'bigmchnt',
                format: 'cors'
              }).then((res) => {
                let data = res.data;
                if (data.respcd === config.code.OK) {
                  this.shopInfo.userid = data.data.userid;
                  this.shopInfo.username = data.data.username;
                  this.infoPage = !this.infoPage;
                  Vue.nextTick(function () {
                    document.querySelectorAll('.user_name')[0].scrollIntoView();
                  })
                } else {
                  this.$message.error(data.resperr);
                }
                this.btnLocked = false;
              }).catch((e) => {
                this.$message.error(e);
                this.btnLocked = false;
              });
            }

          } else {
            this.$message.error('您还有部分账户信息未填写')
          }
        })

      },
      signUp() { // 最终提交
        var _this = this;
        this.$refs['upload_info'].validate((valid) => {
          if (valid) {
            this.btnLocked = true;
            axios.post(`${config.ohost}/mchnt/user/signup`, qs.stringify({
              username: this.shopInfo.username,
              password: this.shopInfo.password,
              bankuser: this.shopInfo.bankuser,
              idnumber: this.shopInfo.idnumber,
              bankprovince: this.shopInfo.bankprovince,
              bankcity: this.shopInfo.bankcity,
              banktype: this.shopInfo.banktype,
              bankname: this.shopInfo.bankname,
              headbankname: this.shopInfo.headbankname,
              bankcode: this.shopInfo.bankcode,
              bankaccount: this.shopInfo.bankaccount,
              bankmobile: this.shopInfo.bankmobile,
              shopname: this.shopInfo.shopname,
              shoptype_id: this.shopInfo.shoptype_id + '',
              province: this.shopInfo.province,
              city: this.shopInfo.city,
              location: this.shopInfo.location,
              address: this.shopInfo.address,
              provinceid: this.shopInfo.provinceid,
              shopphoto: this.shopInfo.shopphoto_name,
              goodsphoto: this.shopInfo.goodsphoto_name,
              idcardfront: this.shopInfo.idcardfront_name,
              idcardback: this.shopInfo.idcardback_name,
              idcardinhand: this.shopInfo.idcardinhand_name,
              idstatdate: formatDate(this.shopInfo.idstatdate),
              idenddate: formatDate(this.shopInfo.idenddate),
              longitude: this.shopInfo.longitude,
              latitude: this.shopInfo.latitude,
              mode: 'bigmchnt',
              format: 'cors'
            }), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
            }).then((res) => {
              _this.btnLocked = false;
              let data = res.data;
              if (data.respcd === config.code.OK) {
                _this.shopInfo.shopAccout = data.data.mobile;
                _this.isShowCommitDone = true;
              } else {
                _this.$message.error(data.resperr);
              }

            })
              .catch((e) => {
                _this.$message.error(e);
                _this.btnLocked = false;
              });
          }
        })
      },
      onLocationError(e) {
        console.log('定位错误信息：', e);
      },
      onLocationComplete(loc, flag) {
          debugger;
        console.log(loc)
        let _adcode = loc.addressComponent.adcode;
        let _province = loc.addressComponent.province;
        let _city = loc.addressComponent.city;
        this.shopInfo.adcode = this.shopInfo.provinceid = _adcode || '';
        this.shopInfo.province = _province;
        this.shopInfo.city = _city;
        if (!_city) {
          this.shopInfo.city = _province;
        }
        this.shopInfo.longitude = loc.position.lng;
        this.shopInfo.latitude = loc.position.lat;
        if (!flag) {
          this.shopInfo.initlng = loc.position.lng;
          this.shopInfo.initlat = loc.position.lat;
        }
        this.shopInfo.location = loc.formattedAddress;

        if (_adcode) {
          this.getBankLocation();
        }
      },
      getCardsInfo() { // 获取银行卡信息
        if (!this.shopInfo.bankaccount.length) return;
        axios.get(`${config.ohost}/mchnt/tool/cardsinfo`, {
          params: {
            q: this.shopInfo.bankaccount,
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              if (data.data.records.length) {
                this.shopInfo.csphone = data.data.records[0].csphone
              }
            } else {
              this.$message.error(data.resperr);
            }
          })
          .catch((e) => {
            this.$message.error(e);
          });
      },
      getBankLocation() {
        axios.get(`${config.ohost}/mchnt/tool/cities`, {
          params: {
            area_no: this.shopInfo.adcode,
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              console.log('获取开户地成功')
              this.shopInfo.bankCitys = data.data.cities; // 支行所在市数组
              this.shopInfo.bankprovince = data.data.area_name; // 支行所在省
              this.shopInfo.area_id = data.data.area_id; // 支行所在省id
              this.shopInfo.headbankid = '';
              this.shopInfo.headbankname = '';
              this.shopInfo.bankcity = "";
              this.shopInfo.city_id = "";
            } else {
              this.$message.error(data.resperr);
            }
          })
          .catch((e) => {
            this.$message.error(e);
          });
      },
      switchBankLocation(value, label) { // 切换开户地 获取开户行总行
        if (label) this.shopInfo.bankcity = label;
        this.shopInfo.city_id = value;
        let _this = this;
        axios.get(`${config.ohost}/mchnt/tool/headbanks`, {
          params: {
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              console.log('获取获取银行总行成功');
              _this.shopInfo.headbanks = data.data.records;
              _this.shopInfo.headbankname = '';
              _this.shopInfo.headbankid = '';
              _this.shopInfo.branchBanks.length = 0;
              _this.shopInfo.bankname = '';
              _this.shopInfo.bankcode = '';
            } else {
              _this.$message.error(data.resperr);
            }
          })
          .catch((e) => {
            _this.$message.error(e);
          });
      },
      switchHeadBank(value, label, index) {
        if (label) {
          this.shopInfo.headbankname = label;
        }
        if (index) {
          this.shopInfo.csphone = this.shopInfo.headbanks[index].csphone;
        }
        this.shopInfo.headbankid = value;

        axios.get(`${config.ohost}/mchnt/tool/branchbanks`, {
          params: {
            cityid: this.shopInfo.city_id,
            headbankid: value,
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              if (data.data.records.length) {
                console.log('获取获取银行支行成功');
                this.shopInfo.branchBanks = data.data.records;
                this.shopInfo.bankname = "";
                this.shopInfo.bankcode = "";
              } else {
                this.shopInfo.branchBanks.length = 0;
//                this.$message.error('该开户总行下无支行，请重新选择开户总行');
              }
            } else {
              this.$message.error(data.resperr);
            }
          })
          .catch((e) => {
            this.$message.error(e);
          });
      },
      switchBranchBank(value, label) {
        if (label) this.shopInfo.bankname = label;
        this.shopInfo.bankcode = value;
        console.log('所有设置完毕：', this.shopInfo);
      },
      getOperationType() { // 获取经营类型 传0
        axios.get(`${config.ohost}/mchnt/tool/shoptypes`, {
          params: {
            pid: 0,
            format: 'cors'
          }
        })
          .then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              console.log('获取商户类型列表成功')
              this.shopInfo.shop_types = data.data.shop_types;
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
        this.shopInfo.shoptype_id = node.id;
        this.shopInfo.shoptype_name = node.name;
      },
      addMapScript() {
        // 引用地图相关js
        if (!this.role.isBaoshang && !this.role.haiwai) {
          var _self = this;
          var script = document.createElement('script');
          script.id = 'unique_map';
          script.type = "text/javascript";
          script.src = "https://webapi.amap.com/maps?v=1.3&key=0500da1f6f0d37a6683b590aee534b8b";
          document.body.insertBefore(script, document.querySelectorAll('script')[document.querySelectorAll('script').length - 1]);
          script.onload = function() {
            _self.initMapAPI();
          }
        }
      }
    },
    mounted() {
      var _self = this;
      document.addEventListener('click', (evt) => {
        if ('el-tree-node'.indexOf(evt.target.className) == -1) {
          if (_self.shopInfo.isShowTree) this.shopInfo.isShowTree = false;
        }
        if (evt.target.parentElement.id === 'op_type' && evt.target.className.indexOf('el-input__icon el-icon-caret-bottom') === -1) {
          evt.preventDefault();
          _self.showTreeComponent(evt);
        }
      }, false);
      this.addMapScript();
      Vue.nextTick(() => {
        document.querySelectorAll('.header')[0].scrollIntoView();
      })
    },
    beforeDestroy() {
      var toRemoved = document.getElementById('unique_map');
      if(toRemoved) {
        toRemoved.onload = null;
        document.body.removeChild(toRemoved);
      }
    }
  }
</script>
<style lang="scss">
  .avatar-uploader {
    .el-loading-spinner {
      width: 68% !important;
    }
  }

  .csup-panel-body {
    padding: 0;
    .sub_info_wrapper {
      .image_info {
        font-size: 14px;
        color: #8a8c92;
        height: 16px;
        line-height: 16px;
        padding: 10px 0 20px 30px;
      }
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
        .panel-select-group.fix-unique {
          justify-content: flex-start !important;
        }
        .hidden {
          display: none;
        }
        .el-form-item {
          margin: 20px 0 20px 30px;
          .sub-account-item-info {
            width: 240px;
            cursor: pointer;
          }
          .sub-account-item-info-long {
            width: 410px;
            line-height: 44px;
          }
          .el-form-item__content {
            .el-col {
              .el-date-editor.el-input.el-date-editor--date {
                .el-picker-panel.el-date-picker.adjustPoper {
                  min-width: 254px !important;
                }
              }
            }
          }
        }
        .el-form-item.sub-item-tip {
          margin-top: 0;
        }

      }
    }
  }

  #miframe {
    width: 660px;
    height: 520px;
    display: none;
    top: 50% !important;
    left: 50% !important;
    margin-left: -330px !important;
    margin-top: -210px !important;
    overflow: hidden !important;
    position: fixed !important;
    z-index: 999;
    background-color: #ffffff;
  }

  #geolocation_mask {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden !important;
    position: fixed !important;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.5);
    /*#close-geo {*/
    /*width: 16px;*/
    /*height: 16px;*/
    /*line-height: 16px;*/
    /*z-index: 9999;*/
    /*position: absolute;*/
    /*top: 6px;*/
    /*right: 8px;*/
    /*}*/
  }

  /*.map-dialog {*/
  /*width:660px;*/
  /*height:420px;*/
  /*.el-dialog__header {*/
  /*padding:0;*/
  /*}*/
  /*.el-dialog__body {*/
  /*padding:0;*/
  /*width:660px;*/
  /*height:420px;*/
  /*}*/
  /*}*/
  /*.el-message-box {*/
  /*.el-message-box__title {*/
  /*.el-message-box__headerbtn {*/
  /*visibility: hidden !important;*/
  /*}*/
  /*}*/
  /*}*/
  .backToSMBtn {
    color: #fe9b20;
    border: 1px solid #fe9b20;
    margin-left: 180px;
  }

  .done-icon {
    height: 46px;
    text-align: center;
    line-height: 46px;
    .OK {
      width: 36px;
      height: 36px;
      line-height: 40px;
      border-radius: 50%;
      border: 3px solid #7ed321;
      font-size: 24px;
      text-align: center;
      color: #7ed321;
    }
    span.done-text {
      font-size: 26px;
      color: #262424;
      padding-left: 10px;
      display: inline-block;
    }
  }

  .done-desc {
    text-align: center;
    font-size: 17px;
    color: #262424;
  }

  .btn-map {
    display: inline-block;;
    width: 132px;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    border-radius: 4px;
    border: 1px solid #fe9b20;
    text-align: center;
    font-size: 14px;
    color: #fe9b20;
    cursor: pointer;
  }

  .avatar-wrap {
    posistion: relative !important;
    .avatar {
      width: 240px;
      height: 180px;
      display: block;
    }
    .img-tip {
      width: 240px;
      height: 46px;
      line-height: 46px;
      position: absolute;
      bottom: 13px;
      left: 0;
      color: #ffffff;
      text-align: center;
      background-color: rgba(138, 140, 146, 0.5);
      display: none;
    }
    &:hover .img-tip {
      display: block;
      /*animation: growUp .5s ease;*/
      -webkit-animation-name: growUp;
      -webkit-animation-duration: 500ms;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-timing-function: ease-in-out;
    }
    @-webkit-keyframes growUp {
      0% {
        height: 0px;
      }
      100% {
        height: 46px;
      }
    }
  }

  .avatar-uploader-wrap {
    width: 240px;
    height: 144px;
    background-color: #f2f2f2;
    text-align: center;
    padding-top: 37px;
    .avatar-uploader-icon {
      width: 50px;
      height: 50px;
      display: inline-block;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      border: 1px dashed #c2c2c2;
      color: #c2c2c2;
      font-size: 20px;
    }
    .avatar-desc {
      font-size: 14px;
      color: #8a8c92;
    }
    .avatar-tip {
      color: #bdbdbd;
    }

  }

  .el-date-editor .el-picker-panel {
    min-width: 254px !important;
  }

</style>

<template>
  <div>
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>会员功能</span>
        <i class="icon-right_arrow"></i>
        <span>会员储值</span>
        <i class="icon-right_arrow"></i>
        <span>创建储值</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">预览储值信息</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="review-info__wrapper">
          <div class="review-info flex" v-if="!role.single">
            <span class="info-title">适用门店</span>
            <div class="info-desc__wrapper">
              <div class="info-desc">
                <div><span v-for="(shop,index) in shopList">{{ shop.shop_name }}{{ index < shopList.length - 1?"、":"" }}</span></div>
                <div class="info-desc remark mt-0 lh-16 ml-0">注：请确保以上门店均已开通储值服务，否则无法正常储值</div>
              </div>
            </div>
          </div>
          <p class="review-info">
            <span class="info-title">开始时间</span>
            <span class="info-desc"><span class="highlight ml-0">{{ data.start_time }}</span></span>
          </p>
          <p class="review-info">
            <span class="info-title">结束时间</span>
            <span class="info-desc"><span class="highlight ml-0">{{ data.end_time }}</span></span>
          </p>
          <div class="review-info flex">
            <span class="info-title">储值规则</span>
            <div class="info-desc__wrapper">
              <div class="info-desc">
                <div v-for="rule in data.rules">储值<span class="highlight">{{ rule.pay_amt | addZero }}</span>元送<span class="highlight">{{ rule.present_amt | addZero }}</span>元
                </div>
                <!-- <div class="info-desc remark mt-20">备注：红包费用由商户承担</div> -->
              </div>
            </div>
          </div>
          <p class="review-info flex">
            <span class="info-title no-shrink">储值规则备注</span>
            <span class="info-desc"><span class="highlight ml-0">{{ data.desc }}</span></span>
          </p>
          <p class="review-info">
            <span class="info-title">预留手机号</span>
            <span class="info-desc"><span class="highlight ml-0">{{ data.mobile }}</span></span>
          </p>
        </div>
        <div class="divider"></div>
        <div class="form-submit_wrapper">
          <span class="cancel" @click="backToEdit">返回修改</span>
          <div class="panel-btn__download panel-btn__download_detail" @click="submit">
            <i class="el-icon-loading" v-if="iconShow"></i>
            <i class="icon-create"></i>
            <span>确认提交</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import config from 'config';
  import { deepClone, formatData } from '../../common/js/util';
  import Store from '../../common/js/store';

  export default {
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.data = Store.get('storagedata');
      });
    },
    data() {
      return {
        role: Store.get('role') || {},
        iconShow: false,
        data: {}
      };
    },
    computed: {
      shopList() {
        let shopData = deepClone(this.$store.state.shopData || {});
        return this.getshopList(shopData.list || []);
      }
    },
    methods: {
      backToEdit() {
        this.$router.go(-1);
      },

      getshopList(list) {
        let ids = this.data.mchnt_ids || [];
        let lists = [];
        if(ids[0] === '') {
          lists = list;
          lists.shift();
        }else {
          for(let i of ids) {
           for(let val of list) {
             if(val.uid === i) {
               lists.push(val);
             }
           }
          }
        }
        return lists;
      },

      fixData() {
        var data = deepClone(this.data);
        data.rules.forEach((v) => {
          v.pay_amt = formatData(v.pay_amt, 100);
          v.present_amt = formatData(v.present_amt, 100);
        });
        return data;
      },
      submit() {
        let data = this.fixData();
        this.iconShow = true;
        // 新建
        if(!this.data.flag) {
          // axios.post(`${config.host}/merchant/prepaid/create`, data)
          axios.post(`http://172.100.107.196:9099/merchant/prepaid/create`, data)
          .then((res) => {
            this.iconShow = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.$message({
                type: 'success',
                message: '创建储值活动成功'
              });
              this.$router.push('/main/memberstorage');
            } else {
              this.$message.error(data.resperr);
            }
          })
          .catch(() => {
            this.iconShow = false;
            this.$message.error('创建储值活动失败');
          });
        } else {
          // 编辑活动
          // axios.post(`${config.host}/merchant/prepaid/alter`, data)
          axios.post(`http://172.100.107.196:9099/merchant/prepaid/alter`, data)
          .then((res) => {
            this.iconShow = false;
            let data = res.data;
            if(data.respcd === config.code.OK) {
              this.$message({
                type: 'success',
                message: '修改储值活动成功'
              });
              this.$store.dispatch('getStorageData');
              this.$router.push('/main/memberstorage');
            } else {
              this.$message.error(data.resperr);
            }
          })
          .catch(() => {
            this.iconShow = false;
            this.$message.error('修改储值活动失败');
          });
        }

      }
    }
};
</script>

<style>
  .no-shrink {
    flex-shrink: 0;
  }
</style>

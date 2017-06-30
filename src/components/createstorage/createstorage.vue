<template>
  <div class="createpacket">
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
          <span class="panel-header__desc">设置储值活动</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="myform_wrapper">
          <el-form :rules="formrules" :model="form" ref="form">
            <el-form-item label="适用门店" v-if="!role.single">
              <span v-if="shopData.length > 0" v-for="(shop,index) in shopData">{{ shop.shop_name }}{{ index < shopData.length - 1?"、":"" }}</span>
              <span v-else>无</span>
              <div class="remark mt-0 lh-16">注：请确保以上门店均已开通储值服务，否则无法正常储值</div>
            </el-form-item>
            <el-form-item label="开始时间" prop="start_time">
              <el-date-picker v-model="form.start_time" type="date" placeholder="请选择开始时间" size="small" :editable="false" :clearable="false">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="end_time">
              <el-date-picker v-model="form.end_time" type="date" placeholder="请选结束时间" size="small" :editable="false" :clearable="false">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="设置规则" min-width="150">
              <div class="storage-item" v-for="(item, index) in form.rulesData">
                <span>储值</span>
                <el-form-item :prop="'pay_amt' + index">
                  <el-input size="small" type="number" v-model.trim="form['pay_amt' + index]" @change="bindPayAmtValue(index)"></el-input>
                </el-form-item>
                <span>元送</span>
                <el-form-item :prop="'present_amt' + index">
                  <el-input size="small" type="number" v-model.trim="form['present_amt' + index]" @change="bindPresentAmtValue(index)"></el-input>
                </el-form-item>
                <span>元</span>
                <el-button size="small" @click="addRule" :disabled="len === 4" v-if="index === 0" class="ml-15" :plain="true" type="primary">增加规则</el-button>
                <el-button size="small" v-if="index !== 0" @click="removeRule(item)" class="ml-15" :plain="true" type="danger">删除</el-button>
              </div>
            </el-form-item>
            <el-form-item label="储值规则备注" prop="desc">
              <el-input type="textarea" placeholder="请输入储值规则" v-model="form.desc" :autosize="{ minRows: 3, maxRows: 7 }" max-length="200" class="w-500"></el-input>
              <div class="stro-info mt-20 error-42"><p>例如:</p> <p>1、一旦储值不予退款；</p> <p>2、储值用户可享所有商品优惠；</p></div>
            </el-form-item>
            <el-form-item label="预留手机号" prop="mobile">
              <el-input size="small" type="number" v-model.trim="form.mobile" class="panel-select-input-220"></el-input>
            </el-form-item>
          </el-form>
          <div class="divider"></div>
          <div class="form-submit_wrapper">
            <span class="cancel" @click="cancelCreation">放弃创建</span>
            <div class="panel-btn__download panel-btn__download_detail" @click="preview">
              <i class="icon-create"></i>
              <span>提交预览</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate, deepClone} from '../../common/js/util';
  import Validator from '../../validator';
  import Store from '../../common/js/store';

  export default {
    data() {
      let expireValid = (rule, val, cb) => {
        if(val === '') {
          cb('请选择活动结束时间');
        } else if(this.form.start_time && val.getTime() < this.form.start_time.getTime()) {
          cb('活动结束时间必须大于开始时间');
        } else {
          cb();
        }
      };
      let startValid = (rule, val, cb) => {
        if(val === '') {
          cb('请选择活动开始时间');
        } else {
          if(this.form.end_time !== '') {
            this.$refs['form'].validateField('end_time');
          }
          cb();
        }
      };
      let descValid = (rule, val, cb) => {
        if(val === '') {
          cb('请输入储值规则描述');
        } else if(val.length >= 40) {
          cb('请不要超过40个字符');
        } else {
          cb();
        }
      };

      return {
        role: Store.get('role') || {},
        form: {
          start_time: '',
          end_time: '',
          mobile: '',
          desc: '',
          pay_amt0: null,
          present_amt0: null,
          pay_amt1: null,
          present_amt1: null,
          pay_amt2: null,
          present_amt2: null,
          pay_amt3: null,
          present_amt3: null,
          rulesData: [
            {
              grid_index: 1,
              pay_amt: null,
              present_amt: null
            }
          ]
        },
        formrules: {
          start_time: [
            { validator: startValid }
          ],
          end_time: [
            { validator: expireValid }
          ],
          desc: [
            { validator: descValid }
          ],
          mobile: [
            { validator: Validator.mobileValid }
          ],
          pay_amt0: [
            { validator: Validator.stoAmtValid }
          ],
          present_amt0: [
            { validator: Validator.stoAmtValid }
          ],
          pay_amt1: [
            { validator: Validator.stoAmtValid }
          ],
          present_amt1: [
            { validator: Validator.stoAmtValid }
          ],
          pay_amt2: [
            { validator: Validator.stoAmtValid }
          ],
          present_amt2: [
            { validator: Validator.stoAmtValid }
          ],
          pay_amt3: [
            { validator: Validator.stoAmtValid }
          ],
          present_amt3: [
            { validator: Validator.stoAmtValid }
          ]
        }
      };
    },
    computed: {
      data() {
        return {
          start_time: this.form.start_time && formatDate(this.form.start_time),
          end_time: this.form.end_time && formatDate(this.form.end_time),
          mobile: this.form.mobile,
          desc: this.form.desc,
          rules: this.form.rulesData
        };
      },
      len() {
        return this.form.rulesData.length;
      },
      shopData() {
        let shopData = deepClone(this.$store.state.shopData);
        shopData.length !== 0 && shopData.list.shift();
        return shopData.list;
      }
    },
    methods: {
      cancelCreation() {
        this.$router.push('/main/memberstorage');
      },
      preview() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            Store.set('storagedata', this.data);
            this.$router.push({ name: 'reviewstorage' });
          } else {
            this.$message.error('请核对信息是否完整');
          }
        });
      },
      addRule() {
        let lastIndex = this.len + 1;
        this.form.rulesData.push({
          grid_index: lastIndex,
          pay_amt: null,
          present_amt: null
        });
      },
      removeRule(item) {
        let index = this.form.rulesData.indexOf(item);
        this.form.rulesData.splice(index, 1);
        this.form.rulesData.forEach((v, index) => {
          v.grid_index = index + 1;
        });
      },
      bindPayAmtValue(index) {
        this.form.rulesData[index].pay_amt = this.form['pay_amt' + index];
      },
      bindPresentAmtValue(index) {
        this.form.rulesData[index].present_amt = this.form['present_amt' + index];
      }
    }
  };
</script>

<style lang="scss">
  .w-500 {
    width: 500px;
  }
  .storage-item {
    margin-bottom: 15px;
  }
  .ml-15 {
    margin-left: 15px;
  }
  .stro-info {
    margin-top: 10px;
    color: black !important;
    font-size: 14px !important;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .error-42 {
    & + .el-form-item__error {
      top: 42%;
    }
  }
  .lh-16 {
    line-height: 16px;
  }
</style>

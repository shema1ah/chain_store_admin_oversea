<template>
  <div class="createpacket">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>会员功能</span>
        <i class="icon-right_arrow"></i>
        <span>会员储值</span>
        <i class="icon-right_arrow"></i>
        <span>修改储值</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">修改储值活动</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="myform_wrapper">
          <el-form :rules="formrules" :model="form" ref="form" >
            <!-- <el-form-item label="适用门店" prop="sub_mchnt_list">
              <el-select v-model="form.sub_mchnt_list" placeholder="请选择门店" size="small">
                <el-option v-for="shop in shopData.list" :label="shop.shop_name" :value="shop.uid">
                </el-option>
              </el-select>
            </el-form-item> -->
            <div v-if="state === 0">
              <el-form-item label="适用门店">
                <span>全部</span>
              </el-form-item>
              <el-form-item label="开始时间" prop="start_time">
                <el-date-picker v-model="form.start_time" type="date" placeholder="请选择开始时间"size="small" :clearable="false">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" prop="end_time">
                <el-date-picker v-model="form.end_time" type="date" placeholder="请选择结束时间" size="small" :clearable="false">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="设置规则" min-width="150">
                <div class="storage-item" v-for="(item, index) in form.rulesData">
                  <span>储值</span>
                  <el-form-item :prop="'pay_amt' + index">
                    <el-input size="small" v-model.number="form.rulesData[index].pay_amt" @change="bindPayAmtValue(index)"></el-input>
                  </el-form-item>
                  <span>元送</span>
                  <el-form-item :prop="'present_amt' + index">
                    <el-input size="small" v-model.number="form.rulesData[index].present_amt" @change="bindPresentAmtValue(index)"></el-input>
                  </el-form-item>
                  <span>元</span>
                  <el-button size="small" @click="addRule" :disabled="len === 4" v-if="index === 0" class="ml-15" type="primary" :plain="true">增加规则</el-button>
                  <el-button size="small" v-if="index !== 0" @click="removeRule(item)" class="ml-15" type="danger" :plain="true">删除</el-button>
                </div>
              </el-form-item>
              <el-form-item label="储值规则备注" prop="desc">
                <el-input type="textarea" placeholder="请输入储值规则" v-model="form.desc" :autosize="{ minRows: 3 }" class="w-500"></el-input>
              </el-form-item>
              <el-form-item label="预留手机号" prop="mobile">
                <el-input size="small" v-model="form.mobile" class="panel-select-input-220"></el-input>
              </el-form-item>
            </div>
            <div v-if="state === 1">
              <el-form-item label="适用门店">
                <span>全部</span>
              </el-form-item>
              <el-form-item label="开始时间" prop="start_time">
                <el-date-picker v-model="form.start_time" type="date" placeholder="请选择开始时间" size="small" :clearable="false" :disabled="true">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间" prop="end_time">
                <el-date-picker v-model="form.end_time" type="date" placeholder="请选结束时间" size="small" :clearable="false">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="设置规则" min-width="150">
                <div class="storage-item" v-for="(item, index) in form.rulesData">
                  <span>储值</span>
                  <el-form-item :prop="'pay_amt' + index">
                    <el-input size="small" v-model.number="form.rulesData[index].pay_amt" @change="bindPayAmtValue(index)" :disabled="true"></el-input>
                  </el-form-item>
                  <span>元送</span>
                  <el-form-item :prop="'present_amt' + index">
                    <el-input size="small" v-model.number="form.rulesData[index].present_amt" @change="bindPresentAmtValue(index)" :disabled="true"></el-input>
                  </el-form-item>
                  <span>元</span>
                </div>
              </el-form-item>
              <el-form-item label="储值规则备注" prop="desc">
                <el-input type="textarea" placeholder="请输入储值规则" v-model="form.desc" :autosize="{ minRows: 3 }" class="w-500"></el-input>
                <div class="stro-info"><p>例如:</p> <p>1、一旦储值不予退款；</p> <p>2、储值用户可享所有商品优惠；</p></div>
              </el-form-item>
              <el-form-item label="预留手机号" prop="mobile">
                <el-input size="small" v-model="form.mobile" class="panel-select-input-220" :disabled="true"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="divider"></div>
          <div class="form-submit_wrapper">
            <span class="cancel" @click="cancelAlteration">放弃修改</span>
            <div class="panel-btn__download panel-btn__download_detail" @click="preview">
              <i class="icon-create"></i>
              <span>提交预览</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import {formatTime} from 'common/js/util.js';
  import Validator from 'src/validator';
  import Store from 'common/js/store.js';

  export default {

    data() {
      let expireValid = (rule, val, cb) => {
        if(val === '') {
          cb('请选择活动结束时间');
        } else if(val.getTime() < this.form.start_time.getTime()) {
          cb('活动结束时间必须大于开始时间');
        } else {
          cb();
        }
      };
      let alterData = Store.get('alterstoredata');
      let info = alterData.activity_info;
      let rules = alterData.activity_info.rules;
      let state = alterData.activity_status.status;
      return {
        state: state,
        form: {
          start_time: new Date(info.start_time),
          end_time: new Date(info.end_time),
          mobile: info.mch_mobile,
          desc: info.desc,
          pay_amt0: rules[0] ? rules[0].pay_amt : '',
          present_amt0: rules[0] ? rules[0].present_amt : '',
          pay_amt1: rules[1] ? rules[1].pay_amt : '',
          present_amt1: rules[1] ? rules[1].present_amt : '',
          pay_amt2: rules[2] ? rules[2].pay_amt : '',
          present_amt2: rules[2] ? rules[2].present_amt : '',
          pay_amt3: rules[3] ? rules[3].pay_amt : '',
          present_amt3: rules[3] ? rules[3].present_amt : '',
          rulesData: rules,
          id: alterData.activity_info.activity_id
        },
        formrules: {
          start_time: [
            { required: true, message: '请输入开始时间' }
          ],
          end_time: [
            { validator: expireValid }
          ],
          desc: [
            { required: true, message: '请输入储值规则描述' }
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
          start_time: this.form.start_time && formatTime(this.form.start_time, 'yyyy-MM-dd'),
          end_time: this.form.end_time && formatTime(this.form.end_time, 'yyyy-MM-dd'),
          mobile: this.form.mobile,
          desc: this.form.desc,
          rules: this.form.rulesData,
          flag: 'alter',
          activity_id: this.form.id
        };
      },
      len() {
        return this.form.rulesData.length;
      }
    },
    methods: {
      cancelAlteration() {
        console.log(this.$refs['form']);
        this.$router.push('/memberstorage');
      },
      preview() {
        console.log(this.data);
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
          pay_amt: '',
          present_amt: ''
        });
        console.log(this.form.rulesData);
      },
      removeRule(item) {
        let index = this.form.rulesData.indexOf(item);
        this.form.rulesData.splice(index, 1);
        this.form.rulesData.forEach((v, index) => {
          v.grid_index = index + 1;
        });
        console.log(this.form.rulesData);
      },
      bindPayAmtValue(index) {
        this.form['pay_amt' + index] = this.form.rulesData[index].pay_amt;
      },
      bindPresentAmtValue(index) {
        this.form['present_amt' + index] = this.form.rulesData[index].present_amt;
      }
    }
  };
</script>

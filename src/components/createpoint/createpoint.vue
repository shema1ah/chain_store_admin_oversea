<template>
  <div class="createcollect">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>会员功能</span>
        <i class="icon-right_arrow"></i>
        <span>会员集点</span>
        <i class="icon-right_arrow"></i>
        <span>创建集点</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">输入集点信息</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="myform_wrapper">
          <el-form :rules="formrules" :model="form" ref="form" class="myRate">
            <el-form-item label="目标点数" prop="exchange_pt">
              <el-rate :max=10 show-text void-icon-class="el-rate-off" :icon-classes="['el-rate-on','el-rate-on','el-rate-on']" :texts="textList" text-color="#FE9B20" v-model="form.exchange_pt">
              </el-rate>
              <div class="gray-explain">* 大数据分析表明，选择5点可使回头客明显增加，活动效果更优！</div>
            </el-form-item>
            <el-form-item label="集点条件">
              <span>支付满</span>
              <el-form-item prop="obtain_amt">
                <el-input size="small" v-model.number="form.obtain_amt" type="number"></el-input>
              </el-form-item>
              <span>元可集一个点</span>
            </el-form-item>
            <el-form-item prop="obtain_limit" class="explain">
              <el-checkbox-group v-model="form.obtain_limit" @change="handleCheckedLimitChange">
                <el-checkbox :label="一次付款可以集多点" :key="0">一次付款可以集多点</el-checkbox>
              </el-checkbox-group>
              <div class="content">适合有顾客批量购买多个商品的情况</div>
              <div class="content">例如：支付20元可集一点，当用户微信支付80元时，可以直接集4点</div>
            </el-form-item>
            <el-form-item label="礼品名称" prop="goods_name">
              <el-input size="small" type="text" v-model.trim="form.goods_name" class="panel-select-input-220"></el-input>
            </el-form-item>
            <el-form-item label="礼品价格" prop="goods_amt">
              <el-input size="small" type="text" v-model.trim="form.goods_amt" class="panel-select-input-220"></el-input>
              <span>元</span>
            </el-form-item>
            <el-form-item label="开始时间" prop="start_time">
              <el-date-picker v-model="form.start_time" type="date" placeholder="请选择开始时间" size="small" :editable="false" :clearable="false">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="expire_time">
              <el-date-picker v-model="form.expire_time" type="date" placeholder="请选结束时间" size="small" :editable="false" :clearable="false">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="mchnt_id_list" label="适用门店">
              <el-select v-model="form.mchnt_id_list" placeholder="全部" size="small">
                <el-option
                  v-for="shop in shopData.list"
                  :label="shop.shop_name"
                  :value="shop.uid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="divider"></div>
          <div class="form-submit_wrapper">
            <span class="cancel" @click="cancelCreat">放弃创建</span>
            <div class="panel-btn__download panel-btn__download_detail" @click="preview">
              <i class="icon-create"></i>
              <span>提交预览</span>
            </div>
            <span class="black-explain">*注：请确保以上门店均已开通储值服务，否则无法正常储值</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import {formatDate, deepClone} from '../../common/js/util';
  // import Validator from '../../validator';
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
          if(this.form.expire_time !== '') {
            this.$refs['form'].validateField('expire_time');
          }
          cb();
        }
      };

      return {
        textList: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点'],
        form: {
          exchange_pt: null,
          obtain_amt: null,
          obtain_limit: 1,
          goods_name: '',
          goods_amt: '',
          start_time: '',
          expire_time: '',
          mchnt_id_list: ''
        },
        formrules: {
          start_time: [
            { validator: startValid }
          ],
          expire_time: [
            { validator: expireValid }
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
      }

    }
  };
</script>

<style lang="scss">
  .createcollect {

    .gray-explain {
      color: #8A8C92;
      font-size: 14px;
    }

    .black-explain {
      color: #262424;
      font-size: 14px;
      margin-left: 20px;
    }

    .explain {
      .el-form-item__content {
        display: inline-block;
        background: rgba(254, 155, 32,0.1);
        padding: 10px;

        .el-checkbox {
          margin: 0;
          .el-checkbox__label {
            color: #262424;
            font-size: 16px;
          }
        }

        .content {
          font-size: 12px;
          color: #8A8C92;
          height: 18px;
          line-height: 18px;
        }
      }
    }

  }

</style>

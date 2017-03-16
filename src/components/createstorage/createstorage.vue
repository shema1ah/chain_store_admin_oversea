<template>
  <div class="createpacket">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>会员功能</span>
        <i class="icon-right_arrow"></i>
        <span>会员红包</span>
        <i class="icon-right_arrow"></i>
        <span>创建储值</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header panel-header__fix">
        <div class="panel-select-group">
          <span class="panel-header__desc">输入储值信息</span>
        </div>
      </div>
      <div class="panel-body">
        <div class="myform_wrapper">
          <el-form :rules="formrules" :model="form" ref="form">
            <el-form-item label="适用门店" prop="sub_mchnt_list">
              <el-select v-model="form.sub_mchnt_list" placeholder="请选择门店" size="small">
                <el-option v-for="shop in shopData.list" :label="shop.shop_name" :value="shop.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="start_time">
              <el-date-picker v-model="form.start_time" type="datetime" placeholder="请选择开始时间" size="small">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="expire_time">
              <el-date-picker v-model="form.expire_time" type="datetime" placeholder="请选结束时间" size="small">
              </el-date-picker>
            </el-form-item>
            
            <el-form-item label="设置储值规则">
              <span>储值</span>
              <el-form-item prop="form.">
                <el-input size="small" v-model.number="form.limit_amt"></el-input>
              </el-form-item>
              <span>元送</span>
              <el-form-item prop="limit_amt">
                <el-input size="small" v-model.number="form.limit_amt"></el-input>
              </el-form-item>
              <span>元</span>
            </el-form-item>
            <el-form-item label="储值规则备注">
              <el-input size="small" v-model.number="form.limit_amt" autosize type="textarea" ></el-input>
            </el-form-item>
            <el-form-item label="预留手机号">
              <el-input size="small" v-model.number="form.mobile" ></el-input>
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
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {

        },
        formrules: {

        }
      };
    },
    computed: {
      shopData() {
        return this.$store.state.shopData;
      }
    },
    methods: {
      cancelCreation() {
        this.$router.push('/memberstorage');
      },
      preview() {
        let packet = this.$refs['form'];
        packet.$refs['form'].validate((valid) => {
          if (valid) {
            console.log(packet.data);
            this.$router.push({
              name: 'reviewpacket',
              params: packet.data
            });
          } else {
            console.log(packet.data);
          }
        });
      }
    }
  };
</script>

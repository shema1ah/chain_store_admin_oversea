
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
        <div class="sub_info_wrapper">
          <el-form :model="shopInfo">
            <el-form-item label="分店登录密码" prop="">
              <el-input v-model="shopInfo.pass" size="small" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>

            <div class="panel-select-group">
              <i class="divider-icon"></i>
              <span class="panel-header__desc">店铺基本信息</span>
            </div>

            <el-form-item label="分店名称" prop="">
              <el-input v-model="shopInfo.pass" size="small" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>

            <el-form-item label="经营类型" prop="">
              <el-input v-model="shopInfo.pass" size="small" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>

            <el-form-item label="分店登录密码" prop="">
              <el-input v-model="shopInfo.pass" size="small" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
//  import axios from 'axios';
//  import config from 'config';
export default {
  components: {
    ElInput,
    ElForm},
  data() {
      return {
         shopInfo: {
           userName: 'zozo'
         }
      }
    },
  created() {

  },
  methods: {

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
    }
  }
</style>

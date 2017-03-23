<template>
  <div class="storage-item">
    <span>储值</span>
    <el-form-item :prop="'pay_amt' + index">
      <el-input size="small" v-model="`${form.pay_amt}${index}`"></el-input>
    </el-form-item>
    <span>元送</span>
    <el-form-item prop="present_amt">
      <el-input size="small" v-model="form.present_amt"></el-input>
    </el-form-item>
    <span>元</span>
    <i class="el-icon-plus" @click="addRule" v-if="index === len - 1"></i>
    <i class="el-icon-minus" v-if="index !== len - 1" @click="removeRule"></i>
  </div>
</template>

<script>
  export default {
    props: {
      form: {
        type: Object
      },
      index: '',
      len: ''
    },
    methods: {
      addRule() {
        this.$emit('addRule');
      },
      removeRule() {
        this.$emit('removeRule');
      },
      model(index) {
        return 'form.pay_amt' + index;
      }
    }
  };
</script>

<style lang="scss">
  .storage-item {
    margin-bottom: 15px;
  }
</style>

<template>
  <div class="redpacket">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>会员功能</span>
        <i class="icon-right_arrow"></i>
        <span>会员储值</span>
      </div>
      <router-link to="/createstorage">
        <div class="banner-btn">
          <i class="icon-create"></i>
          <span class="banner-btn__desc">新建储值</span>
        </div>
      </router-link>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-select-group">
          
          <div class="panel-select__wrapper">
            <span class="panel-select__desc">活动状态</span>
            <el-select v-model="stateValue" placeholder="全部" size="small" @change="stateChange">
              <el-option
                v-for="item in stateOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="panel-select__wrapper">
            <span class="panel-select__desc">店铺名称</span>
            <el-select v-model="nameValue" placeholder="全部" size="small" @change="nameChange">
              <el-option
                v-for="shop in shopData.list"
                :label="shop.shop_name"
                :value="shop.uid">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <el-table
          :data="storageData.data"
          style="width: 100%"
          row-class-name="el-table__row_fix"
          v-loading="loading"
          element-loading-text="拼命加载中..."
          >
          <el-table-column
            prop="activity_info.desc"
            label="活动时间">
          </el-table-column>
          <el-table-column
            prop="activity_status.status"
            label="活动状态">
          </el-table-column>
          <el-table-column
            prop="storagePeopleNum"
            label="储值人数">
          </el-table-column>
          <el-table-column
            prop="storageNum"
            label="储值金额">
          </el-table-column>
          <el-table-column
            prop="storageRule"
            label="储值规则">
          </el-table-column>

          <el-table-column
            width="300"
            label="操作">
            <template scope="scope">
              <el-button type="text" size="small" class="el-button__fix">查看详情</el-button>
    <!--           <el-button type="text" size="small" class="el-button__fix">下载物料</el-button> -->
              <el-dropdown :hide-on-click="true">
                <span class="el-dropdown-link el-dropdown-link__fix">
                  更多<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="el-dropdown-menu__fix">
                  <el-dropdown-item class="el-dropdown-item__fix">修改活动</el-dropdown-item>
                  <el-dropdown-item class="el-dropdown-item__fix">终止活动</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="storageData.total_entries > 10">
        <el-pagination
          layout="prev, pager, next"
          :total="storageData.total_entries"
          @current-change="currentChange">
        </el-pagination>
      </div>
      <div class="table_placeholer" v-else></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import config from 'config';

  export default {
    data() {
      return {
        stateOptions: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '未开始',
            value: 0
          },
          {
            label: '进行中',
            value: 1
          },
          {
            label: '已结束',
            value: 2
          },
          {
            label: '已终止',
            value: 3
          }
        ],
        stateValue: '',
        nameValue: '',
        storageData: [],
        loading: false
      };
    },
    computed: {
      shopData() {
        return this.$store.state.shopData;
      },
      basicParams() {
        return {
          pos: 0,
          count: 10,
          activityStatus: ''
        };
      }
    },
    created() {
      axios.get(`${config.host}/merchant/prepaid/list`, {
        params: this.basicParams
      })
      .then((res) => {
        let data = res.data;
        if(data.respcd === config.code.OK) {
          this.storageData = data.data;
        } else {
          this.$message.error(data.resperr);
        }
      })
      .catch(() => {
        this.$message.error('首次获取储值列表失败');
      });
    },
    methods: {
      createStorage() {

      },
      stateChange(state) {
        this.basicParams.activityStatus = state;
        this.getStorageData();
      },
      nameChange() {

      },
      currentChange(current) {
        this.basicParams.pos = current - 1;
        this.getStorageData();
      },
      getStorageData() {
        axios.get(`${config.host}/merchant/prepaid/list`, {
          params: this.basicParams
        })
        .then((res) => {
          let data = res.data;
          if(data.respcd === config.code.OK) {
            this.storageData = data.data;
          } else {
            this.$message.error(data.resperr);
          }
        })
        .catch(() => {
          this.$message.error('获取储值列表失败');
        });
      }
    }
  };
</script>

<style lang="scss">
  
</style>

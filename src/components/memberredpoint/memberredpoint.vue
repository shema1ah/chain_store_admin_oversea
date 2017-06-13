<template>
  <div class="collectPacket">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>会员功能</span>
        <i class="icon-right_arrow"></i>
        <span>会员集点</span>
      </div>
      <router-link to="/main/memberredpoint/createpoint">
        <div class="banner-btn">
          <i class="icon-create"></i>
          <span class="banner-btn__desc">新建集点</span>
        </div>
      </router-link>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-select-group">
          <div class="panel-select__wrapper">
            <span class="panel-select__desc">活动状态</span>
            <el-select v-model="stateValue" placeholder="全部" size="small" @change="stateChange">
              <el-option v-for="item in stateLists" :label="item.name" :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="panel-select__wrapper">
            <span class="panel-select__desc">店铺名称</span>
            <el-select v-model="nameValue" placeholder="全部" size="small" @change="nameChange">
              <el-option v-for="shop in shopData.list" :label="shop.shop_name" :value="shop.uid">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <el-table :data="collectData.result" style="width: 100%" row-class-name="el-table__row_fix" v-loading.body="loading" id="memberredcollect">
          <el-table-column label="活动时间" min-width="140">
            <template scope="scope">
              <p><span class="scope_cotent_title">开始时间</span>{{ scope.row.start_time | removeHMS }}</p>
              <p><span class="scope_cotent_title">结束时间</span>{{ scope.row.expire_time | removeHMS }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="exchange_pt" label="集点条件" min-width="150">
          </el-table-column>
          <el-table-column prop="goods_name" label="礼品详情" min-width="100">
          </el-table-column>
          <el-table-column prop="status_chn" label="状态">
          </el-table-column>
          <el-table-column prop="in_person_no" label="参与人数">
          </el-table-column>
          <el-table-column prop="exchange_num" label="已兑换">
          </el-table-column>
          <el-table-column prop="total_amt" label="刺激收益">
          </el-table-column>
          <el-table-column prop="who_create" label="活动来源" min-width="140">
          </el-table-column>
          <el-table-column min-width="150" label="操作">
            <template scope="scope">
              <el-button type="text" size="small" class="el-button__fix" @click="showDetail(scope.id)">查看详情</el-button>
              <el-dropdown>
                <span class="el-dropdown-link el-dropdown-link__fix">
                  更多<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="el-dropdown-menu__fix collect">
                  <el-dropdown-item class="el-dropdown-item__fix" :disabled="scope.row.state===2 || scope.row.state ===3" @click.native="editActivity(scope.row.id)">修改活动</el-dropdown-item>
                  <el-dropdown-item class="el-dropdown-item__fix" :disabled="scope.row.state===2 || scope.row.state ===3" @click.native="stopActivity(scope.row.id)">停止活动</el-dropdown-item>
                  <a :href="collectionHref" @click="downLoad(scope.row.id)">
                    <el-dropdown-item command=3 class="el-dropdown-item__fix">下载宣传物料</el-dropdown-item>
                  </a>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination_wrapper" v-if="collectData.count >= 10">
        <el-pagination
          ref="page"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          :total="collectData.count"
          @current-change="currentChange"
          :current-page="currentpage">>
        </el-pagination>
      </div>
      <div class="table_placeholder" v-else></div>
    </div>
    <el-dialog :visible.sync="isShowDetail" class="detail_dialog" title="集点详情">
      <el-row>
        <el-col :span="8" class="title">目标点数</el-col>
        <el-col :span="16" class="desc"></el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">集点条件</el-col>
        <el-col :span="16" class="desc">
          <span></span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">礼品名称</el-col>
        <el-col :span="16" class="desc"></el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">礼品价格</el-col>
        <el-col :span="16" class="desc"></el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">开始时间</el-col>
        <el-col :span="16" class="desc"></el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="title">结束时间</el-col>
        <el-col :span="16" class="desc"></el-col>
      </el-row><el-row>
        <el-col :span="8" class="title">适用门店</el-col>
        <el-col :span="16" class="desc">
          <div class="desc-item"></div>
          <div class="remark">备注：红包费用由商户承担</div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios';
  import config from 'config';
  // import {formatDate} from '../../common/js/util';

  export default {
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        Object.assign(vm, {
          flag: false,
          currentpage: 1,
          pageSize: 10,
          nameValue: '',
          stateValue: ''
        });

        // 延时改变
        setTimeout(() => {
          Object.assign(vm, {
            flag: true
          });
        }, 200);
      });
    },
    data() {
      return {
        collectData: [],
        isShowDetail: false,
        collectionHref: 'javascript:;',
        pageSize: 10,
        nameValue: '',
        stateValue: '',
        loading: false,
        currentpage: 1,
        detailData: {},
        stateLists: [
          {
            name: '全部',
            value: ''
          },
          {
            name: '未开始',
            value: 0
          },
          {
            name: '进行中',
            value: 1
          },
          {
            name: '已结束',
            value: 2
          },
          {
            name: '已终止',
            value: 3
          }
        ]
      };
    },
    computed: {
      basicParams() {
        return {
          sub_uid: this.nameValue,
          stateOptions: this.stateValue,
          length: this.pageSize,
          curpage: this.currentpage
        };
      },
      shopData() {
        return this.$store.state.shopData;
      }
    },
    created() {
      this.getData();
    },

    methods: {
      // 改变活动状态
      stateChange() {
        this.currentChange();
      },

      // 改变店铺名称
      nameChange() {
        this.currentChange();
      },

      // 请求数据
      getData() {
        this.loading = true;
        axios.get(`${config.host}/merchant/card/points`, {
          params: this.basicParams
        }).then((res) => {
          this.loading = false;
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.collectData = data.data;
          } else {
            this.$message.error(data.respmsg);
          }
        }).catch(() => {
          this.loading = false;
          this.$message.error('获取集点数据失败!');
        });
      },

      // 改变size
      handleSizeChange(size) {
        this.pageSize = size;
        this.currentChange();
      },

      // 改变当前页
      currentChange(current) {
        if (!current && this.currentpage !== 1) {
          this.currentpage = 1;
          return;
        }
        if (current) {
          this.currentpage = current;
        }
        if (this.flag) {
          this.getData();
        }
      },

      // 停止活动
      stopActivity(id) {
        this.$confirm('活动停止后，顾客消费将不再获得集点，是否确认停止?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '关闭'
        }).then(() => {
          axios.post(`${config.ohost}/mchnt/mis/card/close_actv`, {
            id: id
          }).then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.$message({
                type: 'success',
                message: '集点活动停止成功'
              });
              this.getData();
            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
            this.$message.error("停止活动失败");
          });
        }).catch(() => {
          console.log("取消");
        });
      },

      // 编辑活动
      editActivity(id) {
        console.log(id);
        axios.post(`${config.host}/merchant/activity/close`, {
          id: id
        }).then((res) => {
            let data = res.data;
            if (data.respcd === config.code.OK) {
              this.$message({
                type: 'success',
                message: '红包活动取消成功'
              });

            } else {
              this.$message.error(data.respmsg);
            }
          }).catch(() => {
            this.$message.error("停止活动失败");
        });
      },

      // 下载
      downLoad(id) {
        this.collectionHref = 'javascript:;';
        axios.post(`${config.ohost}/mchnt/mis/card/download_materiel`, {
          id: id
        }).then((res) => {
          let data = res.data;
          if (data.respcd === config.code.OK) {
            this.$message({
              type: 'success',
              message: '红包活动取消成功'
            });
            this.collectionHref = data.promotion_url;
          } else {
            this.$message.error(data.respmsg);
          }
        }).catch(() => {
          this.$message.error("请求失败");
        });
      }
    }
  };
</script>
<style lang="scss">
.collect {
  a {
    color: #FE9B20;
  }
}
</style>

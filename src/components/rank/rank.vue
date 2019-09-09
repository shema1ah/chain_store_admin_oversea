<template>
  <div v-loading="loading">
    <div class="banner_wrapper">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>{{$t('diancan.Qr.smart')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('diancan.Rank.index')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="t-wrap">
      <div class="t-title">{{$t('diancan.Rank.index')}}</div>
      <div class="t-wrap-inner">
        <el-table :empty-text="$t('diancan.Manage.emptytext')" :data="cateList" style="width: 100%" row-class-name="el-table__row_fix" v-loading="loading" class="dc-cate-table" v-loadmore="loadMoreCate">
          <el-table-column :label="$t('diancan.Rank.sort')" prop="rank" width="100"></el-table-column>
          <el-table-column :label="$t('diancan.Rank.category')" prop="name" min-width="50"></el-table-column>
          <el-table-column :label="$t('diancan.Rank.op')" min-width="50">
            <template slot-scope="scope">
              <div class="t-op">
                <span v-if="scope.row.rank !== 1">
                  <span @click="topCtrl(scope.row, 'cate')">{{$t('diancan.Rank.top')}}</span>
                  <span>|</span>
                  <span @click="upCtrl(scope.row, 'cate')">{{$t('diancan.Rank.up')}}</span>
                  <span>|</span>
                </span>
                <span v-if="scope.row.rank !== totalCate">
                  <span @click="downCtrl(scope.row, 'cate')">{{$t('diancan.Rank.down')}}</span>
                  <span>|</span>
                </span>
                <span @click="openPro(scope.row.id)">{{$t('diancan.Rank.rank')}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="t-bottom">
          <div>
            <el-button class="t-button" @click="saveCate" :disabled="cateDisabled">
              {{$t('diancan.Rank.save')}}
            </el-button>
          </div>
          <div>{{$t('diancan.Rank.total', [totalCate])}}</div>
        </div>
        <el-dialog :title="$t('diancan.Rank.rank')" :visible.sync="diaShow" @close="handleClose">
          <el-table :empty-text="$t('diancan.Manage.emptytext')" :data="proList" style="width: 100%" row-class-name="el-table__row_fix" v-loading="proloading" v-loadmore="loadMorePro" class="dc-pro-table">
            <el-table-column :label="$t('diancan.Rank.sort')" prop="rank" width="100"></el-table-column>
            <el-table-column :label="$t('diancan.Rank.name')" prop="name" min-width="50"></el-table-column>
            <el-table-column :label="$t('diancan.Rank.op')" min-width="50">
              <template slot-scope="scope">
                <div class="t-op">
                  <span v-if="scope.row.rank !== 1">
                    <span @click="topCtrl(scope.row, 'pro')">{{$t('diancan.Rank.top')}}</span>
                    <span>|</span>
                    <span @click="upCtrl(scope.row, 'pro')">{{$t('diancan.Rank.up')}}</span>
                  </span>
                  <span v-if="scope.row.rank !== 1 && scope.row.rank !== totalPro">|</span>
                  <span v-if="scope.row.rank !== totalPro">
                    <span @click="downCtrl(scope.row, 'pro')">{{$t('diancan.Rank.down')}}</span>
                  </span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="t-bottom">
            <div>{{$t('diancan.Rank.total', [totalPro])}}</div>
            <div>
              <el-button class="t-c-button " @click="handleClose">
                {{$t('diancan.Rank.cancel')}}
              </el-button>
              <el-button class="t-button-s" @click="savePro" :disabled="proDisabled">
                {{$t('diancan.Rank.save')}}
              </el-button>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import config from "config"
import Http from "../../http"
export default {
  data () {
    return {
      loading: false,
      proloading: false,
      cateList: [],
      proList: [],
      diaShow: false,
      totalCate: 0,
      totalPro: 0,
      page: 0,
      pageSize: 40,
      pagepro: 0,
      cateDisabled: true,
      proDisabled: true,
      cateLoad: true,
      proLoad: true,
      cateId: ''
    }
  },
  methods: {
    openPro (id) {
      this.diaShow = true
      this.pagepro = 0
      this.cateId = id
      this.proList = []
      this.proLoad = true
      this.proDisabled = true
      this.getProList()
    },
    handleClose () {
      this.diaShow = false
    },
    async getCateList () {
      try {
        this.loading = true
        let res = await Http.get('/goods/overseas_cate_list', {
          page: this.page,
          pagesize: this.pageSize,
          'format': 'cors'
        })
        this.loading = false
        let data = res.data
        if (data.respcd === config.code.OK) {
          this.totalCate = data.data.count
          let list = [...data.data.list]
          if (list.length === this.pageSize) {
            this.cateLoad = true
          }
          let cateList = [...this.cateList]
          this.cateList = [...cateList.concat(list)]
          this.cateList.sort((a, b) => {
            return b.weight - a.weight
          })
          this.cateList.map((item, idx) => {
            item.rank = idx + 1
          })
        } else {
          this.$message.error(data.resperr);
        }
      } catch (e) {
        this.$message.error(this.$t('common.netError'))
      }
    },
    async getProList () {
      try {
        this.proloading = true
        let res = await Http.get('/goods/overseas_goods_list', {
          page: this.pagepro,
          pagesize: this.pageSize,
          'format': 'cors',
          cateid: this.cateId
        })
        this.proloading = false
        let data = res.data
        if (data.respcd === config.code.OK) {
          this.totalPro = data.data.count
          let list = [...data.data.list]
          if (list.length === this.pageSize) {
            this.proLoad = true
          }
          let proList = [...this.proList]
          this.proList = [...proList.concat(list)]
          this.proList.sort((a, b) => {
            return b.weight - a.weight
          })
          this.proList.map((item, idx) => {
            item.rank = idx + 1
          })
        } else {
          this.$message.error(data.resperr);
        }
      } catch (e) {
        this.$message.error(this.$t('common.netError'))
      }
    },
    topCtrl (item, type) {
      function ctrl(list) {
        let idx = item.rank - 1
        let topW = list[0].weight
        let iW = item.weight
        list.splice(idx, 1)
        list.unshift(item)
        list[0].weight = topW
        list[idx].weight = iW
        for (let i = 1; i < idx; i++) {
          list[i].weight--
        }
        list.map((item, index) => {
          item.rank = index + 1
        })
      }
      if (type === 'cate') {
        this.cateDisabled = false
        ctrl(this.cateList)
      } else if (type === 'pro') {
        this.proDisabled = false
        ctrl(this.proList)
      }
    },
    upCtrl (item, type) {
      let idx = item.rank - 1
      let prevIdx = idx - 1
      if (prevIdx === 0) {
        this.topCtrl(item, type)
        return
      }
      let ctrl = (list) => {
        let prevItem = list[prevIdx]
        let pW = prevItem.weight
        let iW = item.weight
        this.$set(list, prevIdx, item)
        this.$set(list, idx, prevItem)
        list[idx].weight = iW
        list[prevIdx].weight = pW
        list.map((item, index) => {
          item.rank = index + 1
        })
      }
      if (type === 'cate') {
        this.cateDisabled = false
        ctrl(this.cateList)
      } else if (type === 'pro') {
        this.proDisabled = false
        ctrl(this.proList)
      }
    },
    downCtrl (item, type) {
      let ctrl = (list) => {
        let idx = item.rank - 1
        let nextIdx = idx + 1
        let nextItem = list[nextIdx]
        let nW = nextItem.weight
        let iW = item.weight
        this.$set(list, nextIdx, item)
        this.$set(list, idx, nextItem)
        list[idx].weight = iW
        list[nextIdx].weight = nW
        list.map((item, index) => {
          item.rank = index + 1
        })
      }
      if (type === 'cate') {
        this.cateDisabled = false
        ctrl(this.cateList)
      } else if (type === 'pro') {
        this.proDisabled = false
        ctrl(this.proList)
      }
    },
    async saveCate () {
      let list = []
      this.cateList.map(item => {
        list.push({
          id: item.id,
          weight: item.weight
        })
      })
      try {
        this.cateDisabled = true
        let res = await Http.post('/goods/overseas_catesort', {
          cates: list,
          'format': 'cors'
        })
        this.cateDisabled = false
        let data = res.data
        if (data.respcd === config.code.OK) {
          this.$message.success(this.$t('diancan.Rank.saved'))
        } else {
          this.$message.error(data.resperr);
        }
      } catch (e) {
        this.$message.error(this.$t('common.netError'))
      }
    },
    async savePro () {
      let list = []
      this.proList.map(item => {
        list.push({
          unionid: item.unionid,
          weight: item.weight
        })
      })
      try {
        this.proDisabled = true
        let res = await Http.post('/goods/overseas_goodssort', {
          goods: list,
          'format': 'cors'
        })
        this.proDisabled = false
        let data = res.data
        if (data.respcd === config.code.OK) {
          this.$message.success(this.$t('diancan.Rank.saved'))
          this.handleClose()
        } else {
          this.$message.error(data.resperr);
        }
      } catch (e) {
        this.$message.error(this.$t('common.netError'))
      }
    },
    loadMoreCate (row, column, cell, event) {
      if (this.cateLoad) {
        this.cateLoad = false
        this.page++
        this.getCateList()
      }
    },
    loadMorePro (row, column, cell, event) {
      if (this.proLoad) {
        this.proLoad = false
        this.pagepro++
        this.getProList()
      }
    }
  },
  created () {
    this.getCateList()
  }
}
</script>
<style lang="scss">
.t-wrap{
  margin: 25px;
  background: #fff;
}
.t-title{
  line-height: 54px;
  font-size: 18px;
  color: #FF8100;
  text-indent: 19px;
}
.t-wrap-inner{
  margin: 20px;
}
.t-op{
  color: #FF8100;
  font-size: 14px;
  span{
    cursor: pointer;
  }
}
.t-bottom{
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  font-size: 16px;
}
.t-button{
  background-color: #7ED321;
  border-color: #7ED321;
  color: #fff;
  width: 172px;
  height: 40px;
  border-radius: 3px;
  &:hover{
    background-color: #7ED321;
    border-color: #7ED321;
    color: #fff;
  }
}
.t-button-s{
  background-color: #7ED321;
  border-color: #7ED321;
  color: #fff;
  width: 100px;
  height: 40px;
  border-radius: 3px;
  &:hover{
    background-color: #7ED321;
    border-color: #7ED321;
    color: #fff;
  }
}
.t-c-button{
  background-color: #fff;
  border-color: #FE9B20;
  color: #FE9B20;
  width: 100px;
  height: 40px;
  border-radius: 3px;
  margin-right: 13px;
}
</style>

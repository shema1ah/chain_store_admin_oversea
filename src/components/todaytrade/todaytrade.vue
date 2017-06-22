<template>
  <div class="content">
    <div class="banner_wrapper">
      <div class="banner-breadcrumb">
        <span>今日收款</span>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <div class="panel-select-group panel-select-group__justify">
          <span class="panel-header__desc">实时交易</span>
          <span style="padding-right:30px">每5s自动刷新</span>
        </div>
      </div>
      <div class="panel-body">
        <el-table
          v-loading="loading"
          :data="trades"
          row-class-name="el-table__row_fix"
          class="trade-table">
          <el-table-column
            prop="shopname"
            label="店铺名称/ID">
          </el-table-column>
          <el-table-column
            prop="opuid"
            label="操作员">
          </el-table-column>
          <el-table-column
            prop="busicd"
            label="交易类型">
            <template scope="scope">{{ scope.row.busicd | busicdText }}</template>
          </el-table-column>
          <el-table-column
            prop="sysdtm"
            min-width="150"
            label="交易时间">
            <template scope="scope">{{ scope.row.sysdtm }}</template>
          </el-table-column>
          <el-table-column
            label="交易金额">
            <template scope="scope">
              <!-- <div class="table-title">{{}}元</div> -->
              <div class="table-content">实收{{ scope.row.txamt | formatCurrency }}元</div>
              <div v-show="scope.row.mchnt_coupon" class="table-content">商家红包{{ scope.row.mchnt_coupon | formatCurrency }}元</div>
              <div v-show="scope.row.coupon_amt > 0" class="table-content">平台补贴{{ scope.row.coupon_amt | formatCurrency }}元</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="cancel"
            label="交易状态">
            <template scope="scope">{{ scope.row.cancel | tradeStatus }}</template>
          </el-table-column>
          <el-table-column
            prop="syssn"
            min-width="210"
            label="流水号">
          </el-table-column>
        </el-table>
      </div>
      <footer class="view-more">
        <router-link to="/main/transctl">查看更多 &gt;&gt;</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from 'config'
  // export '../../mock/data.json'
  export default {
    props: ['shop'],
    data() {
      return {
        trades: [],
        loading: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.loading = true
        this.trades = []
        axios.get(`${config.o2host}/trade/v1/tradelist?busicd=000000,700000,800101,800107,800108,800201,800207,800208,800401,800407,800408,800501,800507,800508,800601,800607,800608&start=1&len=10&respcd=0000&fix=1&stat=0`)
        .then((res) => {
          let data = res.data
          if (data.respcd === config.code.OK) {
            let tradeskey = data.data.tradelist.head
            let tradesvalue = data.data.tradelist.body
            for (let key in tradesvalue) {
              let tradesObject = {}
              for (let variable in tradeskey) {
                tradesObject[tradeskey[variable]] = tradesvalue[key][variable]
                // note key 是json string 只提取有用的 mchnt_coupon
                if (tradeskey[variable] === 'note') {
                  let noteObject = JSON.parse(tradesObject['note'])
                  tradesObject['mchnt_coupon'] = noteObject.mchnt_coupon
                }
                if (tradeskey[variable] === 'opuid') {
                  tradesObject['opuid'] = '000' + tradesObject['opuid']
                }
                tradesObject['shopname'] = this.shop.shopname
              }
              this.trades.push(tradesObject)
            }
            this.loading = false
          } else {
            this.$message.error(data.respmsg)
          }
        })
        setTimeout(this.fetchData, 5000)
      }
    }
  }
</script>

<style lang="scss">
  .table-title {
    font-size: 16px;
  }
  .trade-table {
    width:100%;
    min-height:661px;
  }
  .view-more {
    text-align: right;
    line-height: 50px;
    padding-right: 30px;
    a {
      color: #FE9B20;
      font-size: 17px;
      &:hover {
        text-decoration: underline; 
      }
    }
  }
</style>

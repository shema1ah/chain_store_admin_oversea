import Vue from 'vue'

let filters = {

  formatCurrency (number) {
    if (isNaN(number)) {
      return
    }
    return (number / 100).toFixed(2)
  },

  removeHMS (time) {
    return time.split(' ')[0]
  },

  addZero (number) {
    if (isNaN(number)) {
      return
    }
    return (number * 100 / 100).toFixed(2)
  },

  tradeStatus (cancel) {
    if (cancel === 0) {
      return '交易取消'
    } else {
      return '交易成功'
    }
  },

  busicdText (busicd) {
    if (busicd.indexOf('8002') !== -1) {
      return '微信消费'
    } else if (busicd.indexOf('8001') !== -1) {
      return '支付宝收款'
    } else {
      return busicd
    }
  }

}

Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k])
})

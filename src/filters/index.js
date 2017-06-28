import Vue from 'vue'

let filters = {

  formatCurrency (number) {
    if (isNaN(number)) {
      return
    } else if (number === 0) {
      return 0
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
    if (parseInt(cancel) === 0) {
      return '交易成功'
    } else {
      return '已撤销'
    }
  },

  busicdText (busicd) {
    let frontNumber = busicd.substr(0, 4)
    if (frontNumber === '8002') {
      return '微信收款'
    } else if (frontNumber === '8001') {
      return '支付宝收款'
    } else if (frontNumber === '7000') {
      return '储值收款'
    } else {
      return busicd
    }
  }

}

Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k])
})

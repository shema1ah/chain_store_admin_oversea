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
  }

}

Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k])
})

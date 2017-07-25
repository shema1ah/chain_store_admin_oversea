/**
 * Created by leon on 17/7/18.
 */

'use strict';

exports.__esModule = true;
exports.default = {
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    tip: 'tips',
    all: 'all',
    netError: 'net error',
    loading: 'loading...'
  },
  shopmng: { // 门店管理模块
    crumbs: {
      L1: 'Shop Management'
    },
    title: {
      baseInfo: 'Base Info',
      subInfo: 'SubShop Info'
    },
    panel: {
      shopName: 'Shop Name',
      loginAccount: 'Login Account',
      btn: {
        editPwd: 'modify password',
        editSub: 'edit subShop',
        editSubTag: 'edit subShop tag',
        down: 'download code'
      },
      table: {
        subName: 'subshop name',
        loginAccount: 'Login Account',
        regTime: 'register time',
        subTag: 'subshop tag',
        op: 'operation',
        detail: 'detail',
        more: 'more',
        editPwd: 'modify pwd',
        delSub: 'del sub'
      }
    },
    dialog: {
      editPwd: 'modify pwd',
      loginAccount: 'login account',
      inputNewPwd: 'input new pwd',
      confirmNewPwd: 'confirm new pwd',
      msg: {
        m1: 'please input new pwd',
        m2: 'please input new confirm pwd',
        m3: 'not accordant',
        m4: 'please input 6~20 digit number or letters'
      },
      cancel: 'cancel',
      ok: 'OK',
      confirm: 'confirm',
      shopDetail: 'shop detail',
      shopName: 'shop name',
      address: 'address',
      mobile: 'cell phone',
      cardHolder: 'cardHolder',
      bankAccount: 'bankAccount',
      bankName: 'bankName',
      editSubTag: 'edit sub tag',
      diaTip: '',
      validateText: '',
      validateText2: '',
      notice: 'Notice',
      noticeTip: '。'
    }
  },
  pubSignal: { // 公众号授权
    crumbs: {
      authorizedPS: '',
      unauthorized: ''
    },
    title: {
      psInfo: '',
      bind: ''
    },
    panel: {
      avatar: '',
      name: '',
      id: '',
      psType: '',
      authType: '',
      wechatScan: '',
      adminAuthConfirm: '',
      authSucc: '',
      btn: {
        subAuthMng: '',
        deAuth: '',
        dePrimeAuth: '',
        freeAdd: ''
      }
    },
    dialog: {
      m1: '',
      all: ''
    },
    msg: {
      m1: '',
      m2: '',
      m3: '',
      m4: '',
      m5: '',
      m6: '',
      m7: ''
    }
  },
  billMng: { // 账单管理
    crumbs: {
      L1: ''
    },
    panel: {
      payTime: '',
      shopName: '',
      range: ''
    },
    msg: {
      m1: '',
      m2: '',
      m3: ''
    },
    btn: {
      downDetail: '',
      downRecord: ''
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: ''
    },
    title: {
      t1: '',
      t2: ''
    },
    panel: {
      t1: '',
      t2: '',
      tc: '',
      cmnew: '',
      cumulativeMembership: '',
      tta: '',
      tincome: '',
      cmincome: '',
      noActivity: ''
    }
  },
  login: {
    head: '',
    reg: '',
    ltsix: '',
    forgetPwd: '',
    msg: {
      m1: '',
      m2: '',
      m3: ''
    }
  }

}

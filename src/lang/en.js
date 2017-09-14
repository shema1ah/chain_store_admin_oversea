/**
 * Created by leon on 17/7/18.
 */

'use strict';

exports.__esModule = true;
exports.default = {
  lang: {
    zh: 'Chinese',
    en: 'English',
    ja: 'Japanese'
  },
  nav: {
    mmp: 'Shop Management Platform',
    index: 'Home',
    tradeMng: 'Transaction Mgmt',
    billMng: 'Bill Mgmt',
    publicAuth: 'Official Account',
    shopMng: 'Shop Mgmt',
    setup: 'Setting'
  },
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    tip: 'Tips',
    all: 'All',
    netError: 'Net error',
    loading: 'Loading...',
    modSucc: 'Modified successfully',
    modFailed: 'Failed to modify',
    logout: 'Logout',
    msg: {
      sel: 'Please choose'
    }
  },
  shopmng: { // 门店管理模块
    crumbs: {
      L1: 'Shop Management'
    },
    title: {
      baseInfo: 'Basic Information',
      subInfo: 'Branch Shop Information'
    },
    panel: {
      shopName: 'Shop Name',
      loginAccount: 'Account',
      btn: {
        editPwd: 'Change Password',
        editSub: 'Edit Branch Shop',
        editSubTag: 'Edit Customized ID',
        down: 'Shop QR Code',
        downTip: 'Click to download QR code'
      },
      table: {
        subName: 'Branch Shop Name',
        loginAccount: 'Account',
        regTime: 'Register Time',
        subTag: 'Customized ID',
        op: 'Operation',
        detail: 'Details',
        more: 'More',
        editPwd: 'Change Password',
        delSub: 'Delete Branch Shop'
      }
    },
    dialog: {
      editPwd: 'Change Password',
      loginAccount: 'Account',
      inputNewPwd: 'New PWD',
      confirmNewPwd: 'Confirm',
      msg: {
        m1: 'Please enter a new password.',
        m2: 'Please confirm the new password.',
        m3: 'The new password and the confirmation don’t match.',
        m4: 'Enter alphabets or numbers from 6 to 20 digits.',
        m5: 'Please enter password of master account.', // 请输入总账户密码
        m6: 'Please enter branch account.', // 请输入分店账号
        m7: 'Please enter password of branch account.',
        m8: 'Please enter branch account owner name.',
        m9: 'Please enter branch bank account!',
        m10: 'Alphabets or numbers within 20 digits.',
        m11: 'No special characters.',
        m12: 'Incorrect Password.',
        m13: 'Branch Deleted!'
      },
      cancel: 'Cancel',
      ok: 'Confirm',
      confirm: 'Confirm',
      shopDetail: 'Shop Detail Information',
      shopName: 'Shop Name',
      address: 'Address',
      mobile: 'Phone Number',
      cardHolder: 'Account Owner',
      bankAccount: 'Bank Account',
      bankName: 'Bank Name',
      editSubTag: 'Edit Customized ID',
      diaTip: 'Customized ID would be shown at the exported payment detail and payment summary.',
      validateText: 'Please enter charactors within 20',
      validateText2: 'Please enter the login password of master account',
      notice: 'Be Awared!',
      noticeTip: 'Always remember to turn off the branch shop promotions before delete the branch.'
    }
  },
  pubSignal: { // 公众号授权
    crumbs: {
      authorizedPS: 'Official Account',
      unauthorized: 'Authenticate your Official Account for more services.'
    },
    title: {
      psInfo: 'Basic information of Official Account',
      bind: 'Authenticate the Official Account'
    },
    panel: {
      avatar: 'Head Portrait',
      name: 'Name',
      id: 'ID(Wechat Account)',
      psType: 'Official Account Type',
      authType: 'Authentication Type',
      wechatScan: 'Use your WeChat account to scan',
      adminAuthConfirm: 'Confirm the authentication process',
      authSucc: 'Authentication completes',
      btn: {
        subAuthMng: 'Branch Auth',
        deAuth: 'Cancel The Authorization For The Account',
        dePrimeAuth: 'Release Auth',
        freeAdd: 'Start',
        releaseAuth: 'Release Auth'
      }
    },
    dialog: {
      m1: 'Select branches to authorize',
      all: 'Select all'
    },
    msg: {
      m1: 'Failed to get the official account information.',
      m2: 'Failed to get the shop ID.',
      m3: 'Failed to get the chain shop.',
      m4: 'Successfully cancelled.',
      m5: 'Failed to cancel.',
      m6: 'Do you really want to cancel the authorization the official account?',
      m7: 'Do you really want to cancel the authorization the master official account?'
    }
  },
  billMng: { // 账单管理
    crumbs: {
      L1: 'Bill Management'
    },
    panel: {
      payTime: 'Transfer Time',
      shopName: 'Shop Name',
      range: 'select date range'
    },
    msg: {
      m1: "Please don't search over a month.",
      m2: "Please don't choose it over a month.",
      m3: 'Please choose the remittance time.'
    },
    btn: {
      downDetail: 'Transfer Details',
      downRecord: 'Transfer Record'
    }
  },
  tradeMng: { // 交易管理
    crumbs: {
      L1: 'Transaction Management'
    },
    panel: {
      time: 'Date',
      today: 'Today',
      yestoday: 'Yesterday',
      near7: 'Last 7 days',
      near30: 'Last 30 days',
      shopName: 'Shop Name',
      operator: 'Cashier',
      moreFilter: 'More Options',
      noLimit: 'All',
      dd: 'Refunded', // 撤销明细
      sNum: 'Transaction ID', // 流水号
      tip: 'Please enter the transaction ID',
      btn: {
        query: 'Search',
        reset: 'Reset'
      }
    },
    table: {
      total: 'Total Amount',
      realrec: 'Payment Real Received',
      succ: 'Success',
      undoNum: 'Refunded',
      bi: 'times',
      undo: 'Refund The Details',
      shopName: 'Shop Name/ID',
      operator: 'Cashier ',
      all: 'All',
      colWay: 'Collection Method',
      wechatCollect: 'Collect by Wechat',
      tradeType: 'Type',
      tradeTime: 'Time',
      tradeAmount: 'Amount',
      tradeState: 'Status',
      redpacket: 'Red Envelope Discount', // 红包优惠
      sNum: 'Transaction ID',
      op: 'Operation',
      cancel: 'refund',
      ac: 'Actually Collected', // 实收
      red: 'paid from the red envelope', // 商家红包
      plat: 'paid from the platform', // 平台补贴
      btn: {
        downDetail: 'Download The Payment Details',
        downTrade: 'Download The Payment Summary'
      }
    },
    dialog: {
      d1: 'If you want to refund the payment, please operate it after entering the password of the account to confirm'
    },
    msg: {
      m1: 'Transaction ID must be figures!',
      m2: 'At least 14 digits are necessary for the payment Transaction ID!',
      m3: 'Failed to get the payment list at the first time.',
      m4: 'Failed to get the payment data.',
      m5: 'Failed to get the cashier information.',
      m6: 'Successfully refunded.',
      m7: 'Failed to refund.',
      m8: 'Please enter the Transaction ID.',
      m9: "Please enter the account's password.",
      m10: 'invalidate password.'
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: 'Home'
    },
    title: {
      t1: 'Payment Data Statistics',
      t2: 'Event Operation Statistics'
    },
    panel: {
      t1: 'New Customers Today',
      t2: 'Payment Amount Today',
      tc: 'Returning Customer Today',
      cmnew: 'New Customers This Month',
      cumulativeMembership: 'Total Customers',
      tta: 'Payment Today',
      tincome: 'Amount Received Today',
      cmincome: 'Amount Received This Month',
      noActivity: 'No Promotion'
    }
  },
  login: { // 登录页
    head: 'Shop Management Platform',
    reg: 'Register a new account',
    ltsix: 'More than 6 digits.',
    login: 'Login',
    forgetPwd: 'Forget password?',
    msg: {
      m1: 'Please enter the account.',
      m2: 'Please enter the password.',
      m3: 'Failed to log in.'
    }
  },
  setting: { // 邮箱设置页
    crumbs: {
      L1: 'Setting'
    },
    panel: {
      mailSetup: 'Email setting',
      mail: 'Email Address',
      explain: 'A daily payment report will be delivered to this email address every morning at 7 a.m.',
      dailySend: 'Turn On Daily Report',
      modi: 'Change',
      confirm: 'Confirm'
    },
    msg: {
      m1: 'Please enter email address.',
      m2: 'Please enter correct email address.',
      m3: 'Fetch email address failed!'
    }
  }

}

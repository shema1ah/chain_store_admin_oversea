/**
 * Created by leon on 17/7/18.
 */

'use strict';

exports.__esModule = true;
exports.default = {
  nav: {
    mmp: 'Shop Management Platform',
    index: 'HomePage',
    tradeMng: 'Transaction Mng',
    publicAuth: 'Official Account Auth',
    shopMng: 'Shop Mng',
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
        editSubTag: 'Edit Branch',
        down: 'Shop QR Code'
      },
      table: {
        subName: 'Branch Shop Name',
        loginAccount: 'Account',
        regTime: 'Register Time',
        subTag: 'Branch Shop Number',
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
        m1: 'Please enter a new password',
        m2: 'Please confirm the new password',
        m3: 'The new password and the confirmation don’t match',
        m4: 'Please enter alphabets or numbers from 6 to 20 digits',
        m5: 'Please enter password of master account', // 请输入总账户密码
        m6: 'Please enter branch account', // 请输入分店账号
        m7: 'Please enter password of branch account',
        m8: 'Please enter branch account owner name',
        m9: 'Please enter branch bank account!',
        m10: 'Alphabets or numbers within 20 digits',
        m11: 'No special characters',
        m12: 'Incorrect Password',
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
      editSubTag: 'Edit Branch Shop Number',
      diaTip: 'Branch number would be shown at the exported Payment detail and Payment summary',
      validateText: 'Please enter characters or alphabets within 20 digits',
      validateText2: 'Please enter the login password of master account',
      notice: 'Be Awared!',
      noticeTip: 'Always remember to turn off the branch shop promotions before delete the branch'
    }
  },
  pubSignal: { // 公众号授权
    crumbs: {
      authorizedPS: 'Authorized Official Account',
      unauthorized: 'You haven’t bound your Wechat account yet, please bind your Wechat account to get more service'
    },
    title: {
      psInfo: 'Basic information of Official Account',
      bind: 'Bind With Wechat Official Account'
    },
    panel: {
      avatar: 'Head Portrait',
      name: 'Name',
      id: 'ID(Wechat Account)',
      psType: 'Official Account Type',
      authType: 'Authentication Type',
      wechatScan: 'Scan QR code with a personal wechat account',
      adminAuthConfirm: 'Confirm to authorize by the administrator of the official account',
      authSucc: 'Authorization success, start to operate the official account!',
      btn: {
        subAuthMng: 'Branch Auth',
        deAuth: 'Cancel The Authorization For The Account',
        dePrimeAuth: 'Release Auth',
        freeAdd: 'Add Wechat Official Account For Free'
      }
    },
    dialog: {
      m1: '',
      all: 'Select all'
    },
    msg: {
      m1: 'Failed to get the official account information',
      m2: 'Failed to get the shop ID',
      m3: 'Failed to get the chain shop',
      m4: 'Successfully cancelled',
      m5: 'Failed to cancel',
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
      m1: "Please don't search over a month",
      m2: "Please don't choose it over a month",
      m3: 'Please choose the remittance time'
    },
    btn: {
      downDetail: 'Transfer Details',
      downRecord: 'Transfer Record'
    }
  },
  tradeMng: {
    crumbs: {
      L1: 'Payment Management'
    },
    panel: {
      time: 'Time',
      today: 'Today',
      yestoday: 'Yesterday',
      near7: 'Last 7 days',
      near30: 'Last 30 days',
      shopName: 'Shop Name',
      operator: 'Operator',
      moreFilter: 'Choose More',
      noLimit: 'Unlimited',
      dd: 'Cancel The Details', // 撤销明细
      sNum: 'Serial Number', // 流水号
      tip: 'Please enter the serial number',
      btn: {
        query: 'Search',
        reset: 'Reset'
      }
    },
    table: {
      total: 'Total Amount',
      realrec: 'Payment Real Received',
      succ: 'Success',
      undoNum: 'Canceled',
      bi: 'times',
      undo: 'Cancel The Details',
      shopName: 'Shop Name',
      operator: 'Operator',
      all: 'All',
      colWay: 'Collection Method',
      wechatCollect: 'Collect by Wechat',
      tradeType: 'Type',
      tradeTime: 'Time',
      tradeAmount: 'Amount',
      tradeState: 'Status',
      redpacket: 'Red Envelope Discount', // 红包优惠
      sNum: 'Serial Number',
      op: 'Operation',
      cancel: 'cancel',
      ac: 'Actually Collected', // 实收
      red: 'paid from the red envelope', // 商家红包
      plat: 'paid from the platform', // 平台补贴
      btn: {
        downDetail: 'Download The Payment Details',
        downTrade: 'Download The Payment Summary'
      }
    },
    dialog: {
      d1: 'If you want to cancel the payment, please operate it after entering the password of the account to confirm'
    },
    msg: {
      m1: 'Serial number must be figures!',
      m2: 'At least 14 digits are necessary for the payment serial number!',
      m3: 'Failed to get the payment list at the first time.',
      m4: 'Failed to get the payment data.',
      m5: 'Failed to get the operator information.',
      m6: 'Successfully cancelled.',
      m7: 'Failed to cancel.',
      m8: 'Please enter the serial number.',
      m9: "Please enter the account's password.",
      m10: 'invalidate password.'
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: 'Homepage'
    },
    title: {
      t1: 'Membership And Payment Data Statistics',
      t2: 'Event Operation Statistics'
    },
    panel: {
      t1: 'New Members Today',
      t2: 'Payment Amount Today',
      tc: 'Returning Customer Today',
      cmnew: 'New Members This Month',
      cumulativeMembership: 'Total Members',
      tta: 'Payment Today',
      tincome: 'Actual Amount Today',
      cmincome: 'Actual Amount This Month',
      noActivity: 'No Promotion'
    }
  },
  login: { // 登录页
    head: 'Shop Management Platform',
    reg: 'Register a new account',
    ltsix: 'More than 6 digits',
    login: 'Login',
    msg: {
      m1: 'Please enter the account',
      m2: 'Please enter the password',
      m3: 'Failed to log in'
    }
  },
  setting: { // 邮箱设置页
    crumbs: {
      L1: 'Report Setting'
    },
    panel: {
      mailSetup: 'Email setting',
      mail: 'Email Address',
      explain: 'A daily payment report will send to this address every morning 7 a.m.',
      dailySend: 'Turn On Daily Report',
      modi: 'Change',
      confirm: 'Confirm'
    },
    msg: {
      m1: 'Please enter email address',
      m2: 'Please enter correct email address',
      m3: 'Fetch email address failed!'
    }
  }

}

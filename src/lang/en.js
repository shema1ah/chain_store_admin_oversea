/**
 * Created by leon on 17/7/18.
 */

'use strict';

exports.__esModule = true;
exports.default = {
  nav: {
    mmp: 'Shop Management Platform',
    index: 'Home',
    settlement: 'Settlement Mgmt',
    tradeMng: 'Transaction Mgmt',
    publicAuth: 'Official Account',
    shopMng: 'Account Info',
    cashMng: 'Cashier Mgmt',
    setup: 'Settings',
    contact: 'Contact Us'
  },
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    confirm: 'Confirm',
    tip: 'Tips',
    all: 'All',
    netError: 'Net error',
    loading: 'Loading...',
    modSucc: 'Modified successfully',
    modFailed: 'Failed to modify',
    logout: 'Logout',
    del: 'Delete',
    msg: {
      sel: 'Please choose'
    }
  },
  shopmng: { // 门店管理模块
    crumbs: {
      L1: 'Account Info'
    },
    title: {
      baseInfo: 'Basic Information',
      subInfo: 'Branch Information'
    },
    panel: {
      shopName: 'Shop Name',
      loginAccount: 'Account',
      btn: {
        editPwd: 'Change Password',
        editSub: 'Edit Branch Shop',
        editSubTag: 'Edit Customized ID',
        down: 'Shop QR Code'
      },
      table: {
        subName: 'Branch Name',
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
      diaTip: 'Customized ID would be shown at the exported transaction detail and transaction summary.',
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
  tradeMng: { // 交易管理
    crumbs: {
      L1: 'Transaction Management',
      L2: 'Transaction detail',
      L3: 'Refund detail',
    },
    panel: {
      time: 'Time Range',
      today: 'Today',
      yestoday: 'Yesterday',
      near7: 'Last 7 days',
      near30: 'Last 30 days',
      near365: 'Last 1 year',
      shopName: 'Shop Name',
      operator: 'Cashier',
      moreFilter: 'More Options',
      noLimit: 'All',
      dd: 'Refund', // 撤销明细
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
      undoNum: 'Refund',
      bi: 'times',
      undo: 'Refund The Details',
      shopName: 'Shop Name',
      operator: 'Cashier ',
      all: 'All',
      colWay: 'Transaction Type',
      wechatCollect: 'Collect by Wechat',
      tradeType: 'Type',
      tradeTime: 'Time',
      tradeAmount: 'Amount',
      tradeState: 'Status',
      redpacket: 'Red Envelope Discount', // 红包优惠
      sNum: 'Transaction ID',
      op: 'Operation',
      cancel: 'Refund',
      more: 'More',
      detail: 'Details',
      download: 'Download Receipt',
      ac: 'Actually Collected', // 实收
      red: 'paid from the red envelope', // 商家红包
      plat: 'paid from the platform', // 平台补贴
      btn: {
        downDetail: 'Download The Transaction Details',
        downTrade: 'Download The Transaction Summary'
      }
    },
    detail: {
      ammount1: 'Transaction amount',
      ammount2: 'Refund amount',
      origin: 'Source of consumers',
      time: 'Refund time',
      syssn1: 'Transaction ID',
      syssn2: 'Original ID',
      syssn3: 'Refund ID',
      store: 'Store name',
      account: 'Operating Account',
      history: 'Refund History'
    },
    dialog: {
      d1: 'This action cannot be undone, do you want to refund?',
      d2: 'Confirm',
      d3: 'Success',
      d4: 'Fail',
      d5: 'Password',
      d6: 'refund'
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
      m10: 'invalidate password.',
      m11: 'You don’t have the authority to proceed.',
      m12: 'Out of range',
      m13: 'Refund failed, please contact us for assistance.',
      m14: 'Max. Refund Amount',
      m15: 'Please enter the refund amount',
      m16: 'Please enter a valid refund amount'
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: 'Home'
    },
    title: {
      t1: 'Payment Statistics',
      t2: 'Event Operation Statistics'
    },
    panel: {
      t1: 'New Customers Today',
      t2: 'Daily Statistics',
      tc: 'Returning Customer Today',
      cmnew: 'New Customers This Month',
      cumulativeMembership: 'Total Customers',
      tta: '# of Transactions',
      tincome: 'Total Received (Day)',
      cmincome: 'Total Received (Month)',
      noActivity: 'No Promotion'
    }
  },
  settlement: { // 清算管理
    crumbs: {
      L1: 'Settlement Mgmt'
    },
    panel: {
      time: 'Time Range',
      today: 'Today',
      yestoday: 'Yesterday',
      near7: 'Last 7 days',
      near30: 'Last 30 days',
      name: 'Account',
      btn: {
        query: 'Search',
        reset: 'Reset'
      },
      type1: 'WeChat Pay HK',
      type2: 'WeChat Pay （WeChat Settlement）',
      type3: 'Alipay（Alipay Settlement）',
      type4: 'WeChat Pay'
    },
    table: {
      settleTime: 'Settleme Time',
      currency: 'Currency',
      total: 'Total Amount',
      charge: 'Fee',
      settleAmount: 'Settlement Amount',
      op: 'Operation',
      download: 'Download'
    },
    msg: {
      m1: 'Fail to get data .'
    }
  },
  login: { // 登录页
    head: 'Shop Management Platform',
    reg: 'Register a new account',
    user: 'Shop Account',
    cash: 'Cashier No.',
    ltsix: 'More than 6 digits.',
    login: 'Login',
    forgetPwd: 'Forget password?',
    tab1: 'Merchant',
    tab2: 'Cashier',
    msg: {
      m1: 'Please enter the account.',
      m2: 'Please enter the password.',
      m3: 'Failed to log in.',
      m4: 'Enter Shop Account',
      m5: 'Enter Cashier No.'
    }
  },
  setting: { // 邮箱设置页
    crumbs: {
      L1: 'Settings'
    },
    panel: {
      mailSetup: 'Email settings',
      mail: 'Email Address',
      explain: 'A daily payment report will be delivered to this email address every morning at 7 a.m.',
      dailySend: 'Send Daily Report',
      modi: 'Change',
      confirm: 'Confirm'
    },
    msg: {
      m1: 'Please enter email address.',
      m2: 'Please enter correct email address.',
      m3: 'Fetch email address failed!',
      m5: 'The email has been added!',
      m6: 'You can only add 10 email addresses'
    },
    tip: {
      m1: 'Delete the last email address will turn off the feature, do you confirm?'
    }

  },
  cashMng: { // 收银员管理
    crumbs: {
      L1: 'Cashier Management',
      L2: 'Details',
      L3: 'Add Cashier'
    },
    common: {
      status: 'Status',
      number: 'Cashier No.',
      name: 'Name',
      mobile: 'Phone Number',
      shop: 'Shop Name',
      user: 'Shop Account',
      password: 'Cashier Password',
      m1: 'Account is deactivated',
      m2: 'Account is activated',
      m5: 'Cashier Name',
      m6: 'Cashier Contact',
      m7: 'Cashier Password',
      m8: 'Please enter 2-20 characters',
      m9: 'Please input a valid phone number',
      m10: 'Please enter 6-20 characters',
      tip1: '* Cashier can login with Shop Account, Cashier No. and Cashier Password'
    },
    mng: {
      status1: 'Active',
      status2: 'Inactive',
      status3: 'Activated',
      status4: 'Deactivated',
      name: 'Cashier Name',
      mobile: 'Cashier Contact',
      op: 'Operation',
      detail: 'Details',
      m5: 'Fail to get cashier’s data'
    },
    detail: {
      title: 'Cashier Info',
      btn: 'Edit Cashier Info'
    },
    add: {
      title: 'Add Cashier Info',
      tip1: 'One cashier is added',
      tip2: 'Fail to get cashier’s number',
      btn1: 'Cancel',
      btn2: 'Confirm'
    }
  },
  contact: { // 客服
    phone: 'Phone',
    email: 'E-mail'
  },
  overseaForget: {
    enterEmail: 'Please enter your email.',
    emailAddr: 'Email Address',
    tryAnother: 'Try another way',
    next: 'Next',
    confirm: 'Confirm',
    notExist: 'E-mail address does not exist',
    sendCode: 'We will deliver a verification code to you. Please enter the code.',
    resend: 'Please resend',
    code: 'Verification Code',
    newPwd: 'New Password',
    enterCode: 'Please enter the code.',
    char: 'Please enter 6-20 characters',
    rePwd: 'Reset Password',
    invalidEmail: 'Invalid email address',
    text1: 'We will deliver a verification code to',
    text2: '. Please enter the code.',
    secend1: "Resend after( ",
    secend2: 's )',
    codeResent: 'Code Resent',
    wrongCode: 'Verification code is wrong',
    filledCode: 'Verification code must be filled',
    frequently: 'Get verification code frequently, please try again later'
  },
  firstlogin: {
    congratulation: 'Congratulation! You have registered at HaoJin Merchant App',
    changePwd: 'Please change your password to continue',
    newPwd: 'New Password',
    rePwd: 'Confirm Password',
    confirm: 'Confirm'
  }
}

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
    tradeAssign: 'Trading Flow',
    refundCheck: ' Refund Review',
    shopMng: 'Account Info',
    cashMng: 'Cashier Mgmt',
    setup: 'Settings',
    passSet: 'Mgmt Pass Settings',
    emailSet: 'Email Settings',
    surcharge: 'Surcharge Settings',
    contact: 'Contact Us',
    device: 'Device Binding',
    smart: 'Smart Restaurant',
    qr: 'Table QR Code',
    pm: 'Product Management'
  },
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    confirm: 'Confirm',
    tip: 'Tips',
    all: 'All',
    none: 'Nothing',
    netError: 'Net error',
    loading: 'Loading...',
    modSucc: 'Modified successfully',
    modFailed: 'Failed to modify',
    logout: 'Logout',
    del: 'Delete',
    next: 'Next',
    previous: 'Previous',
    edit: 'Edit',
    submit: 'Submit',
    msg: {
      sel: 'Please choose'
    }
  },
  main: {
    bigMerchant: 'Enterprise',
    merchant: 'Single store',
    subMerchant: 'Branch',
    cashier: 'Cashier'
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
        down: 'Shop QR Code',
        listDown: 'Download store QR code'
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
      noticeTip: 'Always remember to turn off the branch shop promotions before delete the branch.',
      downTip: 'Select the store name where you want to download：',
      nullTip: 'Please select at least one branch',
      all: 'Select all'
    }
  },
  tradeMng: { // 交易流水
    crumbs: {
      L1: 'Transaction Management',
      L2: 'Transaction detail',
      L3: 'Refund detail',
      L4: 'Trading Flow',
    },
    panel: {
      time: 'Time Range',
      range: 'select date range',
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
      totalAmount: 'Total Amount',
      totalNum: 'Total Number',
      succAmount: 'Success Amount',
      succ: 'Success Number',
      refundMount: 'Refund Amount',
      refundNum: 'Refund Number',
      bi: 'times',
      undo: 'Refund The Details',
      shopName: 'Shop Name',
      operator: 'Cashier ',
      all: 'All',
      main: 'Merchant Account',
      colWay: 'Transaction Type',
      wechatCollect: 'Collect by Wechat',
      alipay: 'Alipay',
      tradeType: 'Type',
      tradeTime: 'Time',
      tradeAmount: 'Amount',
      originAmount: 'Receivables',
      tradeState: 'Status',
      redpacket: 'Red Envelope Discount', // 红包优惠
      sNum: 'Transaction ID',
      chnlsn: 'External Order No.',
      src: 'User source',
      cardCd: 'Bank card No.',
      remark: 'Remarks',
      op: 'Operation',
      cancel: 'Refund',
      more: 'More',
      detail: 'Details',
      download: 'Download Receipt',
      ac: 'Actually Collected', // 实收
      red: 'paid from the red envelope', // 商家红包
      plat: 'paid from the platform', // 平台补贴
      surAmount: 'Surcharges',
      surRate: 'Surcharge Rate',
      btn: {
        downDetail: 'Download The Transaction Details',
        downTrade: 'Download The Transaction Summary'
      }
    },
    detail: {
      amount1: 'Transaction amount',
      amount2: 'Refund amount',
      origin: 'Source of consumers',
      time: 'Refund time',
      syssn1: 'Transaction ID',
      syssn2: 'Original ID',
      syssn3: 'Refund ID',
      store: 'Store name',
      account: 'Operating Account',
      history: 'Refund History',
      amount3: 'Actual Amounts',
      count1: 'Actual Quantity',
      count2: 'Order Quantity',
      syssn4: 'Chain Order No.'
    },
    dialog: {
      d1: 'This action cannot be undone, do you want to refund?',
      d2: 'Confirm',
      d3: 'Success',
      d4: 'Fail',
      d5: 'Password',
      d6: 'refund',
      d7: 'The refund is in progress.'
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
  refundCheck: { // 退款审核
    crumbs: {
      L1: 'Transaction Management',
      L2: 'Refund Review'
    },
    panel: {
      time: 'Application time',
      shopName: 'Store name',
      operator: 'Cashier',
      oNUm: 'Original ID',
      tip: 'Please enter the Original ID',
      btn: {
        query: 'Search',
        reset: 'Reset'
      }
    },
    table: {
      applyAmount: 'Account Application',
      tradeType: 'Type',
      tradeTime: 'Time',
      refundMount: 'Refund amount',
      tradeAmount: 'Amount',
      sNum: 'Transaction ID',
      checkState: 'Approval Status',
      waiting: 'Moderated',
      approved: 'Approved',
      rejected: 'Rejected',
      op: 'Operation',
      approve: 'Approve',
      reject: 'Refuse'
    },
    dialog: {
      d1: 'The operation will not be withdrawn once confirmed, whether approved?',
      d2: 'The operation will not be withdrawn once confirmed, whether refused?',
      d3: 'Confirmation of approval',
      d4: 'Confirm rejection'
    },
    msg: {
      m1: 'Mgmt Pass',
      m2: 'Please enter the Mgmt Pass',
      m3: 'Successful operation',
      m4: 'The refund operation was successful and waiting for the payment channel to be processed.'
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: 'Home'
    },
    title: {
      t1: 'Payment Statistics',
      t2: 'Trading chart'
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
    },
    chart: {
      bill: 'Count',
      noTrans: 'No transaction',
      account: 'Net Amount',
      time: 'Time',
      sum: 'Amount',
      tp1: 'Only support queries for 30 days'
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
      type: 'Type',
      btn: {
        query: 'Search',
        reset: 'Reset',
        downAll: 'Download all'
      }
    },
    table: {
      settleTime: 'Settlement Time',
      settleType: 'Settlement Type',
      name: 'Account',
      amount: 'Account Name',
      currency: 'Currency',
      total: 'Total Amount',
      charge: 'Fee',
      settleAmount: 'Settlement Amount',
      op: 'Operation',
      download: 'Download'
    },
    msg: {
      m1: 'Fail to get data .',
      m2: 'Only queries for data less than 30 days.',
      m3: 'No data for download.',
      m4: 'No settlement data.'
    },
    tip: {
      m1: 'The total fee is calculated by multiplying each order by the rate and then rounding up.'
    }
  },
  login: { // 登录页
    head: 'Shop Management Platform',
    reg: 'Login Account',
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
      m5: 'Enter Cashier No.',
      m6: 'No account found'
    }
  },
  setting: { // 邮箱设置页
    crumbs: {
      L1: 'Settings',
      L2: 'Email Settings',
      L3: 'Device Binding',
      L4: 'Add Surcharge Rate',
      L5: 'Edit Surcharge Rate',
    },
    panel: {
      mailSetup: 'Email settings',
      mail: 'Email Address',
      explain: 'A daily payment report will be delivered to this email address every morning at 7 a.m.',
      dailySend: 'Send Daily Report',
      modi: 'Change',
      confirm: 'Confirm',
      amount: 'Store account',
      device: 'Device id',
      merchant: 'Merchant Account',
    },
    btn: {
      query: 'Search',
      reset: 'Reset'
    },
    table: {
      merchant: 'Company Name',
      shopName: 'Shop name',
      time: 'Binding time',
      close: 'Unbind',
      createTime: 'Create Time',
      subName: 'Merchant Name',
      rate: 'Surcharge Rate',
    },
    dialog: {
      d1: 'Add device',
      d2: 'Unbundling device',
      d3: 'Operate Confirm',
    },
    msg: {
      m1: 'Please enter email address.',
      m2: 'Please enter correct email address.',
      m3: 'Fetch email address failed!',
      m5: 'The email has been added!',
      m6: 'You can only add 10 email addresses',
      m7: 'Do you confirm unbinding?',
      m8: 'Unbind successfully',
      m9: 'Please enter store account.',
      m10: 'Please enter the device number.',
      m11: 'Add success',
      m12: 'Please enter merchant account.',
      m13: 'Delete success',
      m14: 'Please enter a number from 0-100, only two decimal place allowed',
    },
    tip: {
      m1: 'Delete the last email address will turn off the feature, do you confirm?',
      m2: 'Set Payment Method Surcharge Rate',
      m3: 'Merchant surcharges were set and can be modified from the list page.',
      m4: 'Select Store where you want to set surcharge Rate.',
      nullTip: 'Please select at least one branch',
      all: 'Select all'
    }

  },
  passSet: { // 管理密码设置
    crumbs: {
      L1: 'Settings',
      L2: 'Manage password settings'
    },
    panel: {
      passMsg: 'Management password：',
      explain: 'Use：After  setting, the refund approval for next day will confirmed entering management password.',
      states1: 'Not set',
      states2: 'Has been set',
      bt1: 'Set',
      bt2: 'Reset',
      bt3: 'Save',
      title1: 'Setting management password',
      title2: 'Reset management password',
      safe: 'Safety verification',
      pass: 'Mgmt Pass',
      reEnter: 'Re-enter',
      originPass: 'Original Mgmt Pass',
      newPass: 'New Mgmt Pass'
    },
    msg: {
      m1: 'Please enter your password',
      m2: 'Please enter your Mgmt Pass',
      m3: 'Please re-enter your Mgmt Pass',
      m4: 'Enter alphabets or numbers from 6 to 20 digits.',
      m6: 'Please enter original Mgmt Pass',
      m7: 'Please enter new Mgmt Pass',
      m8: 'Please re-enter new Mgmt Pass',
      m9: 'Inconsistency with admin password input',
      m10: 'Set successfully'
    },
    tip: {
      m1: '* Forgot  original password Please contact customer service'
    }
  },
  cashMng: { // 收银员管理
    crumbs: {
      L1: 'Cashier Management',
      L2: 'Details',
      L3: 'Add Cashier',
      L4: 'Batch add'
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
    dialog: {
      title: 'Add cashiers in batches',
      d1: 'Please select the cashier\'s form file',
      d2: 'Select',
      d3: 'Upload',
      d4: 'Down template',
      d5: 'Upload successful'
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
  },
  preAuth: {// 预授权管理
    message: {
      m1: 'order no.',
      m2: 'Please enter your order no.',
      m3: 'Capture amount',
      m4: 'No. of Captures',
      m5: 'Pre-auth Mgmt',
      m6: 'order details',
      m7: 'capture',
      m8: 'Release',
      m9: 'capture details',
      m10: 'Confirm to capture?',
      m11: 'Hold amount',
      m12: 'Hold items',
      m13: 'Creation Time',
      m14: 'Order Type',
      m15: 'Service order number',
      m16: 'Order Amount',
      m17: 'Order Status',
      m18: 'Transaction ID',
      m19: 'capture amount',
      m20: 'Maximum capture amount',
      m21: 'Please enter the capture amount',
      m22: 'Exceeded the capture limit',
      m23: 'Capture successfully',
      m24: 'completed',
      m25: 'Released',
      m26: 'completed',
      m27: 'Failed to capture',
      m28: 'Confirm to release',
      m29: 'Successfully released',
      m30: 'Release failed',
      m31: 'Download The Order Details',
      m32: 'Alipay pre-auth'
    }
  },
  diancan: {
    "Qr": {
      "smart": "Smart Restaurant",
      "tableinfo": "Enter table information",
      "qr": "Table QR Code",
      "area": "Area Name",
      "example": "Example: 2nd Floor, District A",
      "content": "This content is displayed before the table number，but not required",
      "range": "Table number range",
      "start": "First Table Number",
      "to": "To",
      "end": "Last Table Number",
      "input": "Total # of tables. If only 1 QR Code is required, leave \"Last Table Number\" field empty.",
      "generate": "Generate QR Code",
      "reset": "Reset",
      "scanqr": "QR Code Food Ordering",
      "areano": "Area Name, Table Number",
      "scanorder": "Scan to order",
      "qrgot1": "Generated ",
      "qrgot2": " QR codes",
      "qrgotsingle": " QR code",
      "stickergot1": "Generated ",
      "stickergot2": "table stickers",
      "stickergotsingle": "table sticker",
      "qrpreview": "Preview QR Code",
      "downloadtable": "Download Table Sticker",
      "downloadqr": "Download QR Code",
      'rule1': 'table start number is required',
      'rule2': 'start number must be less than end number',
      'rule3': 'once 50 pcs qrcodes at most',
      'rule4': 'the length of area name must be less than 10',
      'rule5': 'table number must be positive integer within four digits',
      'idermsg': 'failed to get merchant id',
      'qrgenerate': 'generating',
      'generalert': 'It may take some time, please wait a moment...'
    },
    "Manage": {
      "manage": "Product Mgmt",
      "upload": "Upload User Guide",
      "uploadsize": "file size should be less than 2.5M",
      "step1": "Step 1: Download excel template for batch import data",
      "download": "Download template",
      "read": "Follow the instructions in the template to fill up the excel. Upload the excel file by dragging it into the area below",
      "warn": "If there are errors in the template, the import will fail. Please download the file and make the necessary changes before reuploading.  ",
      "remind": "Dishes uploaded successfully will be displayed in the list below, click on the images to replace the images",
      "drag": "Drag the completed excel template file to this area, or ",
      "clickupload": "click Upload.",
      "name": "Product Name",
      "cate": "Category",
      "img": "Images",
      "upimg": "Upload Image",
      "price": "Price ({0})",
      "spec": "Spec. ({0})",
      "attr": "Attributes",
      "status": "Status",
      "catestat": "Category Status",
      "uploadSuc": "{0} pcs successfully uploaded",
      "fail": "Total {0} pcs failed",
      "downerr": "Download error data",
      "emptytext": "no data",
      "listfail": "fail to get goods list",
      "wrongformat": "file format error",
      "uploadOk": "upload successfully",
      "cannotupload": "cannot upload non-image file",
      "qiniufail": "fail to get qiniu token",
      "failupload": "upload failed",
      "addok": "image uploaded",
      "addfail": "adding image failed! ",
      "qiniuuploadfail": "uploading image to qiniu failed",
      "template": "goods_manage_template",
      "recipe": "English recipes",
      "os": 'On sale',
      'fs': 'Off sale',
      'op': 'Operation',
      'dl': 'Delete',
      'statuschange': 'status changed',
      'delok': 'delete success',
      'confirm1': 'Delete Confirm',
      'confirm2': 'Confirm',
      'confirm3': 'Cancel',
      'uploadtitle': 'no file chosen'
    },
    "Rank": {
      "index": "Product Sorting",
      "category": "Product Category",
      "name": "Product Name",
      "sort": "Sorting",
      "op": "Operation",
      "top": "Top",
      "up": "Move Up",
      "down": "Move Down",
      "rank": "Product Sorting",
      "total": "Total {0}",
      "save": "Save",
      "cancel": "Cancel",
      "saved": "Saved Success"
    }
  }
}

'use strict';

exports.__esModule = true;
exports.default = {
  nav: {
    mmp: '商户管理后台',
    index: '首页概览',
    settlement: '清算管理',
    tradeMng: '交易管理',
    tradeAssign: '交易流水',
    refundCheck: '退款审核',
    shopMng: '账户信息',
    cashMng: '收银员管理',
    setup: '设置',
    passSet: '管理密码设置',
    emailSet: '邮箱设置',
    surcharge: '附加费率设置',
    contact: '客服',
    device: '设备绑定',
    smart: '智慧餐厅',
    qr: '桌台二维码',
    pm: '商品管理'
  },
  common: {
    ok: '确 定',
    cancel: '取 消',
    close: '关 闭',
    confirm: '确 认',
    tip: '提示',
    all: '全部',
    none: '无',
    netError: '网络错误',
    loading: '拼命加载中',
    modSucc: '修改成功',
    modFailed: '修改失败',
    logout: '退出',
    del: '删除',
    next: '下一步',
    previous: '上一步',
    edit: '编辑',
    submit: '提交',
    msg: {
      sel: '请选择'
    }
  },
  main: {
    bigMerchant: '企业',
    merchant: '单店',
    subMerchant: '分店',
    cashier: '收银员'
  },
  shopmng: { // 门店管理模块
    crumbs: {
      L1: '账户信息'
    },
    title: {
      baseInfo: '基本信息',
      subInfo: '分店信息'
    },
    panel: {
      shopName: '商户名称',
      loginAccount: '登录账号',
      btn: {
        editPwd: '修改密码',
        editSub: '编辑分店',
        editSubTag: '编辑分店编号',
        down: '下载店铺收款码',
        listDown: '下载分店收款码'
      },
      table: {
        subName: '分店名称',
        loginAccount: '登录账号',
        regTime: '注册时间',
        subTag: '分店编号',
        op: '操作',
        detail: '查看详情',
        more: '更多',
        editPwd: '修改密码',
        delSub: '删除分店'
      }
    },
    dialog: {
      editPwd: '修改密码',
      loginAccount: '登录账号',
      inputNewPwd: '输入新密码',
      confirmNewPwd: '确认新密码',
      msg: {
        m1: '请输入新密码',
        m2: '请输入确认新密码',
        m3: '新密码与确认密码不一致',
        m4: '请输入6~20位数字或字母',
        m5: '请输入总账户密码',
        m6: '请输入分店账号',
        m7: '请输入分店登录密码',
        m8: '请输入分店收款人姓名!',
        m9: '请输入分店收款银行卡号!',
        m10: '请输入二十以内的文字或字母',
        m11: '不能含有特殊字符',
        m12: '密码不正确',
        m13: '删除分店成功!'
      },
      cancel: '取消',
      ok: '确定',
      confirm: '确认',
      shopDetail: '门店详情',
      shopName: '店铺名称',
      address: '地址',
      mobile: '手机号',
      cardHolder: '持卡人',
      bankAccount: '银行账户',
      bankName: '银行名称',
      editSubTag: '编辑分店编号',
      diaTip: '分店编号设置成功后将会显示在下载的交易明细和交易汇总中',
      validateText: '请输入二十位以内的文字或字母',
      validateText2: '请输入总账户登录密码',
      notice: '提示',
      noticeTip: '删除分店前建议先终止该分店正在进行的会员营销活动。',
      downTip: '选择需要下载收款码的分店名称：',
      nullTip: '请至少选择一家分店',
      all: '全选'
    }
  },
  tradeMng: { // 交易流水
    crumbs: {
      L1: '交易管理',
      L2: '交易详情',
      L3: '退款详情',
      L4: '交易流水'
    },
    panel: {
      time: '时间',
      range: '选择日期范围',
      today: '今天 ',
      yestoday: '昨天',
      near7: '近7天',
      near30: '近30天',
      near365: '近一年',
      shopName: '店铺名称',
      operator: '收银员',
      moreFilter: '更多筛选',
      noLimit: '不限',
      dd: '撤销明细', // 撤销明细
      sNum: '流水号', // 流水号
      tip: '请输入流水号',
      btn: {
        query: '查询',
        reset: '重置'
      }
    },
    table: {
      totalAmount: '交易总金额',
      totalNum: '交易总笔数',
      succAmount: '成功交易金额',
      succ: '成功交易笔数',
      refundMount: '退款金额',
      refundNum: '退款笔数',
      bi: '笔',
      undo: '撤销明细',
      shopName: '店铺名称',
      operator: '收银员',
      all: '全部',
      main: '门店主账户',
      colWay: '收款方式',
      wechatCollect: '微信收款',
      alipay: '支付宝收款',
      tradeType: '交易类型',
      tradeTime: '交易时间',
      tradeAmount: '交易金额',
      originAmount: '应收',
      tradeState: '交易状态',
      redpacket: '红包优惠',
      sNum: '流水号',
      chnlsn: '外部订单号',
      src: '用户来源',
      cardCd: '银行卡号',
      remark: '备注',
      op: '操作',
      cancel: '退款',
      more: '更多',
      detail: '查看详情',
      download: '下载小票',
      ac: '实收', // 实收
      red: '商家红包', // 商家红包
      plat: '平台补贴', // 平台补贴
      surAmount: '附加费金额',
      surRate: '附加费费率',
      btn: {
        downDetail: '下载交易明细',
        downTrade: '下载交易汇总'
      }
    },
    detail: {
      amount1: '订单金额',
      amount2: '退款金额',
      origin: '消费者来源',
      time: '退款时间',
      syssn1: '订单流水号',
      syssn2: '原订单流水号',
      syssn3: '退款流水号',
      store: '交易门店',
      account: '操作账户',
      history: '退款历史',
      amount3: '实收金额',
      count1: '实收币数',
      count2: '订单币数',
      syssn4: '区块链订单号'
    },
    dialog: {
      d1: '操作一旦确认将无法撤回，是否确认？',
      d2: '确认退款',
      d3: '成功',
      d4: '失败',
      d5: '密码',
      d6: '退款',
      d7: '退款中'
    },
    msg: {
      m1: '流水号必须为数字',
      m2: '交易流水号需要至少14位！',
      m3: '首次获取交易列表失败',
      m4: '获取交易数据失败',
      m5: '获取收银员信息失败',
      m6: '撤销成功',
      m7: '撤销失败',
      m8: '请输入流水号',
      m9: '请输入账户密码',
      m10: '密码不正确',
      m11: '您暂无权限执行此操作',
      m12: '超出可退范围',
      m13: '发起退款失败，请联系客服查询失败原因，或采用其他方式给消费者退款',
      m14: '最大可退款金额',
      m15: '请输入退款金额',
      m16: '请输入有效退款金额'
    }
  },
  refundCheck: { // 退款审核
    crumbs: {
      L1: '交易管理',
      L2: '退款审核'
    },
    panel: {
      time: '申请时间',
      shopName: '交易门店',
      operator: '收银员',
      oNUm: '原订单流水号',
      tip: '请输入原订单流水号',
      btn: {
        query: '查询',
        reset: '重置'
      }
    },
    table: {
      applyAmount: '申请账户',
      tradeType: '交易类型',
      tradeTime: '交易时间',
      refundMount: '退款金额',
      tradeAmount: '交易金额',
      sNum: '流水号',
      checkState: '审核状态',
      waiting: '等待审核',
      approved: '已批准',
      rejected: '已拒绝',
      op: '操作',
      approve: '批准',
      reject: '拒绝'
    },
    dialog: {
      d1: '操作一旦确认将无法撤回，是否确认批准？',
      d2: '操作一旦确认将无法撤回，是否确认拒绝？',
      d3: '确认批准',
      d4: '确认拒绝'
    },
    msg: {
      m1: '管理密码',
      m2: '请输入管理密码',
      m3: '操作成功',
      m4: '退款操作成功，等待支付通道处理中。'
    }
  },
  home: { // 首页概览
    crumbs: {
      L1: '首页概览'
    },
    title: {
      t1: '交易数据统计',
      t2: '交易走势图'
    },
    panel: {
      t1: '今日会员新增',
      t2: '今日交易金额',
      tc: '今日回头客',
      cmnew: '本月会员新增',
      cumulativeMembership: '累计会员数',
      tta: '今日交易笔数',
      tincome: '今日实收',
      cmincome: '本月实收',
      noActivity: '暂无活动'
    },
    chart: {
      bill: '笔数',
      noTrans: '暂无交易',
      account: '实收',
      time: '时间',
      sum: '金额',
      tp1: '暂仅支持查询 30 天内的走势'
    }
  },
  settlement: { // 清算管理
    crumbs: {
      L1: '清算管理',
      L2: '清算记录'
    },
    panel: {
      time: '时间',
      today: '今天 ',
      yestoday: '昨天',
      near7: '近7天',
      near30: '近30天',
      type: '类型',
      btn: {
        query: '查询',
        reset: '重置',
        downAll: '下载全部'
      }
    },
    table: {
      settleTime: '清算时间',
      settleType: '清算类型',
      name: '账号',
      amount: '开户名',
      currency: '币种',
      total: '交易总额',
      charge: '手续费',
      settleAmount: '清算金额',
      op: '操作',
      download: '下载'
    },
    msg: {
      m1: '获取清算数据失败',
      m2: '目前仅支持查询30天内的数据',
      m3: '暂无数据可以下载',
      m4: '暂无清算数据'
    },
    tip: {
      m1: '手续费总额是按照每笔订单乘以费率再进行四舍五入相加后得出'
    }
  },
  invoice: { // 下载发票
    crumbs: {
      L1: '清算管理',
      L2: '发票下载'
    },
    title: {
      t1: '税号设置'
    },
    panel: {
      trn: '税号',
      merchantTrn: '商户的税号',
      invoice: '税务发票编号',
      shopList: '店铺列表',
      btn: {
        query: '查询',
        downAll: '下载全部',
        save: '保存'
      }
    },
    table: {
      invoiceNo: '税务发票编号',
      sid: '店铺ID',
      shopName: '店铺名称',
      trnNo: '税号',
      invoiceDate: '生成发票日期',
      op: '操作',
      downloadInvoice: '下载发票'
    },
    msg: {
      m1: '请输入税号',
      m2: '税号仅支持15位数字'
    },
    tip: {
      m1: '请输入公司的注册税号。',
      m2: '设置后，如果需要修改税号，请联系QFPay团队。',
      m3: '设置税号后，税务发票会在每个月的第5-6个工作日生成。'
    }
  },
  login: { // 登录页
    head: '商户管理后台',
    reg: '注册账号',
    user: '主账号',
    cash: '收银员编号',
    ltsix: '6位以上',
    login: '登录',
    forgetPwd: '忘记密码?',
    tab1: '商户',
    tab2: '收银员',
    msg: {
      m1: '请输入账号',
      m2: '请输入密码',
      m3: '登录失败',
      m4: '请输入主账号',
      m5: '请输入收银员编号',
      m6: '未发现此账号'
    }
  },
  setting: { // 设置
    crumbs: {
      L1: '设置',
      L2: '邮箱设置',
      L3: '设备绑定',
      L4: '添加附加费费率',
      L5: '编辑附加费费率',
    },
    panel: {
      mailSetup: '邮箱设置',
      mail: '邮箱',
      explain: '我们会在次日早上7点，把上一天的交易记录发送给您。',
      dailySend: '每日发送交易报表',
      modi: '修改',
      confirm: '确认',
      amount: '门店账号',
      device: '设备编号',
      merchant: '分店账号',
    },
    btn: {
      query: '查询',
      reset: '重置'
    },
    table: {
      merchant: '大商户名称',
      shopName: '店铺名称',
      time: '绑定时间',
      close: '解绑',
      createTime: '创建时间',
      subName: '分店名称',
      rate: '附加费费率',
    },
    dialog: {
      d1: '添加设备',
      d2: '解绑设备',
      d3: '操作确认',
    },
    msg: {
      m1: '请输入邮箱地址',
      m2: '请输入正确的邮箱地址',
      m3: '获取邮箱设置失败!',
      m5: '已经添加过这个邮箱了!',
      m6: '最多只能添加10个邮箱',
      m7: '是否确认解绑',
      m8: '解绑成功',
      m9: '请输入门店账号',
      m10: '请输入设备编号',
      m11: '添加成功',
      m12: '请输入分店账号',
      m13: '删除成功',
      m14: '请输入0-100的数字，支持小数点后两位',
    },
    tip: {
      m1: '删除最后一个邮箱会关掉邮件报表的功能，确认删除吗？',
      m2: '设置支付方式附加费费率',
      m3: '门店附加费均已设置，可在列表页直接修改',
      m4: '请选择你要设置附加费率的门店',
      nullTip: '请至少选择一家门店',
      all: '全选'
    }
  },
  passSet: { // 管理密码设置
    crumbs: {
      L1: '设置',
      L2: '管理密码设置'
    },
    panel: {
      passMsg: '管理密码：',
      explain: '用途：设置后，隔日退款审批 将通过输入管理密码完成确认验证。',
      states1: '未设置',
      states2: '已设置',
      bt1: '设置',
      bt2: '重置',
      bt3: '保存',
      title1: '设置管理密码',
      title2: '重置管理密码',
      safe: '安全验证',
      pass: '管理密码',
      reEnter: '再次输入',
      originPass: '原管理密码',
      newPass: '新管理密码'
    },
    msg: {
      m1: '请输入登录密码',
      m2: '请输入管理密码',
      m3: '请再次输入管理密码',
      m4: '请输入6～20 位数字或字母',
      m6: '请输入原管理密码',
      m7: '请输入新管理密码',
      m8: '请再次输入新管理密码',
      m9: '与管理密码输入不一致',
      m10: '设置成功'
    },
    tip: {
      m1: '* 忘记原密码？ 请联系客服处理'
    }
  },
  cashMng: { // 收银员管理
    crumbs: {
      L1: '收银员管理',
      L2: '查看详情',
      L3: '添加收银员',
      L4: '批量添加'
    },
    common: {
      status: '账户状态',
      number: '收银员编号',
      name: '姓名',
      mobile: '电话',
      shop: '门店',
      user: '主账号',
      password: '收银员密码',
      m1: '账户已禁用',
      m2: '账户已启用',
      m5: '请输入收银员姓名',
      m6: '请输入收银员电话',
      m7: '请输入收银员密码',
      m8: '请输入2~20位字符',
      m9: '请输入正确的收银员电话',
      m10: '请输入6~20位字符',
      tip1: '* 收银员登陆方式为主账号+收银员编号+收银员密码'
    },
    dialog: {
      title: '批量添加收银员',
      d1: '请选择收银员的表单文件',
      d2: '选择文件',
      d3: '上传',
      d4: '下载模板',
      d5: '上传成功'
    },
    mng: {
      status1: '已启用',
      status2: '已禁用',
      status3: '启用账户',
      status4: '禁用账户',
      name: '收银员名称',
      mobile: '收银员电话',
      op: '操作',
      detail: '查看详情',
      m5: '获取收银员数据失败'
    },
    detail: {
      title: '收银员资料',
      btn: '编辑收银员资料'
    },
    add: {
      title: '输入收银员信息',
      tip1: '添加收银员成功',
      tip2: '获取收银员编号失败',
      btn1: '放弃添加',
      btn2: '提交'
    }
  },
  contact: { // 客服
    phone: '电话',
    email: '邮箱'
  },
  overseaForget: {
    enterEmail: '请输入您的邮箱',
    emailAddr: '邮箱地址',
    tryAnother: '试试其他方法',
    next: '下一步',
    confirm: '确认',
    notExist: '该账号未注册，请确认您邮箱是否正确',
    sendCode: '我们会给您的邮箱发送验证码,请输入验证码',
    resend: '重新发送',
    code: '验证码',
    newPwd: '新密码',
    enterCode: '请输入验证码',
    char: '密码需要6~20位之间',
    rePwd: '重置密码',
    invalidEmail: '无效的邮箱格式',
    text1: '我们会给',
    text2: '发送验证码，请输入验证码',
    secend1: "( ",
    secend2: 's )后可以重发',
    codeResent: '验证码发送成功',
    wrongCode: '验证验证码失败',
    filledCode: '验证码不能为空',
    frequently: '验证码获取频繁'
  },
  firstlogin: {
    congratulation: '恭喜您登录成功',
    changePwd: '请修改您的初始密码',
    newPwd: '新密码',
    rePwd: '确认密码',
    confirm: '确 认'
  },
  preAuth: {// 预授权管理
    message: {
      m1: '订单号',
      m2: '请输入订单号',
      m3: '扣款金额',
      m4: '扣款笔数',
      m5: '预授权管理',
      m6: '订单详情',
      m7: '扣款',
      m8: '解冻',
      m9: '扣款详情',
      m10: '确认扣款',
      m11: '冻结金额',
      m12: '冻结笔数',
      m13: '创建时间',
      m14: '订单类型',
      m15: '业务订单号',
      m16: '订单金额',
      m17: '订单状态',
      m18: '订单流水号',
      m19: '扣款金额',
      m20: '最大可扣款金额',
      m21: '请输入扣款金额',
      m22: '超出扣款范围',
      m23: '扣款成功',
      m24: '已完成',
      m25: '已解冻',
      m26: '已结束',
      m27: '扣款失败',
      m28: '确认解冻',
      m29: '解冻成功',
      m30: '解冻失败',
      m31: '下载订单明细',
      m32: '支付宝预授权'
    }
  },
  diancan: {
    "Qr": {
      "smart": "智慧餐厅",
      "tableinfo": "输入桌牌信息",
      "qr": "桌台二维码",
      "area": "区域名称",
      "example": "例：2楼A区",
      "content": "此内容展示在桌号之前，选填",
      "range": "桌号范围",
      "start": "起始桌号",
      "to": "至",
      "end": "结尾桌号",
      "input": "请填写纯数字，如只需生成一张二维码，则不必填写结尾桌号",
      "generate": "生成二维码",
      "reset": "重置",
      "scanqr": "扫码点餐",
      "areano": "区域名称 桌号",
      "scanorder": "扫一扫，码上自助点餐",
      "qrgot1": "已生成",
      "qrgot2": "个二维码",
      "qrgotsingle": "个二维码",
      "stickergot1": "已生成",
      "stickergot2": "个桌贴",
      "stickergotsingle": "个桌贴",
      "qrpreview": "二维码预览",
      "downloadtable": "下载桌贴",
      "downloadqr": "下载二维码",
      'rule1': '起始桌号不能为空',
      'rule2': '起始桌号必须小于结尾桌号',
      'rule3': '单次最多生成50个二维码',
      'rule4': '区域名称限定10个字符以内',
      'rule5': '桌号必须为长度在四位以内的非零数字',
      'idermsg': '获取商户id失败',
      'qrgenerate': '正在生成...',
      'generalert': '生成数量较多时可能需要较长时间，请稍候...'
    },
    "Manage": {
      "manage": "商品管理",
      "upload": "上传引导",
      "uploadsize": "文件需不超过2.5M",
      "step1": "Step 1：下载批量导入数据所用的 Excel 模板",
      "download": "下载模板",
      "read": "仔细阅读模板中说明，按照模板要求填写完模板后，将模板文件拖入下方上传区域",
      "warn": "如模板中有错误数据导致导入失败，请下载错误数据，修改后重新上传",
      "remind": "上传成功的菜品将显示在下面的列表中，点击图片可更换这些图片",
      "drag": "请将填写完成的模板文件拖放到此区域,或",
      "clickupload": "点击上传",
      "name": "商品名称",
      "cate": "分类",
      "img": "图片",
      "upimg": "上传图片",
      "price": "价格（{0}）",
      "spec": "规格（{0}）",
      "attr": "属性",
      "status": "状态",
      "catestat": "品类状态",
      "uploadSuc": "成功上传 {0} 件商品",
      "fail": "共发现 {0} 条错误数据",
      "downerr": "下载错误数据",
      "emptytext": "暂无数据",
      "listfail": "获取商品列表失败",
      "wrongformat": "文件格式错误",
      "uploadOk": "上传成功",
      "cannotupload": "不能上传非图片",
      "qiniufail": "获取七牛token失败",
      "failupload": "上传失败",
      "addok": "添加商品图片成功",
      "addfail": "添加图片失败！",
      "qiniuuploadfail": "上传七牛失败",
      "template": "商品管理模版",
      "recipe": "中文菜谱",
      "os": '在售',
      'fs': '停售',
      'op': '操作',
      'dl': '删除',
      'statuschange': '状态修改成功',
      'delok': '删除成功',
      'confirm1': '确认删除',
      'confirm2': '确认',
      'confirm3': '取消',
      'uploadtitle': '未选择任何文件'
    },
    "Rank": {
      "index": "商品排序",
      "category": "商品分类",
      "name": "商品名称",
      "sort": "排序",
      "op": "操作",
      "top": "置顶",
      "up": "上移",
      "down": "下移",
      "rank": "商品排序",
      "total": "共{0}项",
      "save": "保存",
      "cancel": "取消",
      "saved": "保存成功"
    }
  }
}
